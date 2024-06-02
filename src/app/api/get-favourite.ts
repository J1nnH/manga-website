"use server";

import { ObjectId } from "mongodb";
import { client } from "./mongodbClient";

export async function getFavourite(userId: string) {
  try {
    // Wait for connection
    await client.connect();

    // Select 'users' database
    const db = client.db("MangaWebsite").collection("users");

    // Convert the current userId to the userId type that mongodb supports
    const o_userId = new ObjectId(userId);

    // Query to get the user with the current userId
    const user = await db.findOne({ _id: o_userId });

    // User does not exists
    if (!user) {
      return { status: "Error", message: "User does not exists" };
    } else {
      // Query to get the user favourited manga's array
      const data = await db.findOne(
        { _id: o_userId },
        { projection: { favourites: 1, _id: 0 } }
      );

      // Return success message
      return { status: "Success", message: data?.favourites };
    }
  } catch (error) {
    console.log(error);
    return { status: "Error", message: "Internal server error" };
  } finally {
    // Close the client
    await client.close();
  }
}
