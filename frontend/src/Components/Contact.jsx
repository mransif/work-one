import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Contact = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <div className="flex flex-col justify-between items-center min-h-screen bg-cover p-4" style={{ backgroundImage: "url(/images/mcet.jpg)" }}>
            <motion.div
                ref={ref}
                className="bg-orange-100 mt-15 shadow-md rounded-lg p-10 w-full max-w-2xl text-center flex flex-col justify-center h-96"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h2
                    className="text-3xl font-bold text-gray-800 mb-6"
                    initial={{ scale: 0.8 }}
                    animate={inView ? { scale: 1 } : { scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                >
                    Contact Us
                </motion.h2>
                <motion.p className="text-lg font-semibold" whileHover={{ scale: 1.1 }}>
                    Musaliar College of Engineering and Technology
                </motion.p>
                <motion.p className="text-lg" whileHover={{ scale: 1.05 }}>Address: Musaliar College Of Engineering And Technology, Musaliar College PO, Pathanamthitta - 689653</motion.p>
                <motion.p className="text-lg" whileHover={{ scale: 1.05 }}>Phone: 0468 2 301 703</motion.p>
            </motion.div>

            <footer className="w-full bg-orange-100 text-black text-center p-4 mt-auto relative h-auto flex flex-col items-center justify-center z-1 space-y-2 sm:p-6 sm:h-32">
                <p className="text-sm sm:text-lg">&copy; {new Date().getFullYear()} Musaliar College of Engineering and Technology. All Rights Reserved.</p>
                <div className="mt-2 text-xs sm:text-md">
                    <p>Website Created by:</p>
                    <p className="font-semibold">[Creator 1 Name] & [Creator 2 Name]</p>
                    <p className="text-xs sm:text-sm">For inquiries: creator1@example.com | creator2@example.com</p>
                </div>
            </footer>
        </div>
    );
};

export default Contact;
