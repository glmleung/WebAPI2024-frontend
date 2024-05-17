import axios, { AxiosError } from "axios";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
axios.defaults.baseURL = "http://localhost:10888";
axios.interceptors.request.use(req => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req
})
axios.interceptors.response.use(res => {
  return res
}, err => {
  if(err instanceof AxiosError) {
    if (err.response?.data) {
      throw new Error(err.response.data)
    }
  }
  throw err
})
import "./App.css";
import Home from "./components/Home";
import {  Layout, Menu } from "antd";
import Register from "./components/Register";
const { Header, Footer, Content } = Layout;

const AppLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Layout style={{minHeight:'100vh'}}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          onSelect={(item) => {
            navigate(item.key);
          }}
          selectedKeys={[pathname]}
          items={[
            { label: "Home", key: "/" },
            { label: "Register", key: "/register" },
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content
        style={{
          textAlign: "center",
          flex:1,
          padding: 24
        }}
      >
        <Outlet></Outlet>
      </Content>
      <Footer style={{backgroundColor:"#ddd"}}>Footer</Footer>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" Component={AppLayout}>
          <Route index Component={Home} />
          <Route path="register" Component={Register} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
