import { useEffect, useState } from 'react'
import { ReplicateState } from '../replicate'
import { StyleSelect } from '../home/StyleSelect'
import { PredictionIdResponse } from '../../pages/api/prediction/[id]'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Spinner } from '../components/Spinner'

// States being added to ReplicateState for local purposes.
type ExtraStates = 'idle' | 'submitted'

export type AppStates = ReplicateState | ExtraStates

// Interval in which we check the status of a prompt being generated.
const POLLING_TIME = 500

export const ImageGeneration = () => {
  const [status, setStatus] = useState<AppStates>('idle')
  const [prompt, setPrompt] = useState<string>('a purple unicorn')
  const [currentPredictionId, setCurrentPredictionId] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [styleId, setStyleId] = useState<string>('default')

  // Trigger generation of a new artwork.
  const generate = async () => {
    // Scroll down to the prediction.
    const predictionElement = document.getElementById('prediction')
    if (predictionElement) {
      const bounds = predictionElement.getBoundingClientRect()
      window.scrollTo(0, bounds.top)
    }

    setStatus('submitted')
    const response = await fetch('/api/prediction', {
      method: 'POST',
      body: JSON.stringify({ prompt, styleId }),
    })
    const data = await response.json()
    setStatus(data.status)
    setCurrentPredictionId(data.id)
  }

  // Fetch the current status of the current prediction and continue while processing.
  const fetchStatus = async () => {
    console.log('👀 checking status…')
    const response = await fetch(`/api/prediction/${currentPredictionId}`, {
      method: 'GET',
    })
    const data = (await response.json()) as PredictionIdResponse
    const currentStatus = data.status as ReplicateState
    if (data.status === 'succeeded') {
      setImageUrl(data.output[0])
    }
    console.log('👀 current status:', currentStatus)
    setStatus(currentStatus)
    if (currentStatus === 'processing' || currentStatus === 'starting') {
      setTimeout(fetchStatus, POLLING_TIME)
    }
  }

  // React to changes in the status.
  useEffect(() => {
    if (status === 'starting') {
      console.log('🚀 Prediction started')
      fetchStatus()
    }
  }, [status])
  return (
    <div>
      <div className="h-screen bg-[url('/marble.jpg')] bg-cover bg-center">
        <Container>
          <div className="relative h-40">
            <h1 className="text-8xl tracking-wider font-bold font-cormorant text-right absolute right-0 w-screen">
              GENERATE ART
            </h1>
            <h2 className="text-2xl absolute top-28 -right-10">
              WITH ARTIFICAIAL INTELLIGENCE
            </h2>
          </div>

          <textarea
            id="message"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          ></textarea>
          <StyleSelect onStyleChange={setStyleId} />
          <Button
            disabled={
              status === 'submitted' ||
              status === 'processing' ||
              status === 'starting'
            }
            onClick={generate}
          >
            Generate
          </Button>
          <Button type="secondary" onClick={() => setPrompt('')}>
            Clear
          </Button>
        </Container>
      </div>

      {/* Predoction area */}
      <div id="prediction" className="h-screen grid place-items-center">
        <Container>
          <div className="w-[512px] h-[512px] grid place-items-center bg-gray-50 bg-opacity-25">
            {(status === 'submitted' || status === 'processing') && <Spinner />}
            {status === 'succeeded' && <img key={imageUrl} src={imageUrl} />}
            {(status === 'failed' || status === 'canceled') && (
              <>
                <p>Status: {status}</p>
                <p>Something went wrong. Please try again.</p>
              </>
            )}
          </div>
          <p className="text-xl mt-2">{prompt}</p>
        </Container>
      </div>
    </div>
  )
}
