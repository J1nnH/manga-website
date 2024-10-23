"use client";

import Image from "next/image";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useFavourites } from "./useFavouritesHook";

export default function LoveBtn({ mangaId }: { mangaId: string }) {
  // Retrieve cookie of userId
  const [cookie, _, __] = useCookies(["userId"]);

  // Store all the favourites of an user
  const { favourites, favouriteLoading } = useFavourites();

  // State to store either if the current manga is under favourite
  const [isFavourited, setIsFavourited] = useState(() =>  {
      if(!favouriteLoading && favourites) {
        return favourites.find((item) => item === mangaId) ? true : false;
      }

      return false;
  })
  
  const { toast } = useToast();

  const router = useRouter();

  const handleLogInNow = () => {
    // Redirect user to login page
    router.push("/login-manga");
  };

  const handleAddOrRemoveFavourite = async () => {
    // User is not logged in
    if (!cookie.userId) {
      toast({
        title: "Error",
        description: "You must be logged in to add this to favourite",
        action: (
          <ToastAction altText="Log in now" onClick={handleLogInNow}>
            Log in now
          </ToastAction>
        ),
      });
    } else {
      // The current manga is not favourited by user
      if (!isFavourited) {
        // Send the userId and mangaId to the add to favourite api route
        const res = await fetch("/api/add-to-favourite", {
          method: "PUT",
          body: JSON.stringify({ userId: cookie.userId, mangaId: mangaId, tag: "favourite"}),
        });

        const data = await res.json();

        // Set current manga to favourited if fetch successful
        if(data.status === "Success") {
            setIsFavourited(true)
        }

        // Display the message that is returned back
        toast({
          title: data.status,
          description: data.message,
        });

      } else {
        // The current manga is favourited by user
        // Send the userId and mangaId to the remove from favourite api route
        const res = await fetch("/api/remove-from-favourite", {
          method: "PUT",
          body: JSON.stringify({ userId: cookie.userId, mangaId: mangaId, tag: "favourite" }),
        });

        const data = await res.json();

        // Set current manga to not favourited if fetch successful
        if(data.status === "Success") {
            setIsFavourited(false)
        }

        // Display the message that is returned back
        toast({
          title: data.status,
          description: data.message,
        });
      }
    }
  };

  return (
    <button title="fav btn" onClick={handleAddOrRemoveFavourite}>
      <Image
        // If the current manga is favourited by user, display red heart else white heart
        src={isFavourited ? "/heart_filled.svg" : "/heart_unfilled.svg"}
        width={7}
        height={7}
        alt="heart icon"
        className="w-full object-fit"
      />
    </button>
  );
}
