import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const firebaseConfig = {
  //@ts-ignore
  credential: cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
}
getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const firestore = getFirestore()
