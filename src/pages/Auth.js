import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import API from "../services/api"
import { FaLeaf, FaLock, FaUser, FaEnvelope, FaPhone } from "react-icons/fa"

export default function Auth() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isLogin, setIsLogin] = useState(location.pathname !== "/register")

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  })

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  })

  const loginUser = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post("/auth/login/", loginForm)
      localStorage.setItem("token", res.data.access)
      navigate("/dashboard")
    } catch {
      alert("Invalid credentials")
    }
  }

  const registerUser = async (e) => {
    e.preventDefault()

    try {
      await API.post("/auth/register/", registerForm)
      alert("Registered successfully")
      setIsLogin(true)
      navigate("/login")
    } catch {
      alert("Registration failed")
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f2e9] relative overflow-hidden flex items-center justify-center px-5 py-8">
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-green-300 blur-3xl opacity-40 rounded-full"></div>
      <div className="absolute -bottom-28 -right-28 w-96 h-96 bg-lime-300 blur-3xl opacity-40 rounded-full"></div>

      <Link to="/" className="absolute top-5 left-6 flex items-center gap-3 z-20">
        <div className="w-10 h-10 rounded-2xl bg-green-900 text-white flex items-center justify-center">
          🌳
        </div>
        <div>
          <h1 className="text-xl font-black text-green-950">RentATree</h1>
          <p className="text-xs text-gray-500">Sustainable Living</p>
        </div>
      </Link>

      <div className="relative z-10 max-w-5xl w-full grid lg:grid-cols-2 gap-10 items-center mt-10 lg:mt-0">
        <div className="hidden lg:block">
          <p className="uppercase tracking-[4px] text-green-700 font-bold text-sm mb-4">
            Welcome to RentATree
          </p>

          <h1 className="text-5xl font-black leading-tight text-green-950">
            Grow your green space smarter.
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-md">
            Book trees, track bookings, and manage your green journey from one clean dashboard.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
            {["Fruit", "Indoor", "Event"].map((item) => (
              <div key={item} className="bg-white rounded-3xl p-5 shadow-md">
                <FaLeaf className="text-green-700 text-2xl mb-3" />
                <p className="font-black text-green-950 text-sm">{item} Trees</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[410px] mx-auto">
          {isLogin ? (
            <form
              onSubmit={loginUser}
              className="bg-white rounded-[30px] shadow-2xl p-7 min-h-[500px] flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center text-xl mb-5">
                <FaLeaf />
              </div>

              <h2 className="text-3xl font-black text-green-950 mb-2">
                Welcome Back
              </h2>

              <p className="text-gray-500 text-sm mb-6">
                Login to continue booking trees.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 border rounded-2xl px-4 py-3 bg-gray-50">
                  <FaUser className="text-green-700" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={loginForm.username}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, username: e.target.value })
                    }
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 border rounded-2xl px-4 py-3 bg-gray-50">
                  <FaLock className="text-green-700" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>
              </div>

              <button className="mt-6 w-full bg-green-900 hover:bg-green-800 text-white py-3.5 rounded-2xl font-black">
                Login
              </button>

              <p className="text-center mt-auto pt-5 text-gray-600 text-sm">
                New here?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false)
                    navigate("/register")
                  }}
                  className="text-green-800 font-black"
                >
                  Create account
                </button>
              </p>
            </form>
          ) : (
            <form
              onSubmit={registerUser}
              className="bg-white rounded-[30px] shadow-2xl p-6 min-h-[500px] flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center text-xl mb-3">
                <FaLeaf />
              </div>

              <h2 className="text-3xl font-black text-green-950 mb-1">
                Create Account
              </h2>

              <p className="text-gray-500 text-sm mb-4">
                Start your green journey today.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 border rounded-2xl px-4 py-3 bg-gray-50">
                  <FaUser className="text-green-700" />
                  <input
                    placeholder="Username"
                    value={registerForm.username}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, username: e.target.value })
                    }
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 border rounded-2xl px-4 py-3 bg-gray-50">
                  <FaEnvelope className="text-green-700" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, email: e.target.value })
                    }
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 border rounded-2xl px-4 py-3 bg-gray-50">
                  <FaPhone className="text-green-700" />
                  <input
                    placeholder="Phone"
                    value={registerForm.phone}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, phone: e.target.value })
                    }
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>

                <div className="flex items-center gap-3 border rounded-2xl px-4 py-3 bg-gray-50">
                  <FaLock className="text-green-700" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({ ...registerForm, password: e.target.value })
                    }
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>
              </div>

              <button className="mt-5 w-full bg-green-900 hover:bg-green-800 text-white py-3 rounded-2xl font-black">
                Register
              </button>

              <p className="text-center mt-auto pt-3 text-gray-600 text-sm">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true)
                    navigate("/login")
                  }}
                  className="text-green-800 font-black"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}