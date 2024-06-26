"use server";

import { client } from "../mongodbClient";
import { z } from "zod";
import bcrypt from "bcrypt";

// Ensure username, and password are string, trimmed of whitespace, and not empty
const RegisterLoginDetails = z.object({
  username: z.string().trim().min(1, { message: "Username is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

// Defines a type "RegiserLoginType" based on "RegisterLoginDetails" and EXPORT it for frontend to use
export type RegisterLoginType = z.infer<typeof RegisterLoginDetails>;

// EXPORT the function userDetails: RegiserLoginType
export async function POST(req: Request) {
  // Validate the userDetails against RegisterLoginDetails, if fails, error message is returned
  const userDetails = await req.json();
  const result = RegisterLoginDetails.safeParse(userDetails);
  if (!result.success) {
    return Response.json(
      {
        status: "Required",
        message: "Username or password is empty",
      },
      { status: 400 }
    );
  }

  try {
    // Establish connection to the MongoDB server
    await client.connect();

    // Accessing the Database and Collection
    const db = client.db("MangaWebsite").collection("users");

    // Check if a user with same username already exists
    const existed = await db.findOne({ username: userDetails.username });
    if (existed) {
      return Response.json(
        { status: "Existed", message: "Username is already existed " },
        { status: 409 }
      );
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
    return Response.json({
      status: "success",
      message: "User is successfully created",
    });
  } catch (error) {
    return Response.json(
      { status: "Fail", message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    // Close the client
    await client.close();
  }
}
