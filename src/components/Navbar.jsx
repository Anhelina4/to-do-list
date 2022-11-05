import { Box, Button, Col, Row, Text, Title } from '@qonsoll/react-design'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, logOut } = UserAuth()
  let navigate = useNavigate()
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {!user?.displayName && (
        <Row display="flex" h="center" v="center">
          <Col cw="auto" h="center" mb={4}>
            <Title level={3}>Welcome!</Title>
            <Text>
              To procceed using this to-do list you have to sign in. Let`s do
              it!
            </Text>
          </Col>
        </Row>
      )}
      <Row
        display="flex"
        h={!user?.displayName ? 'center' : 'right'}
        v="center"
        mb={4}
      >
        <Col cw="auto">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
        </Col>
        <Col cw="auto">
          {user?.displayName ? (
            <Button onClick={handleSignOut}>Logout</Button>
          ) : (
            <Link to="/signin">
              <Button type="primary">Sign in</Button>
            </Link>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Navbar
