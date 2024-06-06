"use client";

import Image from "next/image";
import { useCookies } from "react-cookie";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { addToFavourite } from "../api/add-to-favourite";
import { useFavourites } from "./useFavouritesHook";
import { removeFromFavourites } from "../api/remove-from-favourite";

export default function LoveBtn({ mangaId }: { mangaId: string }) {
  // Retrieve cookie of userId
  const [cookie, setCookie, removeCookie] = useCookies(["userId"]);

  // Store all the favourites of an user
  const [favourites, setFavourites] = useFavourites<string[]>(
    cookie.userId ?? "",
    []
  );

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
        // Call server action to add the current manga to favourite
        const res = await addToFavourite(cookie.userId, mangaId);

        // The function executed successfully
        if (res?.status === "Success") {
          // Add the current manga id to favourites
          setFavourites((prev: string[]) => [...prev, mangaId]);
        }
        // Display the message that is returned back
        toast({
          title: res?.status,
          description: res?.message,
        });
      } else {
        // The current manga is favourited by user
        // Call server action to remove it
        const res = await removeFromFavourites(cookie.userId, mangaId);

        // The function executed successfully
        if (res?.status === "Success") {
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
          title: res?.status,
          description: res?.message,
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
