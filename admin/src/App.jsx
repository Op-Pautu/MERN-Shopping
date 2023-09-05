import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import './App.css'
const admin = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.isAdmin

const Layout = () => {
  return (
    <>
        <Topbar/>
        <div className="container">
          <div className="menuContainer">
              <Sidebar />
            </div>
          <div className="contentContainer">
              <Outlet/>
          </div>
        </div>
    </>
  )
}
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: admin && <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <UserList />,
        },
        {
          path: "/products",
          element: <ProductList />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: '/newuser',
          element: <NewUser/>
        },
        {
          path: '/newproduct',
          element: <NewProduct/>
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
   
     return <RouterProvider router={router} />;
 
}

export default App;
