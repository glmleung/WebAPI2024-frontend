import axios, { AxiosError } from "axios";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import { Button, Layout, Menu, Typography } from "antd";
import Register from "./components/Register";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Login from "./components/Login";
import Charities from "./components/Charities";
import DogsManage from "./components/DogsManage";
import DogsList from "./components/DogsList";

axios.defaults.baseURL = "http://localhost:10888";
axios.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err instanceof AxiosError) {
      if(err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      if (err.response?.data) {
        throw new Error(err.response.data);
      }
    }
    throw err;
  }
);

const { Header, Footer, Content } = Layout;

const AppLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          onSelect={(item) => {
            navigate(item.key);
          }}
          selectedKeys={[pathname]}
          items={[
            { label: "Home", key: "/" },
            {
              label: "Register",
              key: "/register",
              style: { display: user ? "none" : "block" },
            },
            {
              label: "Login",
              key: "/login",
              style: { display: user ? "none" : "block" },
            },
            {
              label: "Charities",
              key: "/charities",
              style: { display: user?.role === "admin" ? "block" : "none" },
            },
            {
              label: "Dogs",
              key: "/dogs/list",
            },
            {
              label: "Manage dogs",
              key: "/dogs/manage",
              style: { display: user?.role === "worker" ? "block" : "none" },
            },
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
        {user && (
          <Typography.Text style={{ color: "white" }}>
            {user.role} - {user.username}
          </Typography.Text>
        )}
        <Button onClick={logout}>Logout</Button>
      </Header>
      <Content
        style={{
          flex: 1,
          padding: 24,
        }}
      >
        <Outlet></Outlet>
      </Content>
      <Footer style={{ backgroundColor: "#ddd" }}>Footer</Footer>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="*" Component={AppLayout}>
            <Route index Component={Home} />
            <Route path="register" Component={Register} />
            <Route path="login" Component={Login} />
            <Route path="charities" Component={Charities} />
            <Route path="dogs/manage" Component={DogsManage} />
            <Route path="dogs/list" Component={DogsList} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
