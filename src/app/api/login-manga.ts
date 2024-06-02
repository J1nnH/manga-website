"use server";

import { client } from "./mongodbClient";
import { RegiserLoginType } from "./register-manga";
import bcrypt from "bcrypt";



export async function loginManga(userDetails: RegiserLoginType) {
  try {
    // Establishes a connection to the MongoDB server.
    await client.connect();

    // Selects the users collection in the MangaWebsite database.
    const db = client.db("MangaWebsite").collection("users");

    // Looks for a user document with the provided username.
    const data = await db.findOne({
      username: userDetails.username,
    });


    // If no user is found, the function returns a status indicating that the username does not exist.
    if (!data) {
      return {
        status: "Does not exists",
        message: "Username does not exist",
      };
    }


    // Uses bcrypt to compare the provided password with the hashed password stored in the database.
    const passwordMatches = await bcrypt.compare(
      userDetails.password,
      data?.password
    );

    /*
      If the passwords do not match, it returns a status indicating that the password is incorrect.
      
      If the passwords match, it returns a success status along with the user's ID.
    */
    if (!passwordMatches) {
      return { status: "Invalid", message: "Password is incorrect" };
    } else {
      return { status: "success", userId: data._id.toString() };
    }
  } catch (err) {
    console.log(err);
    return { status: "Fail", message: "Internal server error" };
  } finally {
    await client.close();
  }
}
