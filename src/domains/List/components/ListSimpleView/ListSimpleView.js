import { Box, Button, Col, Row, Text, Title } from '@qonsoll/react-design'

import { AddBtn } from 'components'
import React from 'react'

const ListSimpleView = ({
  list,
  showTaskForm,
  setShowTaskForm,
  currentList,
  setCurrentList
}) => {
  return (
    <Row noGutters h="between" v="center" width="inherit">
      <Col cw="auto">
        <Text strong>{list?.title}</Text>
      </Col>
      <Col cw="auto">
        <AddBtn
          onClick={() => {
            setShowTaskForm(true)
            setCurrentList(list)
          }}
        />
      </Col>
    </Row>
  )
}

export default ListSimpleView
