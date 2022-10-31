import { doc, getDoc } from 'firebase/firestore'

import { firestore } from '../firebase'

/**
 * `getDocumentSnapshot` is a function that returns a document snapshot from a collection path and an
 * id
 * @param collectionPath - The path to the collection you want to get the document from.
 * @param id - the id of the document you want to get
 * @returns A document snapshot
 */
const getDocumentSnapshot = async (collectionPath, id) => {
  const ref = doc(firestore, collectionPath, id)
  const docSnapshot = await getDoc(ref)
  return docSnapshot
}

export default getDocumentSnapshot
