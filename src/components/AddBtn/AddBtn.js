import { Box, Button, Icon } from '@qonsoll/react-design'

import { PlusOutlined } from '@ant-design/icons'
import React from 'react'

const AddBtn = ({ onClick, children }) => {
  return (
    <>
      <Button type="primary" onClick={onClick} px={!children && 2}>
        <Box display="flex">
          <Icon component={<PlusOutlined />} mr={children && 2} />
          {children}
        </Box>
      </Button>
    </>
  )
}

export default AddBtn
