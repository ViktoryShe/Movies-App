import React from 'react'
import { Alert, Space } from 'antd'
import './Error.css'

const ErrorComponent = () => {
  return (
    <Space direction="vertical" className="error-space">
      <Alert message="Что-то пошло не так" description="Но скоро все исправится" type="error" showIcon />
    </Space>
  )
}

export default ErrorComponent
