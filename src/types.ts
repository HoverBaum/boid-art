import { StaticImageData } from 'next/image'
import { ReplicateState } from './replicate'

export type PredictionType = {
  completedAt: string
  imageUrl: string
  predictionTime: number
  prompt: string
  id: string
  originalPrompt: string
  status: ReplicateState
  styleId: string
}

export type StyleType = {
  // The style to be used.
  style: string
  // Identifier for this style.
  id: string
  // Displayed name of the style.
  name: string
  // Image to display for this style.
  image: StaticImageData
}
