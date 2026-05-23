import { useEffect, useMemo, useState } from "react"
import API from "../services/api"

export default function FrontendAdmin() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("admin_token"))
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [stats, setStats] = useState(null)
  const [bookings, setBookings] = useState([])
  const [trees, setTrees] = useState([])
  const [activeView, setActiveView] = useState("overview")
  const [search, setSearch] = useState("")

  const loginAdmin = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post("/auth/login/", loginForm)
      localStorage.setItem("admin_token", res.data.access)
      localStorage.setItem("token", res.data.access)
      setIsLoggedIn(true)
    } catch {
      alert("Invalid admin login")
    }
  }

  const logoutAdmin = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }

  const loadAdminData = () => {
    API.get("/bookings/admin/dashboard-stats/")
      .then((res) => setStats(res.data))
      .catch(() => {
        alert("Only admin/staff can access this page")
        logoutAdmin()
      })

    API.get("/bookings/admin/bookings/")
      .then((res) => setBookings(res.data))
      .catch(() => {})

    API.get("/bookings/trees/")
      .then((res) => setTrees(res.data))
      .catch(() => {})
  }

  useEffect(() => {
    if (isLoggedIn) loadAdminData()
  }, [isLoggedIn])

  const updateStatus = async (id, status) => {
    await API.patch(`/bookings/admin/bookings/${id}/status/`, { status })
    loadAdminData()
  }

  const filteredBookings = useMemo(() => {
    let data = bookings

    if (activeView === "pending") data = data.filter((b) => b.status === "Pending")
    if (activeView === "confirmed") data = data.filter((b) => b.status === "Confirmed")
    if (activeView === "cancelled") data = data.filter((b) => b.status === "Cancelled")

    if (search) {
      data = data.filter(
        (b) =>
          b.tree_name?.toLowerCase().includes(search.toLowerCase()) ||
          b.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
          b.phone?.includes(search) ||
          b.tree_code?.toLowerCase().includes(search.toLowerCase())
      )
    }

    return data
  }, [bookings, activeView, search])

  const filteredTrees = useMemo(() => {
    let data = trees

    if (activeView === "available") {
      data = data.filter((t) => t.available)
    }

    if (search) {
      data = data.filter(
        (t) =>
          t.name?.toLowerCase().includes(search.toLowerCase()) ||
          t.tree_type?.toLowerCase().includes(search.toLowerCase()) ||
          t.tree_code?.toLowerCase().includes(search.toLowerCase())
      )
    }

    return data
  }, [trees, activeView, search])

  const recentBookings = bookings.slice(0, 5)

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#071b12] flex items-center justify-center px-5 relative overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-green-500/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-[-140px] right-[-140px] w-[420px] h-[420px] bg-lime-400/20 blur-3xl rounded-full"></div>

        <form
          onSubmit={loginAdmin}
          className="relative z-10 bg-white rounded-[32px] shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-4">
              🌳
            </div>

            <h1 className="text-3xl font-black text-green-950">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-2">
              Login with staff or superuser account.
            </p>
          </div>

          <input
            placeholder="Admin username"
            className="w-full border border-gray-200 px-4 py-3 rounded-2xl mb-4 outline-none focus:border-green-700"
            onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
          />

          <input
            type="password"
            placeholder="Admin password"
            className="w-full border border-gray-200 px-4 py-3 rounded-2xl mb-5 outline-none focus:border-green-700"
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          />

          <button className="w-full bg-green-900 text-white py-3.5 rounded-2xl font-black">
            Login as Admin
          </button>
        </form>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#f8f5ec] flex items-center justify-center">
        <h1 className="text-2xl font-black text-green-950">Loading Admin Dashboard...</h1>
      </div>
    )
  }

  const showTrees = activeView === "trees" || activeView === "available"

  return (
    <div className="min-h-screen bg-[#f3efe5] flex">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-[#071b12] text-white min-h-screen fixed left-0 top-0 flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-black">🌳 RentATree</h1>
          <p className="text-green-200 text-sm mt-1">Admin Control Panel</p>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          <SideBtn active={activeView === "overview"} onClick={() => setActiveView("overview")} icon="📊" text="Overview" />
          <SideBtn active={activeView === "trees"} onClick={() => setActiveView("trees")} icon="🌳" text="All Trees" />
          <SideBtn active={activeView === "available"} onClick={() => setActiveView("available")} icon="🌿" text="Available Trees" />
          <SideBtn active={activeView === "bookings"} onClick={() => setActiveView("bookings")} icon="📦" text="Bookings" />
          <SideBtn active={activeView === "pending"} onClick={() => setActiveView("pending")} icon="⏳" text="Pending" />
          <SideBtn active={activeView === "confirmed"} onClick={() => setActiveView("confirmed")} icon="✅" text="Confirmed" />
          <SideBtn active={activeView === "cancelled"} onClick={() => setActiveView("cancelled")} icon="❌" text="Cancelled" />
        </nav>

        <div className="p-4 border-t border-white/10">
          <a
            href="http://127.0.0.1:8000/admin/"
            target="_blank"
            rel="noreferrer"
            className="block bg-white/10 text-center py-3 rounded-2xl font-bold hover:bg-white/20"
          >
            Open Django Admin
          </a>
        </div>
      </aside>

      {/* MAIN */}
      <main className="lg:ml-72 w-full">
        {/* TOPBAR */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-green-100">
          <div className="px-5 md:px-8 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="uppercase tracking-[3px] text-green-700 text-xs font-black">
                Admin Dashboard
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-green-950">
                {activeView === "overview"
                  ? "Dashboard Overview"
                  : showTrees
                  ? "Tree Management"
                  : "Booking Management"}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="hidden md:block border border-gray-200 bg-white px-4 py-2.5 rounded-2xl outline-none focus:border-green-700 text-sm w-64"
              />

              <button
                onClick={logoutAdmin}
                className="bg-red-500 text-white px-4 py-2.5 rounded-2xl text-sm font-bold"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="p-5 md:p-8">
          {/* MOBILE NAV */}
          <div className="lg:hidden flex gap-2 overflow-x-auto mb-6 pb-2">
            {[
              ["overview", "📊 Overview"],
              ["trees", "🌳 Trees"],
              ["bookings", "📦 Bookings"],
              ["pending", "⏳ Pending"],
              ["confirmed", "✅ Confirmed"],
              ["cancelled", "❌ Cancelled"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveView(key)}
                className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold ${
                  activeView === key ? "bg-green-900 text-white" : "bg-white text-green-950"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <input
            placeholder="Search tree, customer, phone, code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:hidden w-full border border-gray-200 bg-white px-4 py-3 rounded-2xl outline-none focus:border-green-700 text-sm mb-6"
          />

          {/* STATS */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-6 gap-4 mb-8">
            <StatCard title="Trees" value={stats.total_trees} icon="🌳" color="from-green-900 to-green-700" onClick={() => setActiveView("trees")} />
            <StatCard title="Available" value={stats.available_trees} icon="🌿" color="from-emerald-500 to-teal-600" onClick={() => setActiveView("available")} />
            <StatCard title="Bookings" value={stats.total_bookings} icon="📦" color="from-blue-500 to-indigo-600" onClick={() => setActiveView("bookings")} />
            <StatCard title="Pending" value={stats.pending_bookings} icon="⏳" color="from-yellow-500 to-orange-500" onClick={() => setActiveView("pending")} />
            <StatCard title="Confirmed" value={stats.confirmed_bookings} icon="✅" color="from-lime-500 to-green-600" onClick={() => setActiveView("confirmed")} />
            <StatCard title="Cancelled" value={stats.cancelled_bookings} icon="❌" color="from-red-500 to-rose-600" onClick={() => setActiveView("cancelled")} />
          </div>

          {activeView === "overview" && (
            <div className="grid xl:grid-cols-3 gap-6">
              <section className="xl:col-span-2 bg-white rounded-3xl shadow border border-green-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-black text-green-950">Recent Bookings</h3>
                  <button
                    onClick={() => setActiveView("bookings")}
                    className="text-sm font-bold text-green-700"
                  >
                    View all
                  </button>
                </div>

                <div className="space-y-4">
                  {recentBookings.map((b) => (
                    <div key={b.id} className="flex items-center gap-4 bg-[#f8f5ec] rounded-2xl p-4">
                      <img src={b.tree_image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-black text-green-950">{b.tree_name}</p>
                        <p className="text-xs text-gray-500">{b.customer_name} • {b.phone}</p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                  ))}

                  {recentBookings.length === 0 && (
                    <p className="text-gray-500 text-sm">No recent bookings.</p>
                  )}
                </div>
              </section>

              <section className="bg-[#071b12] rounded-3xl shadow p-6 text-white">
                <h3 className="text-2xl font-black mb-4">Quick Summary</h3>
                <div className="space-y-4">
                  <SummaryRow label="Tree availability" value={`${stats.available_trees}/${stats.total_trees}`} />
                  <SummaryRow label="Pending actions" value={stats.pending_bookings} />
                  <SummaryRow label="Confirmed orders" value={stats.confirmed_bookings} />
                  <SummaryRow label="Cancelled orders" value={stats.cancelled_bookings} />
                </div>
              </section>
            </div>
          )}

          {activeView !== "overview" && (
            showTrees ? (
              <TreeTable trees={filteredTrees} title={activeView === "available" ? "Available Trees" : "All Trees"} />
            ) : (
              <BookingTable bookings={filteredBookings} updateStatus={updateStatus} title={getBookingTitle(activeView)} />
            )
          )}
        </div>
      </main>
    </div>
  )
}

function SideBtn({ active, onClick, icon, text }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition ${
        active ? "bg-green-500 text-white" : "text-green-100 hover:bg-white/10"
      }`}
    >
      <span>{icon}</span>
      {text}
    </button>
  )
}

function StatCard({ title, value, icon, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left bg-gradient-to-br ${color} text-white rounded-3xl p-5 shadow-xl hover:-translate-y-1 transition`}
    >
      <div className="flex justify-between items-start">
        <p className="text-white/80 text-xs font-bold">{title}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <h2 className="text-4xl font-black mt-5">{value}</h2>
    </button>
  )
}

function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-black ${
        status === "Confirmed"
          ? "bg-green-100 text-green-700"
          : status === "Cancelled"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {status}
    </span>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4">
      <span className="text-green-100 text-sm">{label}</span>
      <span className="font-black text-xl">{value}</span>
    </div>
  )
}

function TreeTable({ trees, title }) {
  return (
    <section className="bg-white rounded-3xl shadow-lg border border-green-100 p-5 md:p-6">
      <h2 className="text-2xl font-black text-green-950 mb-5">{title}</h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {trees.map((tree) => (
          <div key={tree.id} className="bg-[#f8f5ec] rounded-3xl overflow-hidden border border-green-100">
            <img src={tree.image_url} alt="" className="h-44 w-full object-cover" />
            <div className="p-5">
              <p className="text-xs font-black text-green-700">{tree.tree_code}</p>
              <h3 className="text-xl font-black text-green-950 mt-1">{tree.name}</h3>
              <p className="text-sm text-gray-500">{tree.tree_type} • {tree.category}</p>
              <div className="flex justify-between mt-4">
                <span className="font-black text-green-800">₹{tree.price}</span>
                <span className="text-sm text-gray-600">Stock: {tree.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {trees.length === 0 && <p className="text-gray-500 text-center py-10">No trees found.</p>}
    </section>
  )
}

function BookingTable({ bookings, updateStatus, title }) {
  return (
    <section className="bg-white rounded-3xl shadow-lg border border-green-100 p-5 md:p-6">
      <h2 className="text-2xl font-black text-green-950 mb-5">{title}</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-sm">
          <thead>
            <tr className="bg-[#f8f5ec] text-left">
              <th className="p-4 rounded-l-xl">Tree</th>
              <th className="p-4">Code</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Address</th>
              <th className="p-4">Status</th>
              <th className="p-4 rounded-r-xl">Update</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={b.tree_image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                    <div>
                      <p className="font-black text-green-950">{b.tree_name}</p>
                      <p className="text-gray-500 text-xs">Booking #{b.id}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4 font-bold text-green-700">{b.tree_code}</td>
                <td className="p-4">{b.customer_name}</td>
                <td className="p-4">{b.phone}</td>
                <td className="p-4 max-w-[220px] text-gray-600">{b.address}</td>

                <td className="p-4">
                  <StatusBadge status={b.status} />
                </td>

                <td className="p-4">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && <p className="text-gray-500 text-center py-10">No bookings found.</p>}
    </section>
  )
}

function getBookingTitle(activeView) {
  if (activeView === "pending") return "Pending Bookings"
  if (activeView === "confirmed") return "Confirmed Bookings"
  if (activeView === "cancelled") return "Cancelled Bookings"
  return "All Bookings"
}