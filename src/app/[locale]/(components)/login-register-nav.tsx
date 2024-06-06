"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useToast } from "@/components/ui/use-toast";

export default function LoginRegister() {
  // Retrieve the cookie of userId
  const [cookie, _, removeCookie] = useCookies(["userId"]);

  const router = useRouter();

  // For modal
  const { toast } = useToast();

  // If cookie.userId is null, it means user is not logged in or vice versa
  const userIsLoggedIn = cookie.userId;

  const handleLogout = () => {
    // Remove the cookie of userId
    removeCookie("userId");

    // Redirect user to home page
    router.replace("/");

    // Show a successfull modal
    toast({
      title: "Successful",
      description: "Logged out successfully",
    });
  };

  // If user is logged in display 'logout' or vice versa
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
