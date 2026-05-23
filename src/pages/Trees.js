import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import API from "../services/api"

export default function Trees() {
  const [trees, setTrees] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [tier, setTier] = useState("")

  useEffect(() => {
    API.get(`/bookings/trees/?search=${search}&category=${category}&tier=${tier}`)
      .then((res) => setTrees(res.data))
      .catch((err) => console.log(err))
  }, [search, category, tier])

  return (
    <div className="bg-[#f8f5ec] min-h-screen">
      <Navbar />

      <main className="pt-32 px-5 pb-16 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-green-700 font-bold tracking-[3px] uppercase text-sm mb-3">
            Tree Collection
          </p>

          <h1 className="text-4xl md:text-5xl font-black text-green-950 mb-4">
            Pick Your Tree
          </h1>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Explore fruit, indoor, outdoor, decorative and event trees. Choose
            the perfect tree for your home, office or special occasion.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 grid md:grid-cols-3 gap-4 mb-10 border border-green-100">
          <input
            placeholder="Search tree..."
            value={search}
            className="border border-gray-200 px-4 py-3 rounded-xl outline-none text-sm focus:border-green-700"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            className="border border-gray-200 px-4 py-3 rounded-xl outline-none text-sm focus:border-green-700"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Fruit">Fruit</option>
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Decorative">Decorative</option>
            <option value="Event">Event</option>
            <option value="Medicinal">Medicinal</option>
          </select>

          <select
            value={tier}
            className="border border-gray-200 px-4 py-3 rounded-xl outline-none text-sm focus:border-green-700"
            onChange={(e) => setTier(e.target.value)}
          >
            <option value="">All Tiers</option>
            <option value="Base">Base</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trees.map((tree) => (
            <Link
              to={`/trees/${tree.id}`}
              key={tree.id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden border border-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={tree.image_url}
                  alt={tree.name}
                  className="h-56 w-full object-cover group-hover:scale-105 transition duration-500"
                />

                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-800">
                  {tree.category}
                </span>

                <span className="absolute top-4 right-4 bg-green-800 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {tree.tier}
                </span>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div>
                    <h2 className="text-xl font-black text-green-950">
                      {tree.name}
                    </h2>

                    <p className="text-sm text-gray-500 font-medium mt-1">
                      {tree.tree_type}
                    </p>
                  </div>

                  <span className="text-lg font-black text-green-800 whitespace-nowrap">
                    ₹{tree.price}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mt-3 line-clamp-2">
                  {tree.short_description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Stock: {tree.stock}
                  </span>

                  <span className="bg-green-900 text-white px-4 py-2 rounded-xl text-sm font-bold group-hover:bg-green-800 transition">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {trees.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center shadow-md border border-green-100">
            <h2 className="text-2xl font-black text-green-950">
              No trees found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing filters or add trees from the admin panel.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}