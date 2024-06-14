"use client";

import Image from "next/image";
import { useCookies } from "react-cookie";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useFavourites } from "./useFavouritesHook";

export default function LoveBtn({ mangaId }: { mangaId: string }) {
  // Retrieve cookie of userId
  const [cookie, setCookie, removeCookie] = useCookies(["userId"]);

  // Store all the favourites of an user
  const [favourites, setFavourites] = useFavourites<string[]>([]);

  // Check if current manga is favourited by user
  const isFavourited = favourites.find((item) => item === mangaId);

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
          body: JSON.stringify({ userId: cookie.userId, mangaId: mangaId }),
        });

        const data = await res.json();

        // The function executed successfully
        if (data.status === "Success") {
          // Add the current manga id to favourites
          setFavourites((prev: string[]) => [...prev, mangaId]);
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
          body: JSON.stringify({ userId: cookie.userId, mangaId }),
        });

        const data = await res.json();

        // The function executed successfully
        if (data.status === "Success") {
          // Remove the current manga id to favourites
          setFavourites((prev: string[]) => {
            const newFav = prev.filter((item) => {
              return item !== mangaId;
            });

            return newFav;
          });
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
        src={isFavourited ? "/heart-filled.png" : "/heart-unfilled.png"}
        width={7}
        height={7}
        alt="heart icon"
        className="w-full object-fit"
      />
    </button>
  );
}
