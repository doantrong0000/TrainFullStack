import React from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { createUserApi } from '../utils/api';
import { noop } from 'antd/es/_util/warning';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, name, password } = values;
    const res = await createUserApi(email, name, password);

    if(res){
      notification.success({
        message: 'Register Successfully',
        description:'Success',
      });
      navigate('/login');
    }
    else{
      notification.error({
        message: 'Register Failed',
        description: 'False',
      })
    }
    console.log('Success:', res);
  };
  return (
    <div style={{ marginTop: 50, textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
      <Form 
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
     layout='Vertical'
        onFinish={onFinish}
        autoComplete="off">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >

          <Input />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >

          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password   />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
    
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default RegisterPage;
