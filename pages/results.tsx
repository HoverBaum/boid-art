import { initializeApp } from 'firebase/app'
import { onSnapshot, collection, getFirestore } from 'firebase/firestore'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Info } from '../src/components/Info'
import { Spinner } from '../src/components/Spinner'
import { nameForStyleId } from '../src/styles/styleUtils'
import { PredictionType } from '../src/types'
import { useCurrentEvent } from '../src/useCurrentEvent'

const firebaseConfig = {
  apiKey: 'AIzaSyDrFGtn4vq55dBg_rwF_sz2WLRsL7bo2RM',
  authDomain: 'boid-art.firebaseapp.com',
  projectId: 'boid-art',
  storageBucket: 'boid-art.appspot.com',
  messagingSenderId: '318148167967',
  appId: '1:318148167967:web:0399e17991e5d36ce8c82a',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const predictionByDateDesc = (a: PredictionType, b: PredictionType) => {
  return a.completedAt > b.completedAt ? -1 : 1
}

export default function Results() {
  const [predictions, setPredictions] = useState<PredictionType[]>([])
  const { currentEvent } = useCurrentEvent()

  useEffect(() => {
    console.log(currentEvent)
    if (currentEvent === 'loading' || currentEvent === 'none') return
    const unsub = onSnapshot(collection(db, currentEvent), (snapshot) => {
      console.log('📡 snapshot received')
      const predictions = snapshot.docs.map((doc) =>
        doc.data()
      ) as PredictionType[]
      const sortedPredictions = predictions.sort(predictionByDateDesc)
      setPredictions(sortedPredictions)
    })
    return unsub
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

        <div className="my-6 pl-8 pr-8 grid grid-cols-4 sm:grid-cols-4 gap-8">
          {predictions.map((prediction) => (
            <figure key={prediction.id}>
              <div className="group relative">
                <img
                  src={prediction.imageUrl}
                  alt={prediction.originalPrompt}
                  className="rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col rounded-2xl justify-center items-center bg-black opacity-0 group-hover:opacity-75 duration-500">
                  <h1 className="text-2xl text-white">
                    Style: {nameForStyleId(prediction.styleId)}
                  </h1>
                </div>
              </div>
              <figcaption className="pt-2">
                <p className="font-light text-sm">
                  {prediction.originalPrompt.substring(0, 100)}
                  {prediction.originalPrompt.length > 100 && '…'}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
