import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Info } from '../../src/components/Info'
import { useCurrentEvent } from '../../src/useCurrentEvent'

export default function Results() {
  const { currentEvent } = useCurrentEvent()
  const router = useRouter()

  useEffect(() => {
    if (
      !currentEvent ||
      currentEvent === 'none' ||
      currentEvent === 'loading'
    ) {
      return
    }
    router.push(`/results/${currentEvent}`)
  }, [currentEvent])

  const linkStyle = {
    letterSpacing: 5,
  }

  return (
    <div>
      <Link className="absolute top-6 z-10 left-6" style={linkStyle} href="/">
        {'<'}-- GENERATE
      </Link>
      <div className="p-16">
        {currentEvent === 'none' && (
          <Info>
            There is currently no event running for which to display images.
          </Info>
        )}
      </div>
    </div>
  )
}
