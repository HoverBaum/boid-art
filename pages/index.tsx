import { Container } from '../src/components/Container'
import { DetailedStyleExplanation } from '../src/home/DetailedStyleExplanation'
import { ImageGeneration } from '../src/home/ImageGeneration'

export default function Home() {
  return (
    <div>
      <ImageGeneration />
      <div className="p-4"></div>
      <DetailedStyleExplanation />

      <Container>
        <div className="grid place-items-center p-8">
          <p>
            Build by Netlights AVA Boids - find the code on{' '}
            <a
              className="underline hover:text-violet-500"
              href="https://github.com/HoverBaum/boid-art"
            >
              GitHub
            </a>
          </p>
        </div>
      </Container>
    </div>
  )
}
