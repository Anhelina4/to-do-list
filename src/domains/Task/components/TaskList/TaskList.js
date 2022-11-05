import { Col, Row, Text } from '@qonsoll/react-design'
import { collection, doc, query, where } from 'firebase/firestore'

import React from 'react'
import { TaskSimpleView } from 'domains/Task/components'
import { firestore } from '../../../../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useGlobalContext } from 'context/GlobalContext'

const TaskList = ({
  setShowTasksAll,
  setShowCategoryForm,
  setShowTaskForm
}) => {
  const { currentCategory } = useGlobalContext()
  const [categoryTasks] = useCollectionData(
    query(
      collection(firestore, 'tasks'),
      where('categoryId', '==', currentCategory?._id)
    )
  )
  return !!categoryTasks?.length ? (
    categoryTasks?.map((task) => (
      <TaskSimpleView
        task={task}
        setShowTasksAll={setShowTasksAll}
        setShowCategoryForm={setShowCategoryForm}
        setShowTaskForm={setShowTaskForm}
      />
    ))
  ) : (
    <Row>
      <Col>
        <Text variant="overline">You have no tasks in this list yet</Text>
      </Col>
    </Row>
  )
}

export default TaskList
