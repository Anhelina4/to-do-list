import {
  Box,
  Button,
  Col,
  Divider,
  Img,
  Row,
  Spin,
  Text,
  Title
} from '@qonsoll/react-design'
import {
  CategorySimpleForm,
  CategorySimpleView
} from 'domains/Category/components'
import React, { useState } from 'react'
import { TaskList, TaskSimpleForm } from 'domains/Task/components'
import { collection, doc, query, where } from 'firebase/firestore'

import { AddBtn } from 'components'
import { UserAuth } from 'context/AuthContext'
import firebase from 'firebase/compat/app'
import { firestore } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const Account = () => {
  const { logOut, user } = UserAuth()
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showTasksAll, setShowTasksAll] = useState(false)

  // [ADDITIONAL HOOKS]
  const [lists, loading, error] = useCollectionData(
    user?.uid && query(collection(firestore, 'categories'))
  )
  const noActions = !showCategoryForm && !showTaskForm && !showTasksAll
  return !user ? (
    <Spin />
  ) : (
    <Row noGutters>
      <Col cw={4}>
        <Row
          width="inherit"
          noGutters
          p={2}
          style={{
            background: '#e5e5e5',
            borderRadius: '12px',
            position: 'fixed',
            top: '0',
            left: '0',
            bottom: '0'
          }}
        >
          <Col cw={12} h="left">
            <Row v="center" h="between" width="inherit">
              <Col cw="auto">
                <Title level={4}>Your categories:</Title>
              </Col>
              <Col cw="auto">
                <AddBtn
                  onClick={() => {
                    setShowCategoryForm(true)
                    setShowTaskForm(false)
                    setShowTasksAll(false)
                  }}
                >
                  Create category
                </AddBtn>
              </Col>
            </Row>

            <Divider my={3} />
            <Row width="inherit">
              <Col>
                {lists?.length !== 0 &&
                  lists?.map((list) => (
                    <CategorySimpleView
                      list={list}
                      setShowTaskForm={setShowTaskForm}
                      showTaskForm={showTaskForm}
                      _id={list?._id}
                      showTasksAll={showTasksAll}
                      setShowTasksAll={setShowTasksAll}
                    />
                  ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col>
        {noActions && (
          <Row>
            <Col h="center">
              <Title textAlign="center">
                Choose a category to proceed working with the planner
              </Title>
              <Img
                objectFit="contain"
                height="600px"
                src="https://img.freepik.com/free-vector/time-management-calendar-method-appointment-planning-business-organizer-people-drawing-mark-work-schedule-cartoon-characters-colleagues-teamwork_335657-2096.jpg?w=2000"
              ></Img>
            </Col>
          </Row>
        )}
        {showCategoryForm && (
          <Row>
            <Col>
              <CategorySimpleForm
                setShowCategoryForm={setShowCategoryForm}
                showCategoryForm={showCategoryForm}
                showTasksAll={showTasksAll}
                setShowTasksAll={setShowTasksAll}
              />
            </Col>
          </Row>
        )}
        {showTaskForm && (
          <Row>
            <Col>
              <TaskSimpleForm
                setShowTaskForm={setShowTaskForm}
                showTaskForm={showTaskForm}
                showTasksAll={showTasksAll}
                setShowTasksAll={setShowTasksAll}
              />
            </Col>
          </Row>
        )}
        {showTasksAll && (
          <TaskList
            setShowTasksAll={setShowTasksAll}
            setShowCategoryForm={setShowCategoryForm}
            setShowTaskForm={setShowTaskForm}
          />
        )}
      </Col>
    </Row>
  )
}

export default Account
