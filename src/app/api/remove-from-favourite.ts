"use server";

import { client } from "./mongodbClient";
import { PullOperator } from "mongodb";
import { ObjectId } from "mongodb";

export async function removeFromFavourites(userId: string, mangaId: string) {
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
      // Remove the current mangaId from the user favourited manga's array
      await db.updateOne(
        { _id: o_userId },
        {
          $pull: { favourites: mangaId } as PullOperator<Document>,
        }
      );

      // Return success message
      return {
        status: "Success",
        message: "Successfully removed from favourite",
      };
    }
  } catch (error) {
    console.log(error);
    return { status: "Fail", message: "Internal server error" };
  } finally {
    // Close the client
    await client.close();
  }
}
