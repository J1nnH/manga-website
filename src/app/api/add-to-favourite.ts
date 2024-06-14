"use server";

import { PushOperator } from "mongodb";
import { ObjectId } from "mongodb";
import { client } from "./mongodbClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addToFavourite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Getting mangaId and userId from request body
    const { mangaId, userId } = req.body;

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
      // Update the current user favourited manga's array
      await db.updateOne(
        { _id: o_userId },
        {
          $push: { favourites: mangaId } as PushOperator<Document>,
        }
      );

      // Return success message
      return res.status(200).json({
        status: "Success",
        message: "Successfully added to favourite",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "Fail", message: "Internal server error" });
  } finally {
    // Close the client
    await client.close();
  }
}
