import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "../pages/Login"
import Register from "../pages/Register"
import PrivateRouter from "./PrivateRouter"
import Dashboard from "../pages/Dashboard"
import Home from "../pages/Home"
import Sales from "../pages/Sales"
import Brands from "../pages/Brands"
import Firms from "../pages/Firms"
import Products from "../pages/Products"
import Purchases from "../pages/Purchases"
import NotFound from "../pages/NotFound"
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="stock" element={<PrivateRouter />}>{/*privaterouterdan geçilirse hem dashbord hem de j-home açılsın diye böylke yazdıldı. ayrıca aşağıda relativepath kullanıldı */}
          <Route path="" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="sales" element={<Sales />} />
            <Route path="firms" element={<Firms />} />
            <Route path="brands" element={<Brands />} />
            <Route path="products" element={<Products />} />
            <Route path="purchases" element={<Purchases />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
