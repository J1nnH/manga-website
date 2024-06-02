"use server";

import { client } from "./mongodbClient";
import { RegiserLoginType } from "./register-manga";
import bcrypt from "bcrypt";

export async function loginManga(userDetails: RegiserLoginType) {
  try {
    await client.connect();

    const db = client.db("MangaWebsite").collection("users");

    const data = await db.findOne({
      username: userDetails.username,
    });

    if (!data) {
      return {
        status: "Does not exists",
        message: "Username does not exist",
      };
    }

    const passwordMatches = await bcrypt.compare(
      userDetails.password,
      data?.password
    );

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
