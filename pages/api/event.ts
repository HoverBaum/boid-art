// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { currentEventId } from '../../src/apiUtils/events'

type Data = {
  eventId?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const eventId = currentEventId()

  res.status(200).json({ eventId })
}
