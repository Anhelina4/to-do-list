import { Col, Img, Row } from '@qonsoll/react-design'

import React from 'react'

const Home = () => {
  return (
    <Row h="center">
      <Col cw="auto">
        <Img
          src="https://clickup.com/blog/wp-content/uploads/2019/01/to-do-list-apps.png"
          alt="home page"
          style={{ height: '400px', borderRadius: '12px' }}
        />
      </Col>
    </Row>
  )
}

export default Home
