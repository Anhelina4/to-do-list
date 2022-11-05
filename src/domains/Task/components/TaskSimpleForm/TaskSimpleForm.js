import { Button, Col, Input, Row, Select, Text } from '@qonsoll/react-design'
import { DatePicker, Form } from 'antd'
import React, { useState } from 'react'
import { collection, doc, query, where } from 'firebase/firestore'
import { createDocument, updateDocument } from 'services'

import { ImageUploader } from 'components'
import { UserAuth } from 'context/AuthContext'
import { firestore } from '../../../../firebase'
import moment from 'moment'
import { uploadFile } from 'services/storage'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { useEffect } from 'react'
import { useGlobalContext } from 'context/GlobalContext'

const TaskSimpleForm = ({
  showTaskForm,
  setShowTaskForm,
  currentList,
  showTasksAll,
  setShowTasksAll
}) => {
  const [form] = Form.useForm()
  const { user } = UserAuth()

  const { currentCategory, currentTask } = useGlobalContext()
  const [statuses] = useCollectionDataOnce(
    query(collection(firestore, 'statuses'))
  )
  const [levels] = useCollectionDataOnce(
    query(collection(firestore, 'taskLevels'))
  )
  const statusOptions = statuses?.map((status) => {
    return {
      label: status.status,
      value: status._id
    }
  })
  const levelOptions = levels?.map((level) => {
    return {
      label: level.level,
      value: level._id
    }
  })
  const onSubmit = async (values) => {
    form.resetFields()
    const [imageUploadedUrl] = await uploadFile(
      values?.imageUrl,
      `images/${values?.title}`
    )
    await createDocument('tasks', {
      title: values?.title !== undefined ? values?.title : null,
      description:
        values?.description !== undefined ? values?.description : null,
      status: values?.status !== undefined ? values?.status : null,
      level: values?.level !== undefined ? values?.level : null,
      imageUrl: imageUploadedUrl ?? null,
      authorId: user?.uid ?? null,
      listId: currentList?._id ?? null,
      beginDate: new Date().toISOString(),
      endDate: new Date(),
      dateOfCreation: new Date().toISOString(),
      dateOfComplete: moment(values?.completionDate).toDate().toISOString(),
      categoryId: currentCategory?._id
    }, currentTask?._id)
    setShowTasksAll(true)
    setShowTaskForm(false)
  }
  useEffect(() => {
    currentTask
      ? form.setFieldsValue({
          ...currentTask,
          dateOfComplete: moment(currentTask?.dateOfComplete)
        })
      : form.resetFields()
  }, [currentTask, form])

  return (
    <Form form={form} onFinish={onSubmit}>
      <Row noGutters>
        <Col>
          <Text>Image</Text>
        </Col>
      </Row>
      <Form.Item name="imageUrl">
        <ImageUploader />
      </Form.Item>
      <Row noGutters>
        <Col>
          <Text>Title</Text>
        </Col>
      </Row>
      <Form.Item name="title">
        <Input placeholder="Please, enter your title" />
      </Form.Item>
      <Row noGutters>
        <Col>
          <Text>Description</Text>
        </Col>
      </Row>
      <Form.Item name="description">
        <Input.TextArea rows={6} placeholder="Please, enter your description" />
      </Form.Item>

      <Row noGutters>
        <Col>
          <Text>Status</Text>
        </Col>
      </Row>
      <Form.Item name="status">
        <Select options={statusOptions} placeholder="Please, choose status" />
      </Form.Item>
      <Row noGutters>
        <Col>
          <Text>Completion date</Text>
        </Col>
      </Row>
      <Form.Item name="dateOfComplete">
        <DatePicker />
      </Form.Item>
      <Row noGutters>
        <Col>
          <Text>Task level</Text>
        </Col>
      </Row>
      <Form.Item name="level">
        <Select
          options={levelOptions}
          placeholder="Please, choose task level"
        />
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
