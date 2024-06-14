"use server";

import { client } from "../mongodbClient";
import { RegisterLoginType } from "../register-manga/route";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    //
    const userDetails: RegisterLoginType = await req.json();
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
      return Response.json(
        {
          status: "Does not exists",
          message: "Username does not exist",
        },
        { status: 404 }
      );
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
      return Response.json(
        { status: "Invalid", message: "Password is incorrect" },
        { status: 400 }
      );
    } else {
      return Response.json({ status: "success", userId: data._id.toString() });
    }
  } catch (err) {
    console.log(err);
    return Response.json(
      { status: "Fail", message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
