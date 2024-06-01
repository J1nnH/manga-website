"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useToast } from "@/components/ui/use-toast";

export default function LoginRegister() {
  const [cookie, _, removeCookie] = useCookies(["userId"]);

  const router = useRouter();

  const { toast } = useToast();

  const userIsLoggedIn = cookie.userId;

  const handleLogout = () => {
    removeCookie("userId");

    router.replace("/");

    toast({
      title: "Successful",
      description: "Logged out successfully",
    });
  };

  return userIsLoggedIn ? (
    <button
      className="hover:text-gray-400 transition-colors duration-300 uppercase"
      onClick={handleLogout}
    >
      logout
    </button>
  ) : (
    <Link
      href="/login-manga"
      className="hover:text-gray-400 transition-colors duration-300"
    >
      login
    </Link>
  );
}
