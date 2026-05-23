import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const pages = {
  "terms-and-conditions": {
    title: "Terms & Conditions",
    date: "May 7, 2026",
    content: [
      "These Terms & Conditions govern your use of the Rent A Tree platform operated by Orgaharv Agritech LLP under the brand name Rent A Tree.",
      "Rent A Tree is a tree leasing and seasonal produce experience program, not a typical e-commerce store.",
      "Customers lease a tree for a season and receive package-based produce, tree updates, certificate, nameplate and related services.",
      "Leasing a tree does not grant land ownership or permanent rights.",
      "Customers must provide accurate contact and delivery details and understand that agricultural outcomes may vary due to natural factors.",
      "Rent A Tree may provide backup produce if the assigned tree yield is lower than the package guarantee.",
      "Disputes will be handled as per Indian law.",
      "Contact: info@rentatree.in | +91 79XXXXXXXX",
    ],
  },

  "privacy-policy": {
    title: "Privacy Policy",
    date: "May 7, 2026",
    content: [
      "This Privacy Policy explains how Orgaharv Agritech LLP collects and uses customer information.",
      "We may collect name, phone number, email, address, booking details, delivery information and website usage data.",
      "Payment details are processed securely by Razorpay. We do not store card or UPI details.",
      "Information is used to process bookings, provide tree updates, arrange delivery and improve the service experience.",
      "We do not sell user data.",
      "Data may be shared with payment providers, logistics partners, farm teams and legal authorities when required.",
      "Users may request access, correction or deletion of their data where legally possible.",
      "Contact: info@rentatree.in | +91 79XXXXXXXX",
    ],
  },

  "shipping-delivery": {
    title: "Shipping & Delivery Policy",
    date: "May 7, 2026",
    content: [
      "Shipping applies to produce, kits and certificates included in packages.",
      "Delivery is available across India. Remote areas may incur additional charges.",
      "Harvest timelines depend on season and weather conditions.",
      "After harvest, produce is usually dispatched within 2–5 days.",
      "Delivery typically takes 3–10 working days.",
      "Customers receive tracking details after dispatch.",
      "For damaged or tampered shipments, customers must share photos or videos within 24 hours.",
      "Rent A Tree is not responsible for delays caused by weather, strikes, lockdowns or natural disasters.",
    ],
  },

  "cancellation-refund": {
    title: "Cancellation & Refund Policy",
    date: "May 7, 2026",
    content: [
      "Cancellations are allowed within 7 days of booking and before tree allocation.",
      "Refunds may be issued after deducting payment gateway charges.",
      "Once a tree is allocated, no refund will be issued.",
      "Rent A Tree may cancel bookings due to tree unavailability, farm-side issues or operational constraints.",
      "In such cases, customers may receive a full refund or alternate tree allocation.",
      "Failed or duplicate payments will be handled in coordination with Razorpay.",
      "Refunds usually take 7–10 working days after approval.",
      "Contact: info@rentatree.in | +91 79XXXXXXXX ",
    ],
  },
}

export default function LegalPage() {
  const { slug } = useParams()
  const page = pages[slug]

  if (!page) {
    return (
      <div className="bg-[#f8f5ec] min-h-screen">
        <Navbar />
        <main className="pt-32 px-5 max-w-5xl mx-auto">
          <h1 className="text-3xl font-black">Page not found</h1>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-[#f8f5ec] min-h-screen">
      <Navbar />

      <main className="pt-32 px-5 pb-16 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow border border-green-100 p-8">
          <p className="text-sm font-bold text-green-700 mb-2">
            Last updated: {page.date}
          </p>

          <h1 className="text-4xl font-black text-green-950 mb-8">
            {page.title}
          </h1>

          <div className="space-y-5">
            {page.content.map((item, index) => (
              <p key={index} className="text-gray-700 leading-relaxed">
                {item}
              </p>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}