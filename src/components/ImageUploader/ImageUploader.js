import {
  Box,
  Col,
  Container,
  Icon,
  Img,
  Row,
  Spin,
  Text
} from '@qonsoll/react-design'
import { Dropdown, Menu } from 'antd'
import { useEffect, useState } from 'react'

import { DeleteButton } from 'components'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import UploadStyled from './ImageUploader.styled'
import { uploadImage } from 'helpers'

const ImageUploader = (props) => {
  const {
    initialValue,
    value,
    onChange,
    withDirectUpload = false,
    setImageData,
    imageData
  } = props

  const [file, setFile] = useState(null)
  const [photoIndex, setPhotoIndex] = useState()
  const [photoToDelete, setPhotoToDelete] = useState(null)
  // [HANDLER_FUNCTIONS]
  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const handleUpload = async ({ onSuccess, file }) => {
    if (withDirectUpload) {
      const url = await uploadImage(file)

      onChange?.(url)
      if (photoIndex >= 0) {
        imageData[photoIndex] = url
        setImageData(() => imageData)
        setFile(url)
      } else {
        setImageData(() => [...imageData, url])
      }
    } else {
      getBase64(file, (result) => {
        setFile(result)
        onChange?.(file)
      })
    }
    onSuccess()
  }
  const onUploadCurrentPhoto = () => {
    setPhotoIndex(imageData?.indexOf(initialValue))
  }

  useEffect(() => initialValue && setFile(initialValue), [initialValue])

  return (
    <Container>
      <Row noGutters>
        <Col cw="auto" flexDirection="row">
          {value && !file && (
            <Box mr={3}>
              <Img
                className="img-avatar"
                src={file || value}
                height="148px"
              ></Img>
            </Box>
          )}
          <UploadStyled
            multiple
            onClick={onUploadCurrentPhoto}
            fileList={null}
            listType="picture-card"
            showUploadList={true}
            customRequest={handleUpload}
          >
            {file ? (
              <Box>
                <Img className="img-avatar" src={file || value}></Img>
              </Box>
            ) : (
              <Box
                height="100%"
                flexDirection="column"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Row>
                  <Col>
                    <Icon component={<PlusOutlined />} />
                  </Col>
                </Row>
                <Text variant="body2" color="var(--text-secondary)">
                  Upload new image
                </Text>
              </Box>
            )}
          </UploadStyled>
        </Col>
      </Row>
    </Container>
  )
}

ImageUploader.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  withDirectUpload: PropTypes.bool,
  setImageData: PropTypes.func,
  imageData: PropTypes.array,
  initialValue: PropTypes.string
}

export default ImageUploader
