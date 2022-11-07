import Link from 'next/link'
import { DetailedStyleExplanation } from '../src/home/DetailedStyleExplanation'
import { ImageGeneration } from '../src/home/ImageGeneration'

export default function Home() {
  return (
    <div>
      <Link href="/results">Results</Link>
      <ImageGeneration />
      <DetailedStyleExplanation />
    </div>
  )
}
