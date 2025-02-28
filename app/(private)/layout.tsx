"use client";
import Confetti from "@/components/Confetti";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import SadFaceAnimation from "@/components/SadFace";
import { API } from "@/lib/axios";
import { useStore } from "@/lib/store";
import { redirect, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { toast } from "react-hot-toast";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const { setUser, user } = useStore();
  const router = useRouter();

  useEffect(() => {
    API.get("/auth")
      .then((res) => setUser(res.data))
      .catch(() => {
        toast.error("Please login first");
        return redirect("/auth");
      });
  }, [setUser, router]);

  if (!user) {
    return (
      <div className="flex flex-col h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {children}
      <Confetti />
      <SadFaceAnimation />
    </div>
  );
};

export default PrivateLayout;
