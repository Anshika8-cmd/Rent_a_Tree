import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import API from "../services/api"

export default function Home() {
  const [trees, setTrees] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    API.get("/bookings/trees/")
      .then((res) => setTrees(res.data || []))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (trees.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trees.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [trees])

  const currentTree = trees[currentIndex]

  const categories = [
    ["Fruit", "🍋"],
    ["Indoor", "🪴"],
    ["Outdoor", "🌳"],
    ["Decorative", "🌿"],
    ["Event", "🎉"],
    ["Medicinal", "🌱"],
  ]

  return (
    <div className="bg-[#f8f5ec] min-h-screen">
      <Navbar />

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentTree?.id || "fallback"}
            src={currentTree?.image_url || "/farm.jpg"}
            alt="Tree"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/45"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-28">
          <div className="max-w-3xl text-white">
            <p className="uppercase tracking-[4px] text-green-300 font-bold text-sm mb-5">
              Premium Tree Rental Platform
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTree?.id || "text"}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                  Rent a{" "}
                  <span className="text-green-300">
                    {currentTree?.tree_type || "Green"}
                  </span>{" "}
                  Tree.
                </h1>

                <p className="text-xl md:text-2xl leading-relaxed text-gray-100 max-w-2xl">
                  {currentTree?.short_description ||
                    "Bring nature closer to your home, office, event or outdoor space."}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/trees"
                className="bg-green-700 hover:bg-green-600 text-white px-7 py-3.5 rounded-2xl font-bold shadow-xl transition"
              >
                Pick Your Tree
              </Link>

              <Link
                to="/about"
                className="bg-white/90 text-green-950 px-7 py-3.5 rounded-2xl font-bold shadow-xl hover:bg-white transition"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 overflow-hidden">
        <div className="text-center mb-10 px-5">
          <p className="uppercase tracking-[3px] text-green-700 font-bold text-sm mb-3">
            Explore Categories
          </p>

          <h2 className="text-3xl md:text-4xl font-black text-green-950">
            Trees for every space
          </h2>
        </div>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-5 w-max px-5"
        >
          {[...categories, ...categories].map(([name, icon], index) => (
            <Link
              key={`${name}-${index}`}
              to={`/trees?category=${name}`}
              className="w-64 shrink-0 bg-white rounded-3xl p-6 shadow border border-green-100"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-xl font-black text-green-950">
                {name} Trees
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Explore available {name.toLowerCase()} trees.
              </p>
            </Link>
          ))}
        </motion.div>
      </section>

      <section className="py-16 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="uppercase tracking-[3px] text-green-700 font-bold text-sm mb-3">
                Featured Collection
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-green-950">
                Featured Trees
              </h2>
            </div>

            <Link
              to="/trees"
              className="bg-green-900 text-white px-5 py-3 rounded-2xl text-sm font-bold"
            >
              View All
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trees.slice(0, 6).map((tree) => (
              <Link
                key={tree.id}
                to={`/trees/${tree.id}`}
                className="group bg-[#f8f5ec] rounded-3xl overflow-hidden shadow border border-green-100 hover:-translate-y-1 hover:shadow-xl transition"
              >
                <img
                  src={tree.image_url}
                  alt={tree.name}
                  className="h-56 w-full object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="p-5">
                  <p className="text-xs font-bold text-green-700 mb-1">
                    {tree.tree_code}
                  </p>

                  <h3 className="text-xl font-black text-green-950">
                    {tree.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {tree.tree_type}
                  </p>

                  <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                    {tree.short_description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

<section className="py-16 px-5 bg-[#f8f5ec]">
        <div className="max-w-7xl mx-auto bg-green-950 rounded-[36px] p-8 md:p-10 text-white">
          <div className="text-center mb-10">
            <p className="uppercase tracking-[3px] text-green-300 font-bold text-sm">
              Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-black mt-3">
              How RentATree Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["🌿", "Choose a Tree", "Explore trees by category and details."],
              ["📝", "Book Online", "Submit your booking request easily."],
              ["✅", "Get Confirmation", "Admin confirms your booking status."],
            ].map((step, index) => (
              <div
                key={step[1]}
                className="bg-white/10 border border-white/10 rounded-3xl p-7"
              >
                <div className="flex justify-between mb-5">
                  <span className="text-4xl">{step[0]}</span>
                  <span className="text-green-300 font-black text-2xl">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-black mb-3">{step[1]}</h3>
                <p className="text-sm text-gray-300">{step[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
<section className="py-16 px-5 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-10">
      <p className="uppercase tracking-[3px] text-green-700 font-bold text-sm mb-3">
        Customer Stories
      </p>

      <h2 className="text-3xl md:text-4xl font-black text-green-950">
        What People Say
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {trees
        .flatMap((tree) =>
          (tree.reviews || []).map((review) => ({
            ...review,
            tree_name: tree.name,
          }))
        )
        .slice(0, 6)
        .map((review, index) => (
          <div
            key={index}
            className="bg-[#f8f5ec] rounded-3xl p-6 border border-green-100 shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              {review.photo_url ? (
                <img
                  src={review.photo_url}
                  alt=""
                  className="w-16 h-16 rounded-2xl object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-green-200 flex items-center justify-center text-2xl">
                  🌿
                </div>
              )}

              <div>
                <h3 className="font-black text-green-950">
                  {review.username}
                </h3>

                <p className="text-xs text-gray-500">
                  {review.tree_name}
                </p>

                <p className="text-yellow-500 text-sm mt-1">
                  {"⭐".repeat(review.rating)}
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
    </div>
  </div>
</section>
      <Footer />
    </div>
  )
}