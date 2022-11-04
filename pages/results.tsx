import { initializeApp } from 'firebase/app'
import { onSnapshot, collection, getFirestore } from 'firebase/firestore'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PredictionType } from '../src/types'

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

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'predictions'), (snapshot) => {
      console.log('📡 snapshot received')
      const predictions = snapshot.docs.map((doc) =>
        doc.data()
      ) as PredictionType[]
      const sortedPredictions = predictions.sort(predictionByDateDesc)
      setPredictions(sortedPredictions)
    })
    return unsub
    // setup()
  }, [])

  return (
    <div>
      <Link href="/">Generate</Link>
      <h1>Results</h1>
      <div>
        {predictions.map((prediction) => (
          <figure key={prediction.id}>
            <img src={prediction.imageUrl} alt={prediction.prompt} />
            <figcaption>
              <p>
                {prediction.originalPrompt} - {prediction.styleId}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
