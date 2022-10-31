import { collection, doc } from 'firebase/firestore'

import { firestore } from '../firebase'

/**
 * It returns the id of a document in a collection
 * @returns The id of the document
 */
const getId = (collectionPath) => {
  const ref = doc(collection(firestore, collectionPath))
  return ref.id
}

export default getId
