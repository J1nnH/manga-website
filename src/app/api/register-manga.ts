"use server";

import { MongoClient } from "mongodb";
import { z } from "zod";
import bcrypt from "bcrypt";

const RegisterLoginDetails = z.object({
  username: z.string().trim().min(1, { message: "Username is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type RegiserLoginType = z.infer<typeof RegisterLoginDetails>;

export async function registerManga(userDetails: RegiserLoginType) {
  const client = new MongoClient(process.env.MONGO_DB_URL as string);

  const result = RegisterLoginDetails.safeParse(userDetails);

  if (!result.success) {
    return { status: "Required", message: "Username or password is empty" };
  }

  try {
    await client.connect();

    const db = client.db("MangaWebsite").collection("users");

    const existed = await db.findOne({ username: userDetails.username });

    if (existed) {
      return { status: "Existed", message: "Username is already existed " };
    }

    const hashedPassword = await bcrypt.hash(userDetails.password, 10);

    await db.insertOne({
      username: userDetails.username,
      password: hashedPassword,
    });

    return { status: "success" };
  } catch (error) {
    return { status: "Fail", message: "Internal server error" };
  } finally {
    await client.close();
  }
}
