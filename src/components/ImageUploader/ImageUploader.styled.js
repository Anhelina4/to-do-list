import { Upload } from 'antd'
import styled from 'styled-components'

const UploadStyled = styled(Upload)`
  & .ant-upload.ant-upload-select-picture-card {
    width: 150px;
    height: 150px;
    padding: 0px;
    position: relative;

    margin-right: 0;
    & > .ant-upload {
      display: block;
      flex-direction: column;
    }
  }
  &.ant-upload-picture-card-wrapper {
    width: unset;
  }
  .img-avatar {
    border-radius: 8px;
    width: 150px;
    height: 150px;
    cursor: pointer;
    object-fit: cover;
    margin-left: -1px;
    margin-top: -1px;
  }
`

export default UploadStyled
