import {
  Box,
  Button,
  Card,
  Col,
  Icon,
  Row,
  Text,
  Title
} from '@qonsoll/react-design'

import { AddBtn } from 'components'
import { CloseOutlined } from '@ant-design/icons'
import React from 'react'
import { deleteDocument } from 'services'
import { useGlobalContext } from 'context/GlobalContext'

const CategorySimpleView = ({
  list,
  showTaskForm,
  setShowTaskForm,
  currentList,
  setCurrentList,
  showTasksAll,
  setShowTasksAll,
  _id
}) => {
  const { setCurrentCategory, setCurrentTask } = useGlobalContext()
  const deleteCategory = (e) => {
    e.stopPropagation()
    deleteDocument('categories', _id)
    setShowTaskForm(false)
    setCurrentCategory(null)
    setShowTasksAll(false)
    setCurrentTask(null)
  }

  return (
    <Card
      cursor="pointer"
      mb={2}
      onClick={(e) => {
        e.stopPropagation()
        setCurrentCategory(list)
        setShowTaskForm(false)
        setShowTasksAll(true)
      }}
    >
      <Row noGutters h="between" v="center" width="inherit">
        <Col cw="auto">
          <Text strong>{list?.title}</Text>
        </Col>
        <Col cw="auto" flexDirection="row">
          <AddBtn
            onClick={(e) => {
              e.stopPropagation()
              setShowTaskForm(true)
              setCurrentCategory(list)
              setShowTasksAll(false)
              setCurrentTask(null)
            }}
          />
          <Button
            ml={2}
            type="secondary"
            onClick={deleteCategory}
            icon={<Icon component={<CloseOutlined fontSize="16px" />} />}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default CategorySimpleView
