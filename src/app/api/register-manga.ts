import { LoginRegisterDetail } from "../login-manga/page";
import { MongoClient } from "mongodb";

export async function registerManga({
  userDetails,
}: {
  userDetails: LoginRegisterDetail;
}) {
  const client = new MongoClient(process.env.MONGO_DB_URL as string);

  try {
    await client.connect();

    const db = client.db("MangaWebsite").collection("users");

    const data = await db.insertOne({
      username: userDetails.username,
      password: userDetails.password,
    });
  } catch (error) {
  } finally {
    await client.close();
  }
}
