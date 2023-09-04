import "./App.css";
import Cart from "./pages/Cart";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Success from "./pages/Success";
const user = true

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/products',
    element: <ProductList />,
    children: [
      // Dynamic route for product category
      {
        path: ':category', // Use :category to denote the dynamic part
        element: <ProductList /> // Replace with your actual component
      }
    ]
  },
  {
    path: '/product/:id',
    element: <Product/>
  },
  {
    path: '/cart',
    element: <Cart/>
  },
  {
    path: '/register',
    element: user ? <Navigate to="/"/> :   <Register/> 
  },
  {
    path: '/login',
    element: user ? <Navigate to="/"/> :   <Login/> 
  },
  {
    path: '/success',
    element: <Success/>
  }


])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
