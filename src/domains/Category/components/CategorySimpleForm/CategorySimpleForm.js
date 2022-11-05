import { Button, Col, Input, Row } from '@qonsoll/react-design'
import React, { useState } from 'react'
import { createDocument, getId } from 'services'

import { Form } from 'antd'
import { UserAuth } from 'context/AuthContext'

const CategorySimpleForm = ({ showCategoryForm, setShowCategoryForm }) => {
  const [form] = Form.useForm()
  const { user } = UserAuth()

  const categoryId = getId('categories')
  const onSubmit = async (values) => {
    form.resetFields()
    setShowCategoryForm(false)
    await createDocument('categories', {
      ...values,
      _id: categoryId,
      userId: user?.uid
    })
  }

  return (
    <>
      {showCategoryForm && (
        <Form form={form} onFinish={onSubmit}>
          <Row noGutters>
            <Col>Category title</Col>
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
              <Button
                type="secondary"
                onClick={() => setShowCategoryForm(false)}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </>
  )
}

export default CategorySimpleForm
