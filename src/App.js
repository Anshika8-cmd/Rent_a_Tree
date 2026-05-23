import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Trees from "./pages/Trees"
import TreeDetail from "./pages/TreeDetail"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Blog from "./pages/Blog"
import BlogDetail from "./pages/BlogDetail"
import LegalPage from "./pages/LegalPage"
import ProtectedRoute from "./components/ProtectedRoute"
import FrontendAdmin from "./pages/FrontendAdmin"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

<Route path="/admin" element={<FrontendAdmin />} />   

        <Route path="/trees" element={<Trees />} />
        <Route path="/trees/:id" element={<TreeDetail />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal/:slug" element={<LegalPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App