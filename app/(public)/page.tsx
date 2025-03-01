"use client";

import { motion } from "framer-motion";
import {
  Brain,
  ChevronRight,
  Compass,
  Gamepad,
  Github,
  Globe,
  Map,
  MapPin,
  Play,
  Trophy,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Sample destinations data (in production, this would come from your API)
const sampleDestinations = [
  { name: "Eiffel Tower", city: "Paris", country: "France" },
  { name: "Colosseum", city: "Rome", country: "Italy" },
  { name: "Taj Mahal", city: "Agra", country: "India" },
  { name: "Machu Picchu", city: "Cusco", country: "Peru" },
];

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsLoaded(true);

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-indigo-500" />,
      title: "Cryptic Clues",
      description:
        "Test your knowledge with cleverly crafted clues about famous landmarks and destinations.",
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-500" />,
      title: "Global Destinations",
      description:
        "Explore hundreds of fascinating places from around the world, from famous landmarks to hidden gems.",
    },
    {
      icon: <Trophy className="h-8 w-8 text-indigo-500" />,
      title: "Unlock Facts & Trivia",
      description:
        "With each correct guess, unlock interesting facts and surprising trivia about each destination.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      {/* Header/Navbar */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -20, opacity: 0 }}
              animate={isLoaded ? { rotate: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <Globe className="h-8 w-8 text-indigo-600" />
            </motion.div>
            <motion.h1
              className="text-2xl font-bold text-gray-800"
              initial={{ x: -20, opacity: 0 }}
              animate={isLoaded ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Globetrotter
            </motion.h1>
          </div>

          <motion.div
            className="hidden md:flex items-center gap-6"
            initial={{ y: -20, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#features"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#destinations"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Destinations
            </a>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={isLoaded ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/auth">
              <motion.button
                className="px-5 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="w-full md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Explore the world through{" "}
              <span className="text-indigo-600">clues and trivia</span>
            </h2>

            <p className="text-xl text-gray-600">
              Test your travel knowledge with cryptic clues, uncover fascinating
              facts, and explore destinations around the globe. How many can you
              guess?
            </p>

            <div className="flex gap-4 pt-4">
              <Link href="/game">
                <motion.button
                  className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg flex items-center gap-2 hover:bg-indigo-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-5 w-5" />
                  Play Now
                </motion.button>
              </Link>

              <Link href="#how-it-works">
                <motion.button
                  className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center gap-2 hover:bg-indigo-50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </Link>
            </div>

            <div className="flex items-center gap-4 text-gray-500 pt-6">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                  />
                ))}
              </div>
              <p>Join 10,000+ explorers worldwide</p>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 relative h-[400px]"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <div className="absolute inset-0 bg-indigo-600 rounded-3xl transform rotate-3"></div>
            <div className="absolute inset-0 bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="relative h-full w-full">
                {/* This would be replaced with actual game interface preview */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20"></div>
                <div className="p-8 relative h-full flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <Compass className="h-6 w-6 text-indigo-600" />
                      <span className="text-gray-800 font-semibold">
                        Destination #42
                      </span>
                    </div>
                    <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      Difficulty: Medium
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-lg space-y-4 flex-grow">
                    <h3 className="text-xl text-black font-bold">
                      Can you guess this location?
                    </h3>
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        <span className="font-medium">Clue #1:</span> I stand
                        tall in a city of love, built for a world exhibition.
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Clue #2:</span> My iron
                        lattice design was initially criticized by leading
                        artists of the time.
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Clue #3:</span> At night,
                        I sparkle with thousands of lights, creating a dazzling
                        show.
                      </p>
                    </div>

                    <div className="pt-4">
                      <Link href={"/game"}>
                        <motion.div
                          className="w-full bg-gray-100 rounded-lg p-3 flex items-center relative overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                        >
                          <button className="bg-indigo-600 flex items-center gap-2 justify-center h-[50px] w-full rounded-lg px-4 py-2 text-white">
                            Start Playing <Gamepad size={30} strokeWidth={1} />
                          </button>
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-12 py-16 md:py-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why You&apos;ll Love Globetrotter
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our game combines geography, history, and culture in a challenging
            yet fun experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-8 ${index === activeFeature ? "ring-2 ring-indigo-500" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works Section */}
      <section
        id="how-it-works"
        className="bg-indigo-50 py-16 px-4 md:px-12 md:py-24"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How Globetrotter Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple yet engaging gameplay that keeps you coming back for more
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Read the Clues",
                description:
                  "You'll receive a series of cryptic clues about a famous place or landmark.",
                icon: <Map className="h-8 w-8 text-white" />,
                color: "from-blue-500 to-indigo-600",
              },
              {
                title: "Make Your Guess",
                description:
                  "Use your knowledge and deduction skills to figure out the destination.",
                icon: <Brain className="h-8 w-8 text-white" />,
                color: "from-indigo-500 to-purple-600",
              },
              {
                title: "Unlock Facts & Trivia",
                description:
                  "Correct guesses unlock fascinating facts, trivia, and visuals about the location.",
                icon: <Trophy className="h-8 w-8 text-white" />,
                color: "from-purple-500 to-pink-600",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`w-20 relative h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {step.icon}
                  <div className="absolute -right-2 -top-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-indigo-600 font-bold shadow">
                    {index + 1}
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link href="/game">
              <motion.button
                className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg flex items-center gap-2 hover:bg-indigo-700 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-5 w-5" />
                Start Playing Now
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section
        id="destinations"
        className="container mx-auto px-4 md:px-12 py-16 md:py-24"
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore a small sample of the hundreds of fascinating places
            you&apos;ll discover
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleDestinations.map((destination, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="h-48 bg-indigo-100 relative flex items-center justify-center">
                <MapPin className="h-12 w-12 text-indigo-400 opacity-50" />
                {/* In a real implementation, you would use actual destination images */}
                <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {destination.country}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {destination.name}
                </h3>
                <p className="text-gray-500 mb-4">
                  {destination.city}, {destination.country}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="text-yellow-500 flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-indigo-600 font-medium">Medium</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            And hundreds more destinations to discover!
          </p>
          <Link href="/destinations">
            <motion.button
              className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Destinations
            </motion.button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center text-white max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of players exploring the world through engaging
              clues and fascinating facts.
            </p>
            <Link href="/game">
              <motion.button
                className="px-8 py-3 bg-white text-indigo-600 rounded-full shadow-lg font-medium hover:bg-gray-100 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Playing Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-indigo-400" />
                <h3 className="text-xl font-bold">Globetrotter</h3>
              </div>
              <p className="text-gray-400">
                Test your travel knowledge with clever clues and discover
                fascinating facts about destinations worldwide.
              </p>
              <div className="flex gap-4">
                <Github className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#destinations"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Destinations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to receive updates and new destination alerts
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 rounded-l-lg px-4 py-2 outline-none flex-grow"
                />
                <button className="bg-indigo-600 rounded-r-lg px-4 py-2 text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© 2025 Globetrotter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
