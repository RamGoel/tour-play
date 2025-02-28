import { destinationArray } from "@/lib/data";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <div
      className={`min-h-screen bg-white flex flex-col justify-center items-center text-gray-800`}
    >
      <header className="text-center py-8">
        <Image
          src={"/media/logo.png"}
          className="mx-auto"
          width={200}
          height={200}
          alt="logo"
        />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Globetrotter Challenge
        </h1>
        <p className="mt-3 text-lg md:text-xl font-normal text-gray-600 max-w-2xl mx-auto">
          Test your travel knowledge with clever clues, uncover fascinating
          facts, and compete with friends in a global adventure.
        </p>
      </header>

      <Link href="/game" className="">
        <section className="bg-blue-600 flex items-center group hover:scale-90 transition-all duration-200 justify-center w-[300px] h-[250px] rounded-xl p-6 md:p-8 max-w-lg text-center shadow-sm border border-gray-200">
          <div className="text-white flex flex-col gap-1 group-hover:scale-[1.2] group-hover:gap-2 transition-all duration-200">
            <PlayCircle
              size={100}
              strokeWidth={1}
              className="group-hover:rotate-12 transition-all"
            />
            <h1 className="text-2xl">Play Now!</h1>
          </div>
        </section>
      </Link>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-4">
          <p className="text-3xl font-bold text-gray-900">
            {destinationArray.length}+
          </p>
          <p className="mt-1 text-gray-600">Destinations</p>
        </div>
        <div className="p-4">
          <p className="text-3xl font-bold text-gray-900">Countless</p>
          <p className="mt-1 text-gray-600">Clues</p>
        </div>
        <div className="p-4">
          <p className="text-3xl font-bold text-gray-900">Engaging</p>
          <p className="mt-1 text-gray-600">Gameplay</p>
        </div>
      </section>

      <footer className="mt-16 text-sm text-gray-500">
        <p>Built by RamGoel | Powered by Next.js & Grok</p>
      </footer>
    </div>
  );
}
