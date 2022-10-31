import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import { firestore } from '../firebase'
import { getId } from 'services'

/**
 * It creates a document in a collection with a given ID
 * @param collectionPath - The path to the collection you want to create a document in.
 * @param documentData - The data you want to store in the document.
 * @param id - The id of the document to create. If not provided, a random id will be generated.
 * @returns The id of the document that was created.
 */
const createDocument = async (collectionPath, documentData, id) => {
  const _id = id || getId(collectionPath)
  const ref = doc(firestore, collectionPath, _id)
  try {
    await setDoc(ref, { ...documentData, _id, _createdAt: serverTimestamp() })
  } catch (err) {
    console.log('error', err)
  }

  return { id: _id }
}

export default createDocument
