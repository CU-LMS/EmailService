import React from 'react'
import { Button,Form, Input,message} from 'antd';
import { styled } from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';
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

const Register = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values) => {
        messageApi.destroy()
        messageApi.open({
            type: 'loading',
            content: 'Action in progress..',
            duration: 0,
        });
        try {
            const res = await publicRequest.post("/auth/register", {
                email: values.email,
                password: values.password
            })
            if(res.data){
                messageApi.destroy()
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
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
                        span: 12,
                    }}
                    wrapperCol={{
                        span: 20,
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
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
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
                            Sign Up
                        </Button>
                        <span style={{ display: 'block' }}>Or <Link to="/login">login now!</Link></span>
                    </Form.Item>
                </Form>

            </Wrapper>
        </Container>
    )
}

export default Register