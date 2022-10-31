import createDocument from './createDocument'
import { getDocumentSnapshot } from 'services'
import updateDocument from './updateDocument'

/**
 * If the data is not null, check if the document exists, if it does, update it, if it doesn't, create
 * it
 * @param collection - The collection name
 * @param data - The data that you want to save.
 * @returns The id of the document that was created or updated.
 */
const saveBelongsToRelationship = async (
  collection,
  data,
  additionalData = {}
) => {
  if (!data) return null
  // If the data is null, return null
  else {
    const isDocumentExists = (
      await getDocumentSnapshot(collection, data._id)
    ).exists()
    if (isDocumentExists) {
      await updateDocument(collection, data._id, { ...data, ...additionalData })
      return data._id
    } else {
      const { id } = await createDocument(collection, {
        ...data,
        ...additionalData
      })
      return id
    }
  }
}

export default saveBelongsToRelationship
