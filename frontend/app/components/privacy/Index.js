"use client"

import { useState } from "react"
import {
    Shield,
    Eye,
    Database,
    Share2,
    UserCheck,
    Settings,
    Globe,
    Lock,
    AlertTriangle,
    CheckCircle,
    Calendar,
    Clock,
    Download,
    Mail,
} from "lucide-react"
import ChatBox from "@/app/components/chat/Index"
import Header from "@/app/components/header/Index"
import Footer from "@/app/components/footer/Index"
import phone from "@/app/phone"

const privacyCategories = [
    { name: "Data Collection", icon: Database, active: false },
    { name: "Data Usage", icon: Eye, active: true },
    { name: "Data Sharing", icon: Share2, active: false },
    { name: "Your Rights", icon: UserCheck, active: false },
    { name: "Data Security", icon: Shield, active: false },
    { name: "Cookies & Tracking", icon: Settings, active: false },
]

const privacyContent = {
    "Data Collection": {
        title: "Information We Collect",
        lastUpdated: "December 20, 2024",
        icon: Database,
        summary: "We collect information to provide better services to our users. Here's what we collect and why.",
        sections: [
            {
                title: "Personal Information",
                content: `We collect personal information that you voluntarily provide to us when you:
• Create an account or register for our services
• Contact us for customer support
• Subscribe to our newsletters or marketing communications
• Participate in surveys, contests, or promotions
• Apply for job positions through our careers page

Personal information may include:
• Full name and contact information (email, phone, address)
• Professional information (job title, company, industry)
• Demographic information (age, gender, location)
• Payment and billing information
• Profile photos and other uploaded content`,
                importance: "high",
            },
            {
                title: "Automatically Collected Information",
                content: `When you use our services, we automatically collect certain information:
• Device information (IP address, browser type, operating system)
• Usage data (pages visited, time spent, click patterns)
• Location data (with your permission)
• Cookies and similar tracking technologies
• Log files and server data
• Performance and diagnostic information

This information helps us:
• Improve our services and user experience
• Analyze usage patterns and trends
• Detect and prevent security threats
• Provide technical support`,
                importance: "medium",
            },
            {
                title: "Third-Party Information",
                content: `We may receive information about you from third parties:
• Social media platforms (when you connect your accounts)
• Business partners and affiliates
• Public databases and directories
• Marketing and advertising partners
• Analytics and data providers

We only collect third-party information that is:
• Legally obtained and shared
• Relevant to our services
• Necessary for legitimate business purposes
• Compliant with applicable privacy laws`,
                importance: "medium",
            },
        ],
    },
    "Data Usage": {
        title: "How We Use Your Information",
        lastUpdated: "December 18, 2024",
        icon: Eye,
        summary: "We use your information to provide, improve, and personalize our services while respecting your privacy.",
        sections: [
            {
                title: "Service Provision",
                content: `We use your information to provide and maintain our services:
• Create and manage your account
• Process transactions and payments
• Deliver requested services and features
• Provide customer support and assistance
• Send service-related communications
• Authenticate your identity and prevent fraud

Our AI-powered optimization services use your data to:
• Analyze product performance and rankings
• Generate insights and recommendations
• Improve algorithm accuracy and effectiveness
• Provide personalized optimization strategies`,
                importance: "high",
            },
            {
                title: "Communication and Marketing",
                content: `With your consent, we may use your information for:
• Sending newsletters and promotional materials
• Notifying you about new features and services
• Conducting surveys and collecting feedback
• Inviting you to events and webinars
• Providing industry insights and reports

You can opt out of marketing communications at any time by:
• Clicking unsubscribe links in emails
• Updating your communication preferences
• Contacting our support team
• Using account settings to manage preferences`,
                importance: "medium",
            },
            {
                title: "Analytics and Improvement",
                content: `We analyze usage data to:
• Understand how our services are used
• Identify areas for improvement
• Develop new features and services
• Optimize performance and reliability
• Conduct research and development
• Generate anonymized insights and reports

All analytics are conducted with privacy protection:
• Data is aggregated and anonymized when possible
• Personal identifiers are removed or encrypted
• Access is limited to authorized personnel
• Results are used only for legitimate business purposes`,
                importance: "medium",
            },
        ],
    },
    "Data Sharing": {
        title: "When We Share Your Information",
        lastUpdated: "December 15, 2024",
        icon: Share2,
        summary:
            "We don't sell your personal information. We only share data when necessary for our services or required by law.",
        sections: [
            {
                title: "Service Providers",
                content: `We share information with trusted service providers who help us operate our business:
• Cloud hosting and infrastructure providers
• Payment processors and financial institutions
• Customer support and communication platforms
• Analytics and marketing service providers
• Security and fraud prevention services

All service providers must:
• Sign data processing agreements
• Implement appropriate security measures
• Use data only for specified purposes
• Comply with applicable privacy laws
• Allow us to audit their practices`,
                importance: "high",
            },
            {
                title: "Business Partners",
                content: `We may share information with business partners when:
• You explicitly consent to the sharing
• It's necessary to provide requested services
• We're collaborating on joint marketing initiatives
• It's required for integration with partner platforms

Partner sharing is always:
• Limited to necessary information only
• Governed by strict contractual agreements
• Subject to your consent and control
• Transparent and clearly communicated`,
                importance: "medium",
            },
            {
                title: "Legal Requirements",
                content: `We may disclose information when required by law or to:
• Comply with legal processes and court orders
• Respond to government requests and investigations
• Protect our rights, property, and safety
• Prevent fraud and security threats
• Enforce our terms of service

Legal disclosures are:
• Limited to what's legally required
• Reviewed by our legal team
• Documented and tracked
• Subject to applicable legal protections`,
                importance: "high",
            },
        ],
    },
    "Your Rights": {
        title: "Your Privacy Rights",
        lastUpdated: "December 22, 2024",
        icon: UserCheck,
        summary: "You have important rights regarding your personal information. Here's how to exercise them.",
        sections: [
            {
                title: "Access and Portability",
                content: `You have the right to:
• Access your personal information we hold
• Receive a copy of your data in a portable format
• Understand how your data is being used
• Review the sources of your information

To request access to your data:
• Log into your account settings
• Submit a data access request through our support
• Contact our privacy team directly
• Use our automated data export tools

We'll provide your data within 30 days in a commonly used format.`,
                importance: "high",
            },
            {
                title: "Correction and Updates",
                content: `You can correct or update your information by:
• Editing your account profile directly
• Contacting customer support
• Using our data correction forms
• Updating preferences in account settings

We encourage you to keep your information accurate and up-to-date. You can:
• Review and edit personal details anytime
• Update communication preferences
• Modify privacy settings
• Correct any inaccuracies you notice`,
                importance: "medium",
            },
            {
                title: "Deletion and Restriction",
                content: `You have the right to:
• Delete your account and associated data
• Request deletion of specific information
• Restrict processing of your data
• Object to certain uses of your information

Account deletion process:
• Submit deletion request through account settings
• Confirm your identity for security
• Choose what data to retain (if any)
• Receive confirmation of deletion

Note: Some information may be retained for legal compliance or legitimate business purposes.`,
                importance: "high",
            },
        ],
    },
    "Data Security": {
        title: "How We Protect Your Data",
        lastUpdated: "December 10, 2024",
        icon: Shield,
        summary:
            "We implement comprehensive security measures to protect your information from unauthorized access and misuse.",
        sections: [
            {
                title: "Technical Safeguards",
                content: `We protect your data with industry-standard security measures:
• End-to-end encryption for data transmission (TLS 1.3)
• AES-256 encryption for data at rest
• Multi-factor authentication for account access
• Regular security audits and penetration testing
• Automated threat detection and response
• Secure data centers with physical access controls

Our infrastructure includes:
• Redundant backup systems
• Disaster recovery procedures
• Network security monitoring
• Regular security updates and patches
• Intrusion detection systems`,
                importance: "high",
            },
            {
                title: "Access Controls",
                content: `We limit access to your information through:
• Role-based access controls
• Principle of least privilege
• Regular access reviews and audits
• Employee background checks
• Mandatory security training
• Confidentiality agreements

Data access is:
• Logged and monitored
• Limited to authorized personnel
• Granted only for legitimate business purposes
• Regularly reviewed and updated
• Immediately revoked when no longer needed`,
                importance: "high",
            },
            {
                title: "Incident Response",
                content: `In case of a security incident, we:
• Have a comprehensive incident response plan
• Notify affected users within 72 hours
• Coordinate with law enforcement when necessary
• Provide regular updates on investigation progress
• Implement additional safeguards to prevent recurrence

Our incident response includes:
• Immediate containment and assessment
• Forensic investigation and analysis
• Notification to regulatory authorities
• Remediation and recovery procedures
• Post-incident review and improvements`,
                importance: "medium",
            },
        ],
    },
    "Cookies & Tracking": {
        title: "Cookies and Tracking Technologies",
        lastUpdated: "December 8, 2024",
        icon: Settings,
        summary:
            "We use cookies and similar technologies to improve your experience and analyze how our services are used.",
        sections: [
            {
                title: "Types of Cookies",
                content: `We use different types of cookies:

Essential Cookies:
• Required for basic website functionality
• Enable secure login and account access
• Remember your preferences and settings
• Cannot be disabled without affecting functionality

Analytics Cookies:
• Help us understand how you use our services
• Provide insights into user behavior and preferences
• Enable us to improve our website and services
• Generate anonymized usage statistics

Marketing Cookies:
• Deliver personalized advertisements
• Track effectiveness of marketing campaigns
• Enable social media integration
• Provide relevant content recommendations`,
                importance: "medium",
            },
            {
                title: "Third-Party Tracking",
                content: `We work with third-party services that may use tracking technologies:
• Google Analytics for website analytics
• Social media platforms for integration
• Advertising networks for targeted ads
• Customer support platforms for assistance

Third-party tracking is:
• Subject to their own privacy policies
• Used only with your consent where required
• Limited to necessary business purposes
• Regularly reviewed and audited`,
                importance: "medium",
            },
            {
                title: "Managing Cookies",
                content: `You can control cookies through:
• Browser settings and preferences
• Our cookie consent banner
• Account privacy settings
• Third-party opt-out tools

Cookie management options:
• Accept or reject non-essential cookies
• Delete existing cookies from your device
• Set browser to block future cookies
• Use private/incognito browsing mode
• Install cookie management extensions

Note: Disabling essential cookies may affect website functionality.`,
                importance: "low",
            },
        ],
    },
}

