// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../src/apiUtils/firestore'
import { ReplicateState } from '../../../src/replicate'
import { stylePrompt } from '../../../src/styles/stylePrompt'
import { styles } from '../../../src/styles/styles'
import { PredictionType } from '../../../src/types'

type Data = {
  status: ReplicateState
  id: string
}

type Error = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  // Only except POST requests.
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  // Get prompt from body and return if no prompt was supplied.
  const { prompt, styleId = 'default' } = JSON.parse(req.body)
  console.log(`prompt: "${prompt}"`)
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is missing' })
  }

  const style = styles.find((style) => style.id === styleId)
  const styledPrompt = stylePrompt(prompt, style?.style)

  // Start the prediction on replicate.
  const result = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.REPLICATE_TOKEN}`,
    },
    body: JSON.stringify({
      version:
        'c24bbf13332c755f9e1c8b3f10c7f438889145def57d554a74ea751dc5e3b509',
      input: {
        prompt: styledPrompt,
        width: 512,
        height: 512,
        num_outputs: 1,
        num_inference_steps: 60,
        guidance_scale: 7,
        scheduler: 'K-LMS',
      },
    }),
  })
  const replicateResponse = await result.json()
  console.log('Replicate response ', replicateResponse)

  // Save the started prediction to firebase.
  const predictionInfo: Partial<PredictionType> = {
    originalPrompt: prompt,
    id: replicateResponse.id,
    prompt: replicateResponse.input.prompt,
    status: replicateResponse.status,
    styleId,
  }
  await firestore
    .collection('predictions')
    .doc(replicateResponse.id)
    .set(predictionInfo)

  // Return id and status for frontend to track progress.
  res.status(200).json({
    id: replicateResponse.id,
    status: replicateResponse.status,
  })
}
