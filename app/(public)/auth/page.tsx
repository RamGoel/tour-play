"use client";

import { API, parseAxiosMessage } from "@/lib/axios";
import { useStore } from "@/lib/store";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username!");
      return;
    }

    try {
      const response = await API.post("/auth", {
        username,
      });
      useStore.setState({ user: response.data });
      router.push("/game");
    } catch (err) {
      // login if already exists
      if ((err as AxiosError)?.response?.status === 400) {
        router.push("/game");
      } else {
        toast.error(parseAxiosMessage(err));
        console.log(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-200 to-indigo-300 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-md rounded-xl p-8 max-w-md w-full shadow-lg"
      >
        <h1 className="text-3xl font-bold text-indigo-800 text-center mb-6">
          Welcome, Traveler! ✈️
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Pick a username to start your Globetrotter adventure!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., GlobeTrotter123"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-500"
              >
                {error}
              </motion.p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition duration-200 flex items-center justify-center gap-2"
          >
            Start Exploring
            <span>🌍</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
