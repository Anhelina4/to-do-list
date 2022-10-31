import { Button, Col, Input, Row } from '@qonsoll/react-design'
import React, { useState } from 'react'

import { Form } from 'antd'
import { UserAuth } from 'context/AuthContext'
import { createDocument } from 'services'

const ListSimpleForm = ({ showListForm, setShowListForm }) => {
  const [form] = Form.useForm()
  const { user } = UserAuth()

  const onSubmit = async (values) => {
    form.resetFields()
    setShowListForm(false)
    await createDocument('lists', { ...values, authorId: user?.uid, tasks: [] })
  }

  return (
    <>
      {showListForm && (
        <Form form={form} onFinish={onSubmit}>
          <Row noGutters>
            <Col>List title</Col>
          </Row>
          <Form.Item name="title">
            <Input />
          </Form.Item>
          <Row noOuterGutters>
            <Col cw="auto">
              <Button type="primary" onClick={() => form.submit()}>
                Submit
              </Button>
            </Col>
            <Col cw="auto">
              <Button type="secondary" onClick={() => setShowListForm(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </>
  )
}

export default ListSimpleForm
