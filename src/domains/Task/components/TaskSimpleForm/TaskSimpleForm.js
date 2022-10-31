import { Button, Col, Input, Row, Text } from '@qonsoll/react-design'
import React, { useState } from 'react'
import { createDocument, updateDocument } from 'services'

import { Form } from 'antd'
import { UserAuth } from 'context/AuthContext'

const TaskSimpleForm = ({ showTaskForm, setShowTaskForm, currentList }) => {
  const [form] = Form.useForm()
  const { user } = UserAuth()
  // const [taskTitle, setTaskTitle] = useState(null)

  const onSubmit = async (values) => {
    form.resetFields()

    const createdTaskId = await createDocument('tasks', {
      ...values,
      authorId: user?.uid,
      listId: currentList?._id
    })
    await updateDocument('lists', currentList?._id, {
      ...currentList,
      tasks: [...currentList?.tasks, createdTaskId?.id]
    })
  }

  return (
    <Form form={form} onFinish={onSubmit}>
      <Row noGutters>
        <Col>
          <Text>Title</Text>
        </Col>
      </Row>
      <Form.Item name="title">
        <Input />
      </Form.Item>
      <Row noGutters>
        <Col>
          <Text>Flag</Text>
        </Col>
      </Row>
      <Form.Item name="flag">
        <Input />
      </Form.Item>
      <Row noGutters>
        <Col>
          <Text>Status</Text>
        </Col>
      </Row>
      <Form.Item name="status">
        <Input />
      </Form.Item>
      <Row noGutters>
        <Col>
          <Text>Description</Text>
        </Col>
      </Row>
      <Form.Item name="description">
        <Input />
      </Form.Item>
      <Row noGutters>
        <Col>
          <Text>Category</Text>
        </Col>
      </Row>
      <Form.Item name="category">
        <Input />
      </Form.Item>
      <Row noOuterGutters>
        <Col cw="auto">
          <Button type="secondary" onClick={() => setShowTaskForm(false)}>
            Cancel
          </Button>
        </Col>
        <Col cw="auto">
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default TaskSimpleForm
