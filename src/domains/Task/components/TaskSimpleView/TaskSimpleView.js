import {
  Box,
  Button,
  Card,
  Col,
  Divider,
  Icon,
  Img,
  Row,
  Text,
  Title
} from '@qonsoll/react-design'
import { Checkbox, Tag } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { collection, doc, query, where } from 'firebase/firestore'
import { deleteDocument, updateDocument } from 'services'
import {
  useCollectionData,
  useCollectionDataOnce
} from 'react-firebase-hooks/firestore'

import { firestore } from '../../../../firebase'
import { useGlobalContext } from 'context/GlobalContext'

const Task = ({
  task,
  showTaskForm,
  setShowTaskForm,
  setShowTasksAll,
  setShowCategoryForm
}) => {
  const { setCurrentTask } = useGlobalContext()
  const [doneStatus] = useCollectionDataOnce(
    query(collection(firestore, 'statuses'), where('status', '==', 'Done'))
  )
  const [todoStatus] = useCollectionDataOnce(
    query(collection(firestore, 'statuses'), where('status', '==', 'To do'))
  )
  const [taskStatus] = useCollectionData(
    query(collection(firestore, 'statuses'), where('_id', '==', task?.status))
  )
  const [taskCategory] = useCollectionData(
    query(
      collection(firestore, 'categories'),
      where('_id', '==', task?.categoryId)
    )
  )
  const [taskLevel] = useCollectionData(
    query(collection(firestore, 'taskLevels'), where('_id', '==', task?.level))
  )

  const deleteTask = () => {
    deleteDocument('tasks', task?._id)
  }
  const editTask = (e) => {
    e.stopPropagation()
    setCurrentTask(task)
    setShowTaskForm(true)
    setShowTasksAll(false)
    setShowCategoryForm(false)
  }
  const updateTaskStatus = async (e) => {
    doneStatus &&
      (await updateDocument('tasks', task?._id, {
        ...task,
        status: e.target.checked ? doneStatus[0]?._id : todoStatus[0]?._id
      }))
  }

  return (
    <Row mb={2}>
      <Col>
        <Card
          background={
            taskStatus?.[0]?.status === 'Done'
              ? 'var(--ql-color-success-t-lighten5)'
              : 'var(--ql-color-info-t-lighten5)'
          }
        >
          <Row>
            <Col cw="auto">
              <Checkbox
                onChange={updateTaskStatus}
                checked={taskStatus?.[0]?.status === 'Done' ? true : false}
              />
            </Col>
            <Col cw="auto" v="top">
              <Img
                objectFit="contain"
                height="150px"
                maxWidth="150px"
                src={task?.imageUrl}
              />
            </Col>
            <Col>
              <Title level={4}>{task?.title}</Title>
              <Box display="flex" mb={2}>
                <Tag color="purple">{taskCategory?.[0]?.title}</Tag>
                <Tag color="blue">{taskLevel?.[0]?.level}</Tag>
              </Box>
             
              <Text type="secondary" level={4} variant="body2">
                created on:{' '}
                <Text strong>{task?.dateOfCreation?.slice(0, 10)}</Text>
              </Text>
              <Text type="secondary" level={4} variant="body2" mb={2}>
                need to be completed on:{' '}
                <Text strong>{task?.dateOfComplete?.slice(0, 10)}</Text>
              </Text>
              <Text>{task?.description}</Text>
            </Col>
           
            <Col cw="auto" flexDirection="row">
              <Button
                mr={2}
                type="secondary"
                onClick={editTask}
                icon={<Icon component={<EditOutlined fontSize="16px" />} />}
              />
              <Button
                type="secondary"
                onClick={deleteTask}
                icon={<Icon component={<CloseOutlined fontSize="16px" />} />}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Task
