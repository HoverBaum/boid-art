// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { currentEventId } from '../../../src/apiUtils/events'
import { firestore } from '../../../src/apiUtils/firestore'
import { ReplicateState } from '../../../src/replicate'
import { PredictionType } from '../../../src/types'

type Data = {
  status: Extract<
    ReplicateState,
    'starting' | 'processing' | 'failed' | 'canceled'
  >
  id: string
}

type SuccessResponse = {
  status: Extract<ReplicateState, 'succeeded'>
  output: string[]
  id: string
}

type Error = {
  message: string
}

export type PredictionIdResponse = Data | SuccessResponse

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PredictionIdResponse | Error>
) {
  const eventId = currentEventId()
  if (!eventId) {
    return res.status(503).send({ message: 'No event running' })
  }

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id || ''
  const result = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token 5cc258cfbb37c9c757413d28cd0bddd290ae64fb',
    },
  })
  const json = await result.json()
  console.log(`Prediction state for ${id}:`, json)

  // We might reach this state multiple times for any given prediction.
  if (json.status === 'succeeded') {
    // Save a document, potentially overwriting it, but that is not an issue.
    console.log('Saving successful document generation for id: ', id)
    const prediction: Partial<PredictionType> = {
      completedAt: json.completed_at,
      imageUrl: json.output[0],
      predictionTime: json.metrics.predict_time,
      status: json.status,
    }
    console.log('💾 Saving prediction: ', prediction)
    const doc = await firestore.collection(eventId).doc(id).update(prediction)
    console.log('💾 Saving to firebase successful', doc)
  }

  const responseObject = {
    id: json.id,
    status: json.status,
  } as PredictionIdResponse

  if (responseObject.status === 'succeeded') {
    responseObject.output = json.output
  }

  res.status(200).json(responseObject)
}
