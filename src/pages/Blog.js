import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import API from "../services/api"

export default function Blog() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    API.get("/bookings/blogs/")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="bg-[#f8f5ec] min-h-screen">
      <Navbar />

      <main className="pt-32 px-5 pb-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-green-950 mb-3">Blog</h1>
        <p className="text-gray-600 mb-10">Tree care, farming stories and green living tips.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="bg-white rounded-2xl overflow-hidden shadow hover:-translate-y-1 transition">
              {blog.image_url && <img src={blog.image_url} alt="" className="h-52 w-full object-cover" />}
              <div className="p-5">
                <h2 className="text-xl font-black text-green-950">{blog.title}</h2>
                <p className="text-gray-600 text-sm mt-3">{blog.short_description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}