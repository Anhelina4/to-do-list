import { deleteObject } from 'firebase/storage'
import storageRef from './storageRef'

/**
 * It takes a path to a file in Firebase Storage, and returns a promise that resolves to true if the
 * file was successfully deleted, or false if it wasn't
 * @param path - The path to the file in the Firebase Storage bucket.
 * @returns A promise that resolves to the deleted object.
 */
const removeFile = (path) => {
  const ref = storageRef(path)
  return deleteObject(ref)
}

export default removeFile
