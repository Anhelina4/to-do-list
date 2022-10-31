import {
  Box,
  Button,
  Col,
  Divider,
  Row,
  Spin,
  Text,
  Title
} from '@qonsoll/react-design'
import { ListSimpleForm, ListSimpleView } from 'domains/List/components'
import React, { useState } from 'react'
import { collection, doc, query, where } from 'firebase/firestore'

import { AddBtn } from 'components'
import { TaskSimpleForm } from 'domains/Task/components'
import { UserAuth } from 'context/AuthContext'
import firebase from 'firebase/compat/app'
import { firestore } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const Account = () => {
  const { logOut, user } = UserAuth()
  const [showListForm, setShowListForm] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [currentList, setCurrentList] = useState(false)

  // [ADDITIONAL HOOKS]
  const [lists, loading, error] = useCollectionData(
    user?.uid && query(collection(firestore, 'lists'))
  )

  return !user ? (
    <Spin />
  ) : (
    <Row noGutters>
      <Col cw={3}>
        <Row
          noGutters
          mb={3}
          p={2}
          style={{
            height: '800px',
            background: '#e5e5e5',
            borderRadius: '12px'
          }}
        >
          <Col cw={12} h="left">
            <Row v="center" h="between" width="inherit">
              <Col cw="auto">
                <Title level={4}>Your Lists</Title>
              </Col>
              <Col cw="auto">
                <AddBtn onClick={() => setShowListForm(true)}>
                  Create List
                </AddBtn>
              </Col>
            </Row>

            <Divider my={3} />
            <Row width="inherit">
              <Col>
                {lists?.length !== 0 &&
                  lists?.map((list) => (
                    <ListSimpleView
                      list={list}
                      setShowTaskForm={setShowTaskForm}
                      showTaskForm={showTaskForm}
                      currentList={currentList}
                      setCurrentList={setCurrentList}
                    />
                  ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col>
        {showListForm && (
          <Row>
            <Col>
              <ListSimpleForm
                setShowListForm={setShowListForm}
                showListForm={showListForm}
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
                currentList={currentList}
              />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  )
}

export default Account
