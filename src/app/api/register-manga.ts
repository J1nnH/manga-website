"use server";

import { client } from "./mongodbClient";
import { z } from "zod";
import bcrypt from "bcrypt";

// Ensure username, and password are string, trimmed of whitespace, and not empty 
const RegisterLoginDetails = z.object({
  username: z.string().trim().min(1, { message: "Username is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

// Defines a type "RegiserLoginType" based on "RegisterLoginDetails" and EXPORT it for frontend to use
export type RegiserLoginType = z.infer<typeof RegisterLoginDetails>;

// EXPORT the function
export async function registerManga(userDetails: RegiserLoginType) {
  
  // Validate the userDetails against RegisterLoginDetails, if fails, error message is returned
  const result = RegisterLoginDetails.safeParse(userDetails);
  if (!result.success) {
    return { status: "Required", message: "Username or password is empty" };
  }

  try {
    // Establish connection to the MongoDB server
    await client.connect();

    // Accessing the Database and Collection
    const db = client.db("MangaWebsite").collection("users");

    // Check if a user with same username already exists
    const existed = await db.findOne({ username: userDetails.username });
    if (existed) {
      return { status: "Existed", message: "Username is already existed " };
    }

    // Hashes the user's password for secure storage
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    // Inserting new user's details into the database
    await db.insertOne({
      username: userDetails.username,
      password: hashedPassword,
      favourites: [],
    });

    // Return success message
    return { status: "success", message: "User is successfully created" };

  } catch (error) {
    return { status: "Fail", message: "Internal server error" };
  } finally {
    // Close the client
    await client.close();
  }
}
