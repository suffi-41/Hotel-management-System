import { motion } from "framer-motion";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCreditCard,
  FaShieldAlt,
  FaWifi,
  FaBed,
  FaSwimmingPool,
} from "react-icons/fa";

const Footer = () => {
  const bookingLinks = [
    {
      title: "Booking",
      links: [
        "Special Offers",
        "Room Types",
        "Package Deals",
        "Group Bookings",
        "Last Minute Deals",
      ],
    },
    {
      title: "Support",
      links: [
        "FAQ",
        "Cancellation Policy",
        "Payment Options",
        "Travel Advisory",
        "Contact Support",
      ],
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Use",
        "Cookie Policy",
        "Accessibility",
        "Site Map",
      ],
    },
  ];

  const paymentMethods = ["visa", "mastercard", "amex", "paypal", "apple-pay"];

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-blue-900 to-gray-900 text-gray-200 pt-16 px-4 relative">
      {/* Facility Icons Animation */}
      <div className="absolute inset-0 opacity-10 flex justify-between px-8 py-4 pointer-events-none">
        {[FaBed, FaSwimmingPool, FaWifi, FaShieldAlt].map((Icon, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -45 }}
            animate={{
              scale: [0.8, 1, 0.8],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 15 + index * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Icon className="w-12 h-12" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
        >
          {/* Hotel Info */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-0">
            <motion.h3
              className="text-2xl font-bold text-white mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Horizon Bookings
            </motion.h3>
            <p className="mb-4">Your Gateway to Luxury Stays</p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mt-4">
              <motion.div
                className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <FaShieldAlt className="text-green-400" />
                <span className="text-sm">Secure Booking</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <FaCreditCard className="text-yellow-400" />
                <span className="text-sm">SSL Encryption</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Booking Links */}
          {bookingLinks.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-8 md:mb-0"
            >
              <motion.h4
                className="text-white font-semibold mb-4 text-lg"
                whileHover={{ x: 5 }}
              >
                {section.title}
              </motion.h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href="#"
                      className="hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                      <motion.span
                        className="inline-block w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact & Payment */}
          <motion.div variants={itemVariants}>
            <motion.h4
              className="text-white font-semibold mb-4 text-lg"
              whileHover={{ x: 5 }}
            >
              Contact & Payment
            </motion.h4>
            <div className="space-y-3">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <FaMapMarkerAlt className="text-blue-400" />
                <p>123 Luxury Avenue, Paradise City</p>
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <FaPhone className="text-blue-400" />
                <p>+1 (555) 123-4567</p>
              </motion.div>

              <motion.div
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <FaEnvelope className="text-blue-400" />
                <p>bookings@horizon.com</p>
              </motion.div>

              {/* Payment Methods */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {paymentMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 p-2 rounded-lg flex justify-center items-center"
                    whileHover={{ y: -3 }}
                  >
                    <img
                      src={`/payment-${method}.svg`}
                      alt={method}
                      className="h-6"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Live Assistance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-blue-800 pt-8 text-center"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping" />
                <FaPhone className="w-8 h-8 text-blue-400 relative" />
              </div>
              <div>
                <p className="text-lg font-semibold">24/7 Support</p>
                <p className="text-blue-300">+1 (800) 123-4567</p>
              </div>
            </motion.div>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(96, 165, 250, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold
                hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Live Chat Assistance
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💬
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-8 pt-8 border-t border-blue-800 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>
            © {new Date().getFullYear()} Horizon Bookings. All rights reserved.
          </p>
          <motion.p
            className="mt-2 text-sm"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Proudly serving travelers since 2010 🌍
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
