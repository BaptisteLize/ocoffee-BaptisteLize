import "dotenv/config";
import pg from "pg";

const db = new pg.Client(process.env.PG_URL);

await db.connect();

export default db;