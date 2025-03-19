'use server';

import postgres from "postgres";
import { createPool } from '@vercel/postgres';
import { Settings } from "@/app/lib/definitions";

const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});

const sql = postgres(process.env.POSTGRES_URL! );

export async function baseSettings(user_id: string){
    try {
        const sett = await sql<Settings[]>`
        SELECT *
        FROM settings
        WHERE settings.user_id = ${user_id}`;

        return sett;
    } catch (error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch settings data.');
    }
}

export async function sendLightMode(user_id: string, light_mode: string){
    
}