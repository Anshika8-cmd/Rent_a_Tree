// import { useState } from "react"
// import Navbar from "../components/Navbar"
// import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

// export default function Contact() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   })

//   const submitForm = (e) => {
//     e.preventDefault()
//     alert("Message submitted successfully")
//     setForm({ name: "", email: "", message: "" })
//   }

//   return (
//     <div className="bg-[#f8f5ec] min-h-screen">
//       <Navbar />

//       <section className="pt-36 px-6 pb-20">
//         <div className="max-w-7xl mx-auto">
//           <p className="uppercase tracking-[4px] text-green-700 font-bold mb-5">
//             Contact Us
//           </p>

//           <h1 className="text-5xl md:text-7xl font-black text-green-950 mb-6">
//             Let’s grow something together.
//           </h1>

//           <p className="text-xl text-gray-600 max-w-3xl mb-12">
//             Have questions about tree rentals, bookings, availability or custom
//             requirements? Send us a message and our team will help you.
//           </p>

//           <div className="grid lg:grid-cols-2 gap-10">
//             <div className="bg-white rounded-[36px] p-8 shadow-xl">
//               <form onSubmit={submitForm}>
//                 <input
//                   placeholder="Your name"
//                   value={form.name}
//                   className="w-full border p-4 rounded-2xl mb-4 outline-none"
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 />

//                 <input
//                   placeholder="Email address"
//                   value={form.email}
//                   className="w-full border p-4 rounded-2xl mb-4 outline-none"
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 />

//                 <textarea
//                   placeholder="Your message"
//                   value={form.message}
//                   rows="6"
//                   className="w-full border p-4 rounded-2xl mb-4 outline-none"
//                   onChange={(e) =>
//                     setForm({ ...form, message: e.target.value })
//                   }
//                 />

//                 <button className="w-full bg-green-900 text-white py-4 rounded-2xl font-black">
//                   Send Message
//                 </button>
//               </form>
//             </div>

//             <div className="space-y-6">
//               <div className="bg-white rounded-3xl p-8 shadow flex gap-5">
//                 <FaPhone className="text-3xl text-green-700" />
//                 <div>
//                   <h3 className="text-2xl font-black">Phone</h3>
//                   <p className="text-gray-600 mt-2">+91 98XXXXXXXX</p>
//                 </div>
//               </div>

//               <div className="bg-white rounded-3xl p-8 shadow flex gap-5">
//                 <FaEnvelope className="text-3xl text-green-700" />
//                 <div>
//                   <h3 className="text-2xl font-black">Email</h3>
//                   <p className="text-gray-600 mt-2">support@rentatree.com</p>
//                 </div>
//               </div>

//               <div className="bg-white rounded-3xl p-8 shadow flex gap-5">
//                 <FaMapMarkerAlt className="text-3xl text-green-700" />
//                 <div>
//                   <h3 className="text-2xl font-black">Location</h3>
//                   <p className="text-gray-600 mt-2">
//                     Pune, Maharashtra, India
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }






















import { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const submitForm = (e) => {
    e.preventDefault()
    alert("Message submitted successfully")
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <div className="bg-[#f8f5ec] min-h-screen">
      <Navbar />

      <main className="pt-32 px-5 pb-16 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[3px] text-green-700 font-bold text-xs mb-3">
            Contact Us
          </p>

          <h1 className="text-3xl md:text-5xl font-black text-green-950 mb-4">
            Let’s grow something together.
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Have questions about tree rentals, availability or custom
            requirements? Send us a message.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={submitForm}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-green-100"
          >
            <input
              placeholder="Your name"
              value={form.name}
              className="w-full border border-gray-200 p-4 rounded-2xl mb-4 outline-none focus:border-green-700 text-sm"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email address"
              value={form.email}
              className="w-full border border-gray-200 p-4 rounded-2xl mb-4 outline-none focus:border-green-700 text-sm"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <textarea
              placeholder="Your message"
              value={form.message}
              rows="6"
              className="w-full border border-gray-200 p-4 rounded-2xl mb-4 outline-none focus:border-green-700 resize-none text-sm"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <button className="w-full bg-green-900 text-white py-3.5 rounded-2xl font-black text-sm">
              Send Message
            </button>
          </form>

          <div className="space-y-5">
            {[
              [<FaPhone />, "Phone", "+91 78XXXXXXXX"],
              [<FaEnvelope />, "Email", "info@rentatree.in"],
              [
                <FaMapMarkerAlt />,
                "Location",
                "Panampilly Nagar, Ernakulam, Kerala",
              ],
            ].map((item) => (
              <div className="bg-white rounded-3xl p-6 shadow border border-green-100 flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-800 flex items-center justify-center text-xl">
                  {item[0]}
                </div>

                <div>
                  <h3 className="text-xl font-black text-green-950">
                    {item[1]}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm">{item[2]}</p>
                </div>
              </div>
            ))}

            <div className="bg-green-950 text-white rounded-3xl p-7">
              <h3 className="text-2xl font-black mb-3">Visit or enquire</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our team can help you choose the right tree category for home,
                office, farm, events or seasonal produce experiences.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}