import { useEffect, useState } from 'react'

import { getDocuments } from 'services/api/rest'

/**
 * It returns an array of values that are the result of a query to a Firestore collection
 * @param where {object} - The query where clause
 * @param ref {string} - The collection reference
 * @param orderBy {array} - The query orderBy clause
 * @param limit {number} - The query limit clause
 * @returns An array of values.
 */
const useCollection = (props) => {
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const collectionData = await getDocuments(props.ref)
        setValue(collectionData)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    props?.ref && fetchData()
  }, [props?.ref])

  return [value, loading, error]
}

export default useCollection
