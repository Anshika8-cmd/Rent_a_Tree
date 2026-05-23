import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import API from "../services/api"

export default function Cart() {
  const [items, setItems] = useState([])

  const loadCart = () => {
    API.get("/bookings/cart/")
      .then((res) => setItems(res.data))
      .catch(() => {})
  }

  useEffect(() => {
    loadCart()
  }, [])

  const removeItem = async (id) => {
    await API.delete(`/bookings/cart/remove/${id}/`)
    loadCart()
  }

  return (
    <div className="bg-[#f8f5ec] min-h-screen">
      <Navbar />

      <main className="pt-32 px-5 pb-16 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="uppercase tracking-[3px] text-green-700 font-bold text-sm mb-3">
              Saved Trees
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-green-950">
              My Cart
            </h1>
          </div>

          <Link
            to="/trees"
            className="bg-green-900 text-white px-5 py-3 rounded-2xl text-sm font-bold w-fit"
          >
            Add More Trees
          </Link>
        </div>

        <div className="grid gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 shadow-lg border border-green-100 flex flex-col md:flex-row gap-5"
            >
              <img
                src={item.tree.image_url}
                alt={item.tree.name}
                className="md:w-44 h-40 object-cover rounded-2xl"
              />

              <div className="flex-1">
                <p className="text-xs font-black text-green-700 mb-1">
                  {item.tree.tree_code}
                </p>

                <h2 className="text-2xl font-black text-green-950">
                  {item.tree.name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {item.tree.tree_type} • {item.tree.category}
                </p>

                <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                  {item.tree.short_description}
                </p>

                <p className="font-black text-green-800 mt-3 text-xl">
                  ₹{item.tree.price}
                </p>
              </div>

              <div className="flex md:flex-col gap-3 md:items-end">
                <Link
                  to={`/trees/${item.tree.id}`}
                  className="bg-green-900 text-white px-4 py-2 rounded-xl text-sm font-bold text-center"
                >
                  View
                </Link>

                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="bg-white p-10 rounded-3xl shadow-lg border border-green-100 text-center">
            <div className="text-5xl mb-4">🛒</div>

            <h2 className="text-2xl font-black text-green-950">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-2 mb-6">
              Save trees you like and come back to book them anytime.
            </p>

            <Link
              to="/trees"
              className="inline-block bg-green-900 text-white px-6 py-3 rounded-2xl font-bold"
            >
              Add Trees
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}