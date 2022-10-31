import { Box, Button, Col, Row, Text, Title } from '@qonsoll/react-design'
import React, { useCallback, useEffect } from 'react'

import { GoogleButton } from 'react-google-button'
import { UserAuth } from '../context/AuthContext'
import { createDocument } from 'services'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const { googleSignIn, user } = UserAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const createUsrInDB = async (collection, data, id) => {
      await createDocument(collection, data, id)
    }
    if (user !== null && Object.keys(user).length !== 0) {
      console.log('user', user)
      createUsrInDB(
        'users',
        {
          name: user?.displayName || null,
          email: user?.email || null,
          emailVerified: user?.emailVerified || null,
          avatarUrl: user?.photoURL || null,
          _id: user?.uid || null,
          adress: null
        },
        user?.uid
      )
      navigate('/account')
    }
  }, [navigate, user])

  return (
    <Row h="center">
      <Col cw="auto">
        <GoogleButton onClick={handleGoogleSignIn} />
      </Col>
    </Row>
  )
}

export default Signin
