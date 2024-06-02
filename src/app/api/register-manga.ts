"use server";

import { client } from "./mongodbClient";
import { z } from "zod";
import bcrypt from "bcrypt";

// Register schema from zod
const RegisterLoginDetails = z.object({
  username: z.string().trim().min(1, { message: "Username is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

// Export this type for frontend to use
export type RegiserLoginType = z.infer<typeof RegisterLoginDetails>;

export async function registerManga(userDetails: RegiserLoginType) {
  // Parse the register details entered by user
  const result = RegisterLoginDetails.safeParse(userDetails);

  // Some conditions are not fulfilled
  if (!result.success) {
    return { status: "Required", message: "Username or password is empty" };
  }

  try {
    // Wait for connection
    await client.connect();

    // Select 'users' database
    const db = client.db("MangaWebsite").collection("users");

    // Query to get the user with the current username
    const existed = await db.findOne({ username: userDetails.username });

    // Username already existed
    if (existed) {
      return { status: "Existed", message: "Username is already existed " };
    }

    // Hash the current password
    const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    // Insert into db
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
