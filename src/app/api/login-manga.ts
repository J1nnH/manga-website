"use server";

import { client } from "./mongodbClient";
import { RegiserLoginType } from "./register-manga";
import bcrypt from "bcrypt";

export async function loginManga(userDetails: RegiserLoginType) {
  try {
    // Wait for connection
    await client.connect();

    // Select 'users' database
    const db = client.db("MangaWebsite").collection("users");

    // Query to find user that has the same username
    const data = await db.findOne({
      username: userDetails.username,
    });

    // User does not exists
    if (!data) {
      return {
        status: "Does not exists",
        message: "Username does not exist",
      };
    }

    // Compared the password entered by the user with the db
    const passwordMatches = await bcrypt.compare(
      userDetails.password,
      data?.password
    );

    // Password does not match
    if (!passwordMatches) {
      return { status: "Invalid", message: "Password is incorrect" };
    } else {
      // Password match
      return { status: "success", userId: data._id.toString() };
    }
  } catch (err) {
    console.log(err);
    return { status: "Fail", message: "Internal server error" };
  } finally {
    await client.close();
    await client.close();
  }
}
