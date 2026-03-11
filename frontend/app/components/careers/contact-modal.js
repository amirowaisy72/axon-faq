'use client'

import { useState } from 'react'
import { MessageCircle, Send, X, MessageSquare, Phone } from 'lucide-react'
import { phone, telegram } from "@/app/phone"

export default function ContactModal({ isOpen, onClose, title }) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        message: '',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [notification, setNotification] = useState(null) // { type: 'success' | 'error', message: string }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        setNotification(null) // clear previous notification

        const text = `
📩 New Application Submitted

👤 Name: ${formData.firstName} ${formData.lastName}
📞 Phone: ${formData.phone}
💬 Message: ${formData.message}
`

        const BOT_TOKEN = "8622519949:AAEzskvneiCfVIExLagyLx7ELDSAqVlF6R8";
        const CHAT_ID = "-5271471461";

        try {
            const res = await fetch(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chat_id: CHAT_ID, text }),
                }
            )
            const data = await res.json()

            if (data.ok) {
                setNotification({ type: 'success', message: '✅ Your application has been submitted successfully!' })
                setFormData({ firstName: "", lastName: "", phone: "", message: "" })
            } else {
                setNotification({ type: 'error', message: '❌ Failed to send application. Please try again.' })
                console.error(data)
            }
        } catch (err) {
            console.error(err)
            setNotification({ type: 'error', message: '❌ Something went wrong while sending the application.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    const whatsappNumber =  phone
    const telegramUsername = telegram

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 flex items-center justify-between p-8 border-b border-gray-700 bg-gradient-to-r from-gray-900 to-gray-800">
                        <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-200 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-8">
                        {/* Options Selection */}
                        {selectedOption === null && (
                            <div className="space-y-6">
                                <p className="text-gray-400 text-center mb-8">
                                    Choose how you'd like to contact us:
                                </p>

                                {/* Option 1: Live Mentor */}
                                <button
                                    onClick={() => setSelectedOption('mentor')}
                                    className="w-full group relative"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-800 to-pink-800 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                    <div className="relative bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-purple-600/50 transition-all duration-300 text-left hover:shadow-xl">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-700 to-pink-700 rounded-lg flex items-center justify-center">
                                                <MessageCircle className="text-white" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-100">Contact Live Mentor</h3>
                                                <p className="text-sm text-gray-400">Chat directly with our support team</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 ml-16">Fastest response via WhatsApp or Telegram</p>
                                    </div>
                                </button>

                                {/* Option 2: Application Form */}
                                <button
                                    onClick={() => setSelectedOption('form')}
                                    className="w-full group relative"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-800 to-teal-800 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                    <div className="relative bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-emerald-600/50 transition-all duration-300 text-left hover:shadow-xl">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-700 to-teal-700 rounded-lg flex items-center justify-center">
                                                <Send className="text-white" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-100">Send Application</h3>
                                                <p className="text-sm text-gray-400">Submit your details for review</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 ml-16">Fill out a quick form with your information</p>
                                    </div>
                                </button>
                            </div>
                        )}

                        {/* Mentor Contact Options */}
                        {selectedOption === 'mentor' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold text-gray-100">Contact Methods</h3>
                                    <button
                                        onClick={() => setSelectedOption(null)}
                                        className="text-gray-400 hover:text-gray-200 text-sm"
                                    >
                                        ← Back
                                    </button>
                                </div>

                                {/* WhatsApp Option */}
                                <a
                                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group relative"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-green-800 to-emerald-800 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                    <div className="relative bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-green-600/50 transition-all duration-300 hover:shadow-xl group-hover:translate-y-[-2px]">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-gradient-to-r from-green-700 to-emerald-700 rounded-lg flex items-center justify-center">
                                                    <MessageSquare className="text-white" size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-100">WhatsApp</h4>
                                                    <p className="text-sm text-gray-400 font-mono">{whatsappNumber}</p>
                                                </div>
                                            </div>
                                            <div className="text-2xl">📱</div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-4">Click to open WhatsApp and chat instantly</p>
                                    </div>
                                </a>

                                {/* Telegram Option */}
                                <a
                                    href={`https://t.me/${telegramUsername}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group relative"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-800 to-cyan-800 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                    <div className="relative bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-blue-600/50 transition-all duration-300 hover:shadow-xl group-hover:translate-y-[-2px]">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-lg flex items-center justify-center">
                                                    <MessageCircle className="text-white" size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-100">Telegram</h4>
                                                    <p className="text-sm text-gray-400 font-mono">{telegramUsername}</p>
                                                </div>
                                            </div>
                                            <div className="text-2xl">💬</div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-4">Click to open Telegram and connect with us</p>
                                    </div>
                                </a>

                                {/* Info Box */}
                                <div className="bg-blue-900/30 border border-blue-700/50 rounded-2xl p-4 text-center">
                                    <p className="text-sm text-blue-200">
                                        💡 You can use either method or both to reach out. We'll respond within 2-5 minutes!
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Application Form */}
                        {selectedOption === 'form' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold text-gray-100">Application Form</h3>
                                    <button
                                        onClick={() => setSelectedOption(null)}
                                        className="text-gray-400 hover:text-gray-200 text-sm"
                                    >
                                        ← Back
                                    </button>
                                </div>

                                {/* Form Fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleFormChange}
                                            placeholder="John"
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/50 transition-all duration-300"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleFormChange}
                                            placeholder="Doe"
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/50 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        placeholder="+1 (555) 123-4567"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/50 transition-all duration-300"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleFormChange}
                                        placeholder="Tell us more about your inquiry..."
                                        rows="5"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-600/50 focus:ring-1 focus:ring-purple-600/50 transition-all duration-300 resize-none"
                                    />
                                </div>

                                {/* Notification */}
                                {notification && (
                                    <div
                                        className={`p-4 rounded-lg text-center font-medium ${notification.type === 'success'
                                            ? 'bg-green-800 text-green-200 border border-green-700'
                                            : 'bg-red-800 text-red-200 border border-red-700'
                                            }`}
                                    >
                                        {notification.message}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg ${isSubmitting
                                        ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                                        : 'bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800 text-white hover:scale-105 hover:shadow-purple-700/50'
                                        }`}
                                >
                                    {isSubmitting ? 'Submitting...' : <><Send size={20} /> Submit Application</>}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
