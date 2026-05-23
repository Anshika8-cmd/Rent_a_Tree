// import Navbar from "../components/Navbar"
// import Footer from "../components/Footer"
// import { Link } from "react-router-dom"

// export default function About() {
//   return (
//     <div className="bg-[#f8f5ec] min-h-screen">
//       <Navbar />

//       <main className="pt-32 px-5 pb-16 max-w-6xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-10 items-center">
//           <div>
//             <p className="uppercase tracking-[3px] text-green-700 font-bold text-sm mb-3">
//               About Us
//             </p>

//             <h1 className="text-4xl md:text-5xl font-black text-green-950 leading-tight mb-5">
//               Premium tree leasing for modern homes, farms and events.
//             </h1>

//             <p className="text-gray-600 leading-relaxed mb-5">
//               RentATree helps users discover, book and enjoy trees without
//               ownership hassle. From fruit trees to indoor, outdoor,
//               decorative, medicinal and event trees, our platform keeps
//               everything simple and digital.
//             </p>

//             <p className="text-gray-600 leading-relaxed">
//               Every tree is managed from the backend admin panel with real
//               images, codes, pricing, categories and availability.
//             </p>

//             <Link
//               to="/trees"
//               className="inline-block mt-7 bg-green-900 text-white px-6 py-3 rounded-2xl font-bold"
//             >
//               Rent a Tree
//             </Link>
//           </div>

//           <div className="bg-white rounded-3xl p-6 shadow border border-green-100">
//             <div className="grid sm:grid-cols-2 gap-4">
//               {[
//                 ["🌱", "Choose", "Select your preferred tree."],
//                 ["📝", "Book", "Submit booking details."],
//                 ["✅", "Confirm", "Admin confirms status."],
//                 ["🌿", "Enjoy", "Experience greenery."],
//               ].map((item) => (
//                 <div key={item[1]} className="bg-[#f8f5ec] rounded-2xl p-5">
//                   <div className="text-3xl mb-3">{item[0]}</div>
//                   <h3 className="font-black text-green-950">{item[1]}</h3>
//                   <p className="text-sm text-gray-600 mt-1">{item[2]}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <section className="mt-14 bg-green-950 text-white rounded-3xl p-8 md:p-10">
//           <h2 className="text-3xl font-black mb-4">Our Mission</h2>

//           <p className="text-gray-300 leading-relaxed max-w-4xl">
//             To make greenery accessible, flexible and enjoyable through a
//             digital-first tree rental experience that connects people with
//             farms, seasonal produce and sustainable living.
//           </p>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   )
// }










import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"

export default function About() {
  return (
    <div className="bg-[#f8f5ec] min-h-screen">
      <Navbar />

      <main className="pt-32 px-5 pb-16 max-w-7xl mx-auto">
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[3px] text-green-700 font-bold text-xs mb-3">
              About RentATree
            </p>

            <h1 className="text-3xl md:text-5xl font-black text-green-950 leading-tight mb-5">
              A modern way to lease trees and enjoy seasonal greenery.
            </h1>

            <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
              RentATree helps people rent fruit, indoor, outdoor, decorative,
              medicinal and event trees without permanent ownership hassle.
            </p>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Every tree has real photos, unique code, pricing, category and
              availability managed from the backend admin panel.
            </p>

            <Link
              to="/trees"
              className="inline-block mt-7 bg-green-900 text-white px-6 py-3 rounded-2xl text-sm font-bold"
            >
              Explore Trees
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-green-100">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["🌱", "Choose", "Select your preferred tree."],
                ["📝", "Book", "Submit booking request."],
                ["✅", "Confirm", "Admin updates status."],
                ["🌿", "Enjoy", "Experience greenery."],
              ].map((item) => (
                <div key={item[1]} className="bg-[#f8f5ec] rounded-2xl p-5">
                  <div className="text-3xl mb-3">{item[0]}</div>
                  <h3 className="font-black text-green-950">{item[1]}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item[2]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            ["500+", "Trees managed"],
            ["6", "Tree categories"],
            ["100%", "Digital booking"],
          ].map((item) => (
            <div className="bg-white rounded-3xl p-6 shadow border border-green-100">
              <h2 className="text-4xl font-black text-green-800">{item[0]}</h2>
              <p className="text-gray-600 font-bold mt-2">{item[1]}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 bg-green-950 text-white rounded-3xl p-8 md:p-10">
          <h2 className="text-3xl font-black mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed max-w-4xl text-sm md:text-base">
            To make greenery accessible, flexible and enjoyable through a
            digital-first tree rental experience that connects users with farms,
            trees, seasonal produce and sustainable living.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}