const complianceFeatures = [
    {
        icon: "🇪🇺",
        title: "GDPR Compliant",
        description: "Full compliance with European General Data Protection Regulation",
    },
    {
        icon: "🇺🇸",
        title: "CCPA Compliant",
        description: "Adheres to California Consumer Privacy Act requirements",
    },
    {
        icon: "🔒",
        title: "SOC 2 Type II",
        description: "Certified for security, availability, and confidentiality",
    },
    {
        icon: "🛡️",
        title: "ISO 27001",
        description: "International standard for information security management",
    },
    {
        icon: "🏥",
        title: "HIPAA Ready",
        description: "Healthcare data protection standards compliance",
    },
    {
        icon: "🌐",
        title: "Privacy Shield",
        description: "Framework for transatlantic data transfers",
    },
]

export default function PrivacyPolicyPage() {
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("Data Usage")
    const [expandedSections, setExpandedSections] = useState({ 0: true })

    const toggleSection = (sectionIndex) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionIndex]: !prev[sectionIndex],
        }))
    }

    const currentContent = privacyContent[selectedCategory]

    const getImportanceColor = (importance) => {
        switch (importance) {
            case "high":
                return "border-red-200 bg-red-50"
            case "medium":
                return "border-yellow-200 bg-yellow-50"
            case "low":
                return "border-green-200 bg-green-50"
            default:
                return "border-gray-200 bg-gray-50"
        }
    }

    const getImportanceIcon = (importance) => {
        switch (importance) {
            case "high":
                return <AlertTriangle size={16} className="text-red-500" />
            case "medium":
                return <Eye size={16} className="text-yellow-500" />
            case "low":
                return <CheckCircle size={16} className="text-green-500" />
            default:
                return <Shield size={16} className="text-gray-500" />
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <Header phone={phone} setIsChatOpen={setIsChatOpen} />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg border border-emerald-200/50">
                        <Lock size={18} className="animate-pulse" />
                        <span>🔐 Your Privacy is Our Priority • GDPR & CCPA Compliant</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
                        Privacy{" "}
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-500">
                                Policy
                            </span>
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-full"></div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
                        At{" "}
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                            Axon
                        </span>
                        , we're committed to protecting your privacy and being transparent about how we collect, use, and safeguard
                        your personal information.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Calendar size={18} className="text-purple-500" />
                            <span className="text-sm font-medium">Last updated: December 22, 2024</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Globe size={18} className="text-emerald-500" />
                            <span className="text-sm font-medium">Applies globally</span>
                        </div>
                    </div>
                </div>

                {/* Privacy Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-3xl p-6 shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                            <Database size={24} className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">What We Collect</h3>
                        <p className="text-gray-600 text-sm">Only information necessary to provide and improve our services</p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                            <Shield size={24} className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">How We Protect</h3>
                        <p className="text-gray-600 text-sm">Industry-leading security measures and encryption</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-3xl p-6 shadow-lg">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                            <UserCheck size={24} className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Your Rights</h3>
                        <p className="text-gray-600 text-sm">Full control over your data with easy access and deletion</p>
                    </div>
                </div>

                {/* Navigation Categories */}
                <div className="mb-12">
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Privacy Topics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {privacyCategories.map((category) => {
                                const IconComponent = category.icon
                                return (
                                    <button
                                        key={category.name}
                                        onClick={() => setSelectedCategory(category.name)}
                                        className={`group relative p-6 rounded-2xl font-semibold text-left transition-all duration-300 ${selectedCategory === category.name
                                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102"
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <IconComponent
                                                size={24}
                                                className={selectedCategory === category.name ? "text-white" : "text-purple-500"}
                                            />
                                            <span>{category.name}</span>
                                        </div>
                                        {selectedCategory === category.name && (
                                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-50 -z-10"></div>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Privacy Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20">
                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50">
                            {/* Header */}
                            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                    <currentContent.icon size={24} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold text-gray-900">{currentContent.title}</h2>
                                    <p className="text-gray-600">Last updated: {currentContent.lastUpdated}</p>
                                </div>
                                <button className="flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium hover:from-emerald-200 hover:to-teal-200 transition-all duration-300">
                                    <Download size={16} />
                                    <span>Download</span>
                                </button>
                            </div>

                            {/* Summary */}
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Summary</h3>
                                <p className="text-gray-700">{currentContent.summary}</p>
                            </div>

                            {/* Sections */}
                            <div className="space-y-6">
                                {currentContent.sections.map((section, index) => (
                                    <div key={index} className="group">
                                        <button
                                            onClick={() => toggleSection(index)}
                                            className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-300 group-hover:shadow-lg ${section.importance
                                                ? getImportanceColor(section.importance)
                                                : "bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50"
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                {section.importance && getImportanceIcon(section.importance)}
                                                <h3 className="text-xl font-bold text-gray-900 text-left">{section.title}</h3>
                                            </div>
                                            <div
                                                className={`transform transition-transform duration-300 ${expandedSections[index] ? "rotate-180" : ""
                                                    }`}
                                            >
                                                <Eye size={20} className="text-purple-500" />
                                            </div>
                                        </button>

                                        {expandedSections[index] && (
                                            <div className="mt-4 p-6 bg-white rounded-2xl shadow-inner border border-gray-100">
                                                <div className="prose prose-gray max-w-none">
                                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setIsChatOpen(true)}
                                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:via-pink-700 hover:to-red-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                                    >
                                        Contact Privacy Team
                                    </button>
                                    {/* <button className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105">
                                        Manage Privacy Settings
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Navigation Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            {/* Navigation */}
                            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Navigation</h3>
                                <div className="space-y-2">
                                    {currentContent.sections.map((section, index) => (
                                        <button
                                            key={index}
                                            onClick={() => toggleSection(index)}
                                            className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-300 flex items-center space-x-2 ${expandedSections[index]
                                                ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-semibold"
                                                : "text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            {section.importance && getImportanceIcon(section.importance)}
                                            <span>{section.title}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Privacy Tools */}
                            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Privacy Tools</h3>
                                <div className="space-y-3">
                                    <button className="w-full text-left p-3 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2">
                                        <Download size={16} className="text-blue-500" />
                                        <span>Download My Data</span>
                                    </button>
                                    <button className="w-full text-left p-3 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2">
                                        <Settings size={16} className="text-emerald-500" />
                                        <span>Privacy Settings</span>
                                    </button>
                                    <button className="w-full text-left p-3 rounded-xl text-sm text-gray-600 hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2">
                                        <Mail size={16} className="text-purple-500" />
                                        <span>Contact DPO</span>
                                    </button>
                                </div>
                            </div>

                            {/* Compliance Badges */}
                            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Compliance</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <CheckCircle size={16} className="text-emerald-500" />
                                        <span>GDPR Compliant</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Shield size={16} className="text-blue-500" />
                                        <span>CCPA Compliant</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Lock size={16} className="text-purple-500" />
                                        <span>SOC 2 Type II</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compliance Features Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                            Privacy{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                                Compliance
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We adhere to the highest privacy standards and regulations worldwide to ensure your data is always
                            protected.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {complianceFeatures.map((feature, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="relative overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
                        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 p-16 text-white text-center">
                        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Lock size={16} className="animate-pulse" />
                            <span>Privacy Questions?</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black mb-6">Need Help with Privacy?</h2>
                        <p className="text-white/90 mb-10 text-xl max-w-3xl mx-auto leading-relaxed">
                            Our Data Protection Officer and privacy team are here to help you understand your rights and manage your
                            privacy preferences.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                onClick={() => setIsChatOpen(true)}
                                className="group relative bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:scale-105"
                            >
                                <span className="relative z-10">Contact Privacy Team</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            </button>

                            <button className="group relative border-2 border-white/50 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-300 hover:scale-105">
                                <span className="relative z-10">Manage Privacy Settings</span>
                                <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>

                        <div className="mt-8 flex items-center justify-center space-x-6 text-white/80">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm">DPO available</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock size={16} />
                                <span className="text-sm">Response within 24 hours</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Chat Box */}
            <ChatBox isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} phone={phone} />

            {/* Footer */}
            <Footer phone={phone} />
        </div>
    )
}
