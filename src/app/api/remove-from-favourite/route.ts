"use server";

import { client } from "../mongodbClient";
import { PullOperator } from "mongodb";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

export async function PUT(req: Request) {
  try {
    // Extract userId and mangaId from requst body
    const { userId, mangaId, tag } = await req.json();

    // Revalidate cached favourite
    revalidateTag(tag);

    // Wait for connection userId: string, mangaId: string
    await client.connect();

    // Select 'users' database
    const db = client.db("MangaWebsite").collection("users");

    // Convert the current userId to the userId type that mongodb supports
    const o_userId = new ObjectId(userId);

    // Query to get the user with the current userId
    const user = await db.findOne({ _id: o_userId });

    // User does not exists
    if (!user) {
      return Response.json(
        { status: "Error", message: "User does not exists" },
        { status: 400 }
      );
    } else {
      // Remove the current mangaId from the user favourited manga's array
      await db.updateOne(
        { _id: o_userId },
        {
          $pull: { favourites: mangaId } as PullOperator<Document>,
        }
      );

      // Return success message
      return Response.json({
        status: "Success",
        message: "Successfully removed from favourite",
      });
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      { status: "Fail", message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    // Close the client
    await client.close();
  }
}
