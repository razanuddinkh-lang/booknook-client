import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing from client/.env.local");

const globalForMongo = globalThis as typeof globalThis & {
  bookNookMongoClient?: MongoClient;
};

export const mongoClient = globalForMongo.bookNookMongoClient ?? new MongoClient(uri);
if (process.env.NODE_ENV !== "production") {
  globalForMongo.bookNookMongoClient = mongoClient;
}

export const authDb = mongoClient.db(process.env.MONGODB_DB || "booknook");
