"use server";

import { ObjectId } from "mongodb";
import { client } from "./mongodbClient";

export async function getFavourite(userId: string) {
  try {
    await client.connect();

    const db = client.db("MangaWebsite").collection("users");

    const o_userId = new ObjectId(userId);

    const user = await db.findOne({ _id: o_userId });

    if (!user) {
      return { status: "Error", message: "User does not exists" };
    } else {
      const data = await db.findOne(
        { _id: o_userId },
        { projection: { favourites: 1, _id: 0 } }
      );

      return { status: "Success", message: data?.favourites };
    }
  } catch (error) {
    console.log(error);
    return { status: "Error", message: "Internal server error" };
  } finally {
    await client.close();
  }
}
