import { useEffect, useState } from 'react'
import { ReplicateState } from '../replicate'
import { StyleSelect } from '../home/StyleSelect'
import { PredictionIdResponse } from '../../pages/api/prediction/[id]'

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
      {' '}
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Prompt
      </label>
      <textarea
        id="message"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      ></textarea>
      <StyleSelect onStyleChange={setStyleId} />
      <button
        disabled={
          status === 'submitted' ||
          status === 'processing' ||
          status === 'starting'
        }
        onClick={generate}
        className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      >
        Generate
      </button>
      <p>Status: {status}</p>
      {status === 'succeeded' && <img key={imageUrl} src={imageUrl} />}
    </div>
  )
}