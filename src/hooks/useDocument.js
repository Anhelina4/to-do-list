import { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { getDocument } from 'services/api/rest'

/**
 * It takes a Firestore document reference and returns the document's data, a loading state, and an
 * error state
 * @param ref {string} - The document reference
 * @param where {array} - The query where clause
 * @returns An array with the value, loading, and error.
 */
const useDocument = (props) => {
  const [value, setValue] = useState()
  const [loading, setLoading] = useState(!!props.ref)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const documentData = await getDocument(props.ref)
        setValue(documentData)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    props?.ref && fetchData()
  }, [props?.ref])

  return [value, loading, error]
}

useDocument.propTypes = {
  ref: PropTypes.string.isRequired,
  where: PropTypes.array
}

export default useDocument
