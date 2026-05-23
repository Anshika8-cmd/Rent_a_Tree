import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-black mb-3">Rent A Tree</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your trusted partner for premium tree leasing and seasonal produce experiences.
          </p>
        </div>

        <div>
          <h3 className="font-black mb-4">Quick Links</h3>
          <div className="space-y-2 text-gray-300 text-sm">
            <Link to="/trees" className="block">Rent a Tree</Link>
            <Link to="/about" className="block">About Us</Link>
            <Link to="/blog" className="block">Blog</Link>
            <Link to="/contact" className="block">Contact</Link>
          </div>
        </div>

        <div>
  <h3 className="font-black mb-4">Legal</h3>
  <div className="space-y-2 text-gray-300 text-sm">
    <Link to="/legal/terms-and-conditions" className="block">
      Terms & Conditions
    </Link>
    <Link to="/legal/privacy-policy" className="block">
      Privacy Policy
    </Link>
    <Link to="/legal/shipping-delivery" className="block">
      Shipping & Delivery
    </Link>
    <Link to="/legal/cancellation-refund" className="block">
      Cancellation & Refund
    </Link>
  </div>
</div>

        <div>
          <h3 className="font-black mb-4">Contact</h3>
          <div className="space-y-2 text-gray-300 text-sm">
            <p>info@rentatree.in</p>
            <p>+91 7000XXXXX</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-10 pt-6 text-sm text-gray-400">
        © 2026 Rent A Tree by ..... All rights reserved.
      </div>
    </footer>
  )
}