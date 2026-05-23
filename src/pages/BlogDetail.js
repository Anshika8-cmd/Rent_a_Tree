import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import API from "../services/api"

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    API.get(`/bookings/blogs/${id}/`).then((res) => setBlog(res.data))
  }, [id])

  if (!blog) return null

  return (
    <div className="bg-[#f8f5ec] min-h-screen">
      <Navbar />

      <main className="pt-32 px-5 pb-16 max-w-4xl mx-auto">
        {blog.image_url && <img src={blog.image_url} alt="" className="w-full h-96 object-cover rounded-3xl shadow mb-8" />}

        <h1 className="text-4xl font-black text-green-950 mb-5">{blog.title}</h1>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{blog.content}</p>
      </main>

      <Footer />
    </div>
  )
}