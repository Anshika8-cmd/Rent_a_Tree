import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import API from "../services/api"

export default function TreeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [tree, setTree] = useState(null)
  const [mainImage, setMainImage] = useState("")
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
  })

  const [review, setReview] = useState({
    rating: 5,
    comment: "",
    photo: null,
  })

  useEffect(() => {
    API.get(`/bookings/trees/${id}/`)
      .then((res) => {
        setTree(res.data)
        setMainImage(res.data.image_url)
      })
      .catch((err) => console.log(err))
  }, [id])

  const bookTree = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/login")
      return
    }

    if (!form.customer_name || !form.phone || !form.address) {
      alert("Please fill all booking details")
      return
    }

    await API.post("/bookings/create/", {
      tree: id,
      ...form,
    })

    alert("Booking placed successfully")
    navigate("/dashboard")
  }

  const addToCart = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/login")
      return
    }

    await API.post("/bookings/cart/add/", {
      tree: id,
    })

    alert("Added to cart")
  }

  const submitReview = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/login")
      return
    }

    const data = new FormData()
    data.append("tree", id)
    data.append("rating", review.rating)
    data.append("comment", review.comment)

    if (review.photo) {
      data.append("photo", review.photo)
    }

    await API.post("/bookings/reviews/add/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    alert("Review added")
    window.location.reload()
  }

  if (!tree) {
    return (
      <div className="min-h-screen bg-[#f8f5ec] flex items-center justify-center">
        <p className="font-bold text-green-900">Loading...</p>
      </div>
    )
  }

  const galleryImages = [
    tree.image_url,
    ...(tree.gallery || []).map((img) => img.image_url),
  ].filter(Boolean)

  return (
    <div className="bg-[#f8f5ec] min-h-screen">
      <Navbar />

      <main className="pt-32 px-5 pb-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-green-100">
              <img
                src={mainImage}
                alt={tree.name}
                className="w-full h-[420px] md:h-[500px] object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-3 mt-4">
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setMainImage(img)}
                  className={`h-20 w-full object-cover rounded-xl cursor-pointer border-2 ${
                    mainImage === img ? "border-green-700" : "border-white"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                {tree.category}
              </span>

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                {tree.tier}
              </span>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                {tree.tree_type}
              </span>
            </div>

            <p className="text-xs font-black text-green-700 mb-2">
              Tree Code: {tree.tree_code}
            </p>

            <h1 className="text-3xl md:text-4xl font-black text-green-950 mb-3">
              {tree.name}
            </h1>

            <div className="flex items-center gap-4 mb-5">
              <h2 className="text-2xl font-black text-green-800">
                ₹{tree.price}
              </h2>

              <span className="bg-green-50 text-green-700 px-3 py-2 rounded-xl text-sm font-bold">
                Token ₹{tree.token_amount}
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {tree.description}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-[#f8f5ec] rounded-2xl p-4 text-center">
                <p className="text-gray-500 text-xs">Care</p>
                <h3 className="font-black text-sm">{tree.care_level}</h3>
              </div>

              <div className="bg-[#f8f5ec] rounded-2xl p-4 text-center">
                <p className="text-gray-500 text-xs">Height</p>
                <h3 className="font-black text-sm">{tree.height || "N/A"}</h3>
              </div>

              <div className="bg-[#f8f5ec] rounded-2xl p-4 text-center">
                <p className="text-gray-500 text-xs">Stock</p>
                <h3 className="font-black text-sm">{tree.stock}</h3>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={addToCart}
                className="w-1/2 bg-white border border-green-800 text-green-900 py-3 rounded-xl font-black"
              >
                Add to Cart
              </button>

              <button
                onClick={bookTree}
                className="w-1/2 bg-green-900 text-white py-3 rounded-xl font-black"
              >
                Book Now
              </button>
            </div>

            <div className="bg-[#f8f5ec] rounded-3xl p-5">
              <h2 className="text-xl font-black text-green-950 mb-4">
                Booking Details
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.customer_name}
                  className="w-full border border-gray-200 bg-white px-4 py-3 rounded-xl outline-none"
                  onChange={(e) =>
                    setForm({ ...form, customer_name: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Phone number"
                  value={form.phone}
                  className="w-full border border-gray-200 bg-white px-4 py-3 rounded-xl outline-none"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                <textarea
                  rows="3"
                  placeholder="Full address"
                  value={form.address}
                  className="w-full border border-gray-200 bg-white px-4 py-3 rounded-xl outline-none resize-none"
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-14 grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-6 shadow border border-green-100">
            <h2 className="text-2xl font-black text-green-950 mb-5">
              User Reviews
            </h2>

            <div className="space-y-5">
              {(tree.reviews || []).map((r) => (
                <div key={r.id} className="border-b pb-4">
                  <div className="flex gap-4">
                    {r.photo_url && (
                      <img
                        src={r.photo_url}
                        alt=""
                        className="w-20 h-20 object-cover rounded-2xl"
                      />
                    )}

                    <div>
                      <p className="font-black text-green-950">
                        {r.username}
                      </p>
                      <p className="text-yellow-500 text-sm">
                        {"⭐".repeat(r.rating)}
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        {r.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {tree.reviews?.length === 0 && (
                <p className="text-gray-500 text-sm">No reviews yet.</p>
              )}
            </div>
          </div>

          <form
            onSubmit={submitReview}
            className="bg-white rounded-3xl p-6 shadow border border-green-100"
          >
            <h2 className="text-2xl font-black text-green-950 mb-5">
              Share Your Tree Experience
            </h2>

            <div className="flex gap-2 mb-4">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      type="button"
      key={star}
      onClick={() => setReview({ ...review, rating: star })}
      className={`text-3xl transition ${
        star <= review.rating ? "text-yellow-400" : "text-gray-300"
      }`}
    >
      ★
    </button>
  ))}
</div>

            <textarea
              rows="4"
              placeholder="Write your review"
              className="w-full border p-3 rounded-xl mb-3 resize-none"
              onChange={(e) =>
                setReview({ ...review, comment: e.target.value })
              }
            />

            <input
              type="file"
              className="w-full border p-3 rounded-xl mb-4 bg-white"
              onChange={(e) =>
                setReview({ ...review, photo: e.target.files[0] })
              }
            />

            <button className="w-full bg-green-900 text-white py-3 rounded-xl font-black">
              Post Review
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  )
}