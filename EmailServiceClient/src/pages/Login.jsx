import React, { useContext } from 'react'
import { Button, Form, Input, message } from 'antd';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { publicRequest } from '../../requestMethods';
const Container = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Login = () => {
    const { loading, error, dispatch, user } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const checkAdmin = (data) => {
        if (data?.isAdmin) {
            return navigate("/")
        } else {
            // setEmail("")
            // setPassword("")
            message.info('Only admin have access here', 2.5)
        }
    }
    const onFinish = async (values) => {
        messageApi.destroy()
        messageApi.open({
            type: 'loading',
            content: 'Action in progress..',
            duration: 0,
        });
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await publicRequest.post("/auth/login", {email: values.email,password:values.password})
            messageApi.destroy()
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            checkAdmin(res.data)
        } catch (err) {
            messageApi.destroy()
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
            messageApi.open({
                type: 'error',
                content: 'wrong credentials',
            });
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Container>
             {contextHolder}
            <Wrapper>
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
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
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
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>
                        <span style={{display: 'block'}}>Or <Link to="/register">register now!</Link></span>
                    </Form.Item>
                </Form>
                
            </Wrapper>
        </Container>
    )
}

export default Login