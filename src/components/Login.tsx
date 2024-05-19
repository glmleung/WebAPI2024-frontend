import { Button, Form, FormProps, Input, Typography } from "antd";
import { usePostAuthLogin } from "../api/auth/auth";
import { PostAuthRegisterBody } from "../api/model";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
type FieldType = PostAuthRegisterBody;
const Login = () => {
  const { mutateAsync } = usePostAuthLogin();
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  // Do not allow to access register page if user is already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const result = await mutateAsync({ data: values });
      const token = result.data.token;
      setToken(token);
    } catch (e) {
      alert(e);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Typography.Title>Login</Typography.Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
