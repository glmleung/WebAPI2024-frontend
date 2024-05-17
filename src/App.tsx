import axios from "axios";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
axios.defaults.baseURL = "http://localhost:10888";
import "./App.css";
import Home from "./components/Home";
import {  Layout, Menu } from "antd";
const { Header, Footer, Content } = Layout;

const AppLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Layout>
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
          ]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content
        style={{
          textAlign: "center",
          minHeight: 120,
          lineHeight: "120px",
          color: "#fff",
          backgroundColor: "#0958d9",
        }}
      >
        <Outlet></Outlet>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" Component={AppLayout}>
          <Route index Component={Home} />
          <Route path="2" Component={Home} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
