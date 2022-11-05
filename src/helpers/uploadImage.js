import { uploadFile } from 'services/storage'

/**
 * It takes a file object, uploads it to Firebase Storage, and returns the URL of the uploaded file
 * @param file - The file to upload.
 * @returns The url of the image
 */
const uploadImage = async (file, path) => {
  if (!file) return null // If no file, return null
  if (typeof file === 'string') return file // If it's a string, it's already a URL
  try {
    const { uid, name } = file
    const _path = path || `images/${uid}_${name}`
    const [url] = await uploadFile(file, _path)
    return url
  } catch (error) {
    return null
  }
}

export default uploadImage
