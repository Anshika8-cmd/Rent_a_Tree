
import { Link, useNavigate } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa"

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-5">
      <div className="mt-4 w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-green-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">
              🌳
            </div>

            <div>
              <h1 className="text-xl font-black text-green-950 leading-none">
                RentATree
              </h1>
              <p className="text-[11px] text-gray-500 mt-1">
                Trees for every space
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-700">
            <Link to="/">Home</Link>
            <Link to="/trees">Rent a Tree</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            {token && <Link to="/dashboard">Dashboard</Link>}

          </nav>

          <div className="flex items-center gap-3">
            {token && (
              <Link
                to="/cart"
                className="bg-green-100 text-green-900 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-green-200 transition"
                title="Cart"
              >
                <FaShoppingCart />
              </Link>
            )}

            {token ? (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block text-sm font-bold">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-green-900 text-white px-4 py-2 rounded-xl text-sm font-bold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}