"use client";

import { useStore } from "@/lib/store";
import { APP_NAME } from "@/utils/constants";
import { Globe, Trophy } from "lucide-react";

const Header = () => {
  const { user } = useStore();

  return (
    <>
      <div className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex items-center justify-center bg-indigo-600 rounded-full shadow-md">
            <Globe className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            {APP_NAME}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
                <Trophy className="text-yellow-500" size={20} />
                <div className="text-lg text-indigo-600 font-semibold">
                  {user?.score || 0}
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full">
                  <p className="text-sm font-semibold uppercase">
                    {user?.username?.[0]}
                  </p>
                </div>
                <p className="text-md font-medium text-gray-800">
                  {user?.username}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
