import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD}=process.env;

export const sql=neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
)
export const initDB=async ()=>{
    try {
        await sql`
          CREATE TABLE IF NOT EXISTS books(
            book_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            genre VARCHAR(255) NOT NULL,
            publication_year INTEGER NOT NULL CHECK(publication_year<= EXTRACT(YEAR FROM CURRENT_DATE)),
            price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
          )
        `;
        console.log("database initialised successfully");
    } catch (error) {
        console.log("Error initDB", error);
    }
}