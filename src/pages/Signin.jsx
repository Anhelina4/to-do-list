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
      createUsrInDB(
        'users',
        {
          name: user?.displayName || null,
          surname: user?.displayName || null,
          fatherName: user?.displayName || null,
          email: user?.email || null,
          emailVerified: user?.emailVerified || null,
          avatarUrl: user?.photoURL || null,
          _id: user?.uid || null,
          adress: null,
          registrationDate: new Date().toISOString(),
          lastLoginDate: new Date().toISOString(),
          birthDate: null,
          phone: null
        },
        user?.uid
      )
      navigate('/account')
    }
  }, [navigate, user])

  return (
    <Row h="center">
      <Col cw="auto">
        <GoogleButton
          onClick={handleGoogleSignIn}
          style={{
            backgroundColor: 'var(--ql-color-accent1)',
            borderRadius:
              '0 var(--ql-border-radius-default) var(--ql-border-radius-default) 0'
          }}
        />
      </Col>
    </Row>
  )
}

export default Signin
