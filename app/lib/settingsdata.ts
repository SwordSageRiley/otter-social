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

export async function getPrivacy(user_id: string){
    try {
        const privacy = await sql`
        SELECT privacy FROM settings
        WHERE settings.user_id = ${user_id}`;

        return privacy[0].privacy
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch settings data.');
    }
}

export async function setPrivacy(user_id: string, privacy: string){
    try {
        await sql`
        UPDATE settings
        SET privacy = ${privacy}
        WHERE user_id = ${user_id}`;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to post settings data.');
    }
}
