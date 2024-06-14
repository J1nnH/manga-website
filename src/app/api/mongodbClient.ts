// Avoid multiple MongoClient being created

import { MongoClient } from "mongodb";

export const client = new MongoClient(process.env.MONGO_DB_URL as string);
