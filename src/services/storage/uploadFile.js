import { getDownloadURL, uploadBytes } from 'firebase/storage'

import storageRef from './storageRef'

/**
 * It takes a file and a path, uploads the file to the path, and returns a promise that resolves to an
 * array containing the download URL and the snapshot
 * @param file - The file you want to upload.
 * @param path - The path to the file in the storage bucket.
 * @returns An array with the downloadUrl and the snapshot
 */
const uploadFile = (file, path) => {
  const ref = storageRef(path)
  const uploadPromise = uploadBytes(ref, file)

  return uploadPromise.then(async (snapshot) => {
    const downloadUrl = await getDownloadURL(snapshot.ref)

    return [downloadUrl, snapshot]
  })
}

export default uploadFile
