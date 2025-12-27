import React from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { loginApi} from '../utils/api';
import { noop } from 'antd/es/_util/warning';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../components/auth.context.jsx';

const LoginPage = () => {

  const navigate = useNavigate();
 const {setAuth} = useContext(AuthContext);
 
  const onFinish = async (values) => {
    const { email,  password } = values;
    const res = await loginApi(email,  password);

    if(res && res.EC === 0){
        localStorage.setItem("access_token", res.access_token);
      notification.success({
        message: 'Login Successfully',
        description:'Success'
      });

      setAuth({
  isAuthenticated: true,
        user: {
            email: res?.user?.email?? "",
            name: ""

        }
      })
      navigate('/');
    }
    else{
      notification.error({
        message: 'Login Failed',
        description: res?.EM ??  'False'
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
          <Button type="primary" htmlType="Login">
            Submit
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default LoginPage;
