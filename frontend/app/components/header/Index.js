"use client"
import { MessageCircle, Star } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import Link from "next/link"

const Index = ({ phone, setIsChatOpen }) => {
  // Remove all non-digit characters for the WhatsApp link
  const whatsappLink = `https://wa.me/${phone.replace(/\D/g, '')}`

  return (
    <header className="bg-gray-900/80 backdrop-blur-xl shadow-2xl border-b border-gray-700/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center relative">
              <Link
                href="/"
                className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent hover:from-purple-300 hover:via-pink-300 hover:to-blue-300 transition-all duration-300 tracking-tight"
              >
                Axon
              </Link>
            </div>
            <div className="hidden md:block">
              <p className="text-gray-300 text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Professional Digital Solutions
              </p>
              <div className="flex items-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-400 fill-current" />
                ))}
                <span className="text-xs text-gray-400 ml-2">Trusted by 100+ merchants</span>
              </div>
            </div>
          </div>

          {/* Contact Info & Chat */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-8 text-sm">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 px-4 py-2 rounded-full border border-emerald-700/50 hover:scale-105 transition-all duration-300"
              >
                <FaWhatsapp size={20} className="text-emerald-400" />
                <span className="font-semibold text-gray-200">{phone}</span>
              </a>
            </div>

            {/* Mobile view: show WhatsApp number as clickable too */}
            <div className="lg:hidden">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 bg-emerald-900/30 rounded-full border border-emerald-700/50 hover:scale-105 transition-all duration-300"
              >
                <FaWhatsapp size={18} className="text-emerald-400" />
                <span className="text-gray-200 font-medium text-sm">{phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Index