import React from 'react'
import { Alert, Space } from 'antd'
import './AlertMessage.css'

const AlertMessage = ({ message, description, type }) => {
  return (
    <Space direction="vertical" className="alert-space">
      <Alert message={message} description={description} type={type} showIcon />
    </Space>
  )
}

export default AlertMessage
