import { motion } from 'framer-motion';
import { FaWifi, FaSwimmingPool, FaDumbbell, FaParking, FaUtensils, FaSpa, FaConciergeBell, FaCocktail, FaBusinessTime, FaTv, FaBicycle } from 'react-icons/fa';

const facilities = [
  { name: 'Free Wi-Fi', description: 'High-speed internet access available throughout the hotel.', icon: <FaWifi className="text-blue-500 text-4xl" /> },
  { name: 'Swimming Pool', description: 'Outdoor and indoor pools available for relaxation.', icon: <FaSwimmingPool className="text-cyan-500 text-4xl" /> },
  { name: 'Gym', description: 'State-of-the-art fitness center with modern equipment.', icon: <FaDumbbell className="text-gray-700 text-4xl" /> },
  { name: 'Parking', description: 'Secure and spacious parking area for guests.', icon: <FaParking className="text-yellow-500 text-4xl" /> },
  { name: 'Restaurant', description: 'Multi-cuisine dining with exquisite flavors.', icon: <FaUtensils className="text-red-500 text-4xl" /> },
  { name: 'Spa', description: 'Relaxing spa treatments and massages.', icon: <FaSpa className="text-purple-500 text-4xl" /> },
  { name: '24/7 Concierge', description: 'Round-the-clock assistance for your needs.', icon: <FaConciergeBell className="text-green-500 text-4xl" /> },
  { name: 'Bar & Lounge', description: 'Premium drinks and cocktails in a cozy atmosphere.', icon: <FaCocktail className="text-pink-500 text-4xl" /> },
  { name: 'Business Center', description: 'Fully equipped meeting rooms and office facilities.', icon: <FaBusinessTime className="text-indigo-500 text-4xl" /> },
  { name: 'Smart TVs', description: 'Entertainment with a variety of streaming services.', icon: <FaTv className="text-orange-500 text-4xl" /> },
  { name: 'Bicycle Rental', description: 'Explore the city with our bike rental service.', icon: <FaBicycle className="text-green-400 text-4xl" /> },
];

export default function Facilities() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-8">Hotel Facilities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {facilities.map((facility, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-4 hover:shadow-xl transition"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {facility.icon}
            <p className="text-lg font-semibold">{facility.name}</p>
            <p className="text-sm text-gray-600 text-center">{facility.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
