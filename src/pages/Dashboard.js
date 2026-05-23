
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import API from "../services/api"

export default function Dashboard() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    API.get("/bookings/my-bookings/")
      .then((res) => setBookings(res.data))
      .catch(() => {})
  }, [])

  const pending = bookings.filter((b) => b.status === "Pending").length
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length

  return (
    <div className="bg-[#f8f5ec] min-h-screen">
      <Navbar />

      <main className="pt-32 px-5 pb-16 max-w-7xl mx-auto">
        <div className="mb-7">
          <p className="uppercase tracking-[3px] text-green-700 font-bold text-xs mb-2">
            User Panel
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-green-950">
            My Dashboard
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-gradient-to-br from-green-900 to-green-700 text-white p-6 rounded-3xl shadow-xl">
            <p className="text-green-100 font-bold text-sm">Total Bookings</p>
            <div className="flex justify-between items-end mt-4">
              <h2 className="text-4xl font-black">{bookings.length}</h2>
              <span className="text-3xl">🌳</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-3xl shadow-xl">
            <p className="text-yellow-50 font-bold text-sm">Pending</p>
            <div className="flex justify-between items-end mt-4">
              <h2 className="text-4xl font-black">{pending}</h2>
              <span className="text-3xl">⏳</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-3xl shadow-xl">
            <p className="text-emerald-50 font-bold text-sm">Confirmed</p>
            <div className="flex justify-between items-end mt-4">
              <h2 className="text-4xl font-black">{confirmed}</h2>
              <span className="text-3xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-5 md:p-6">
          <h2 className="text-2xl font-black text-green-950 mb-5">
            My Booked Trees
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-[#f8f5ec] rounded-3xl border border-green-100 overflow-hidden flex flex-col md:flex-row"
              >
                <img
                  src={b.tree_image}
                  alt={b.tree_name}
                  className="md:w-44 h-44 object-cover"
                />

                <div className="p-5 flex-1">
                  <p className="text-xs font-black text-green-700 mb-1">
                    {b.tree_code}
                  </p>

                  <h3 className="text-lg font-black text-green-950">
                    {b.tree_name}
                  </h3>

                  <p className="mt-3 text-sm">
                    Status:{" "}
                    <span
                      className={`font-black ${
                        b.status === "Confirmed"
                          ? "text-green-700"
                          : b.status === "Cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {b.status}
                    </span>
                  </p>

                  <p className="text-gray-600 text-sm mt-2">Phone: {b.phone}</p>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {b.address}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {bookings.length === 0 && (
            <div className="bg-[#f8f5ec] rounded-3xl p-10 text-center border border-green-100">
              <h2 className="text-2xl font-black text-green-950">
                No bookings yet
              </h2>
              <p className="text-gray-500 mt-2">
                Go to Trees page and book your first tree.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}