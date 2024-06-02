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
  const [cookie, setCookie, removeCookie] = useCookies(["userId"]);

  const [favourites, setFavourites] = useFavourites<string[]>(
    cookie.userId ?? "",
    []
  );
  const isFavourited = favourites.find((item) => item === mangaId);

  const { toast } = useToast();

  const router = useRouter();

  const handleLogInNow = () => {
    router.push("/login-manga");
  };

  const handleAddOrRemoveFavourite = async () => {
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
      if (!isFavourited) {
        const res = await addToFavourite(cookie.userId, mangaId);

        if (res?.status === "Success") {
          setFavourites((prev: string[]) => [...prev, mangaId]);
        }
        toast({
          title: res?.status,
          description: res?.message,
        });
      } else {
        const res = await removeFromFavourites(cookie.userId, mangaId);
        if (res?.status === "Success") {
          setFavourites((prev: string[]) => {
            const newFav = prev.filter((item) => {
              return item !== mangaId;
            });

            return newFav;
          });
        }
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
        src={isFavourited ? "/heart-filled.png" : "/heart-unfilled.png"}
        width={7}
        height={7}
        alt="heart icon"
        className="w-full object-fit"
      />
    </button>
  );
}
