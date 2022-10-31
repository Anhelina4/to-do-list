import { Box, Button, Icon } from '@qonsoll/react-design'

import { PlusOutlined } from '@ant-design/icons'
import React from 'react'

const AddBtn = ({ onClick, children }) => {
  return (
    <>
      <Button type="ghost" onClick={onClick}>
        <Box display="flex">
          <Icon component={<PlusOutlined />} mr={children && 2} />
          {children}
        </Box>
      </Button>
    </>
  )
}

export default AddBtn
