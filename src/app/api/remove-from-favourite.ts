"use server";

import { client } from "./mongodbClient";
import { PullOperator } from "mongodb";
import { ObjectId } from "mongodb";

export async function removeFromFavourites(userId: string, mangaId: string) {
  try {
    await client.connect();

    const db = client.db("MangaWebsite").collection("users");

    const o_userId = new ObjectId(userId);

    const user = await db.findOne({ _id: o_userId });

    if (!user) {
      return { status: "Error", message: "User does not exists" };
    } else {
      const data = await db.updateOne(
        { _id: o_userId },
        {
          $pull: { favourites: mangaId } as PullOperator<Document>,
        }
      );

      return {
        status: "Success",
        message: "Successfully removed from favourite",
      };
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
