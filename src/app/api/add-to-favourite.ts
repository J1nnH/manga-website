"use server";

import { PushOperator } from "mongodb";
import { ObjectId } from "mongodb";
import { client } from "./mongodbClient";

export async function addToFavourite(userId: string, mangaId: string) {
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
          $push: { favourites: mangaId } as PushOperator<Document>,
        }
      );

      return { status: "Success", message: "Successfully added to favourite" };
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
