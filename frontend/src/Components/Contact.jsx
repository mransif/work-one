import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Mail, Clock, ExternalLink, MessageSquare, Linkedin, Facebook, Twitter, Instagram } from "lucide-react";

const Contact = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    const contactItems = [
        {
            icon: <MapPin size={24} className="text-[#37474F]" />,
            title: "Our Location",
            content: "Musaliar College Of Engineering And Technology, Musaliar College PO, Pathanamthitta - 689653"
        },
        {
            icon: <Phone size={24} className="text-[#37474F]" />,
            title: "Call Us",
            content: "+91 0468 2 301 703",
            action: <a href="tel:+914682301703" className="text-[#37474F] hover:text-black font-medium flex items-center mt-1"></a>
        },
        // {
        //     icon: <Mail size={24} className="text-[#37474F]" />,
        //     title: "Email Us",
        //     content: "info@mcet.edu.in",
        //     action: <a href="mailto:info@mcet.edu.in" className="text-[#37474F] hover:text-black font-medium flex items-center mt-1"><ExternalLink size={14} className="mr-1" /> Send Email</a>
        // },
        {
            icon: <MessageSquare size={24} className="text-[#37474F]" />,
            title: "Get In Touch",
            content: "",
            action: <div className="flex space-x-3 mt-2">
                {[
                    { icon: <Facebook size={16} />, url: "https://www.facebook.com/musaliarEngineeringcollege/", label: "Facebook" },
                    { icon: <Instagram size={16} />, url: "https://www.instagram.com/musaliarcollegeofengineering/", label: "Instagram" }
                ].map((social, i) => (
                    <a
                        key={i}
                        href={social.url}
                        aria-label={social.label}
                        className="bg-orange-100 hover:bg-orange-200 transition-colors p-2 rounded-full text-[#37474F]"
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className="flex flex-col justify-between items-center min-h-screen bg-cover bg-fixed bg-center p-4 relative"
            style={{ backgroundImage: "url(/images/mcet.webp)" }}>

            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto pt-20 pb-8 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Connect With Us</h1>
                    <p className="text-orange-200 text-lg max-w-2xl mx-auto">We're here to assist you every step of the way. Reach out to us through any of the channels below.</p>
                    <div className="h-1 w-32 bg-[#ffedd6] mx-auto mt-6"></div>
                </motion.div>

                <div className="w-full flex flex-col lg:flex-row gap-8 mb-16">
                    {/* Contact Info Card */}
                    <motion.div
                        ref={ref}
                        className="bg-white rounded-lg shadow-xl p-8 w-full mx-auto max-w-3xl overflow-hidden"
                        initial={{ opacity: 0, y: -50 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b border-orange-200 pb-4">
                            Contact Information
                        </h2>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            className="space-y-6"
                        >
                            {contactItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-start space-x-4"
                                    whileHover={{ scale: 1.02, x: 5 }}
                                >
                                    <div className="p-3 bg-orange-100 rounded-full flex-shrink-0">{item.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                                        <p className="text-gray-600">{item.content}</p>
                                        {item.action && item.action}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* Highlighted Features Section (Replacing Map) */}
                <motion.div
                    className="w-full bg-white bg-opacity-90 rounded-lg shadow-xl overflow-hidden mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className="p-6 bg-gradient-to-r from-[#ffedd6] to-[#fff7ed]">
                        <h2 className="text-2xl font-bold text-[#37474F] mb-2">Why Connect With Us?</h2>
                        <p className="text-gray-500">Experience the difference with our dedicated support team</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Quick Response",
                                    description: "We respond to all inquiries within 24 hours on business days",
                                    icon: <Clock size={32} className="text-[#37474F]" />
                                },
                                {
                                    title: "Expert Support",
                                    description: "Get assistance from our team of experienced educators and staff",
                                    icon: <MessageSquare size={32} className="text-[#37474F]" />
                                },
                                {
                                    title: "Personalized Guidance",
                                    description: "Receive tailored advice for your specific educational needs",
                                    icon: <Mail size={32} className="text-[#37474F]" />
                                }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-orange-50 transition-colors"
                                    whileHover={{ y: -5 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 + (index * 0.2) }}
                                >
                                    <div className="mb-4 p-3 bg-orange-100 rounded-full">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <footer className="relative z-10 w-full bg-gradient-to-r from-[#ffedd6] to-[#fff7ed] text-[#37474F] p-8 mt-auto">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">Musaliar College of Engineering and Technology</h3>
                        <p className="text-sm mt-4">&copy; {new Date().getFullYear()} All Rights Reserved</p>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-sm mb-2 text-gray-600">Website Created by:</p>
                        <p className="font-semibold text-lg">Ansif Muhammed N N & Sreehari S</p>
                        <p className="text-sm mt-1">ansifpta2003@gmail.com | sreehari200411@gmail.com</p>
                        <div className="flex justify-center md:justify-end space-x-4 mt-4">
                            {[
                                { icon: <Linkedin size={20} />, label: "LinkedIn" },
                                { icon: <Facebook size={20} />, label: "Facebook" },
                                { icon: <Twitter size={20} />, label: "Twitter" },
                                { icon: <Instagram size={20} />, label: "Instagram" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    aria-label={social.label}
                                    className="bg-[#ffedd6] hover:bg-[#FFD6A7] transition-colors p-2 rounded-full"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Contact;