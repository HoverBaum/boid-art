import { DetailedStyleExplanation } from '../src/home/DetailedStyleExplanation'
import { ImageGeneration } from '../src/home/ImageGeneration'

export default function Home() {
  return (
    <div>
      <ImageGeneration />
      <div className="p-4"></div>
      <DetailedStyleExplanation />
    </div>
  )
}
