'use server';

import postgres from "postgres";
import { createPool } from '@vercel/postgres';

const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});

import { postType, profileType } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL! );
//{ ssl: require }

export async function discoverFeed() {
    try {
        const postdata = await sql<postType[]>`
         SELECT posts.body, posts.post_id, posts.posted, users.user_id, users.username, users.pfp_url
         FROM posts
         JOIN users ON posts.user_id = users.user_id
         ORDER BY posts.posted DESC
         LIMIT 15`;

        // const postdata = await sql2<postType[]>`
        // SELECT posts.body, posts.post_id, posts.posted, users.user_id, users.username, users.pfp_url
        // FROM posts
        // JOIN users ON posts.user_id = users.user_id
        // ORDER BY posts.posted DESC
        // LIMIT 15`;

        return postdata;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch post data.');
    }
}

export async function ProfileData(username: string) {
    try {
        const profData = await sql<profileType[]>`
        SELECT users.user_id, users.username, users.bio, users.pfp_url
        FROM users WHERE users.username = ${username}`;

        return profData;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch profile data.');
    }
}

export async function UserPosts(username: string) {
    try {
        const userposts = await sql<postType[]>`
        SELECT users.username, users.pfp_url, users.user_id, posts.body, posts.post_id, posts.posted
        FROM users
        JOIN posts ON users.user_id = posts.user_id
        WHERE users.username = ${username}
        ORDER BY posts.posted DESC
        LIMIT 15`;

        return userposts;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch profile posts.');
    }
}

export async function PostNewPost(user_id: string, body: string){
    try {
        await sql`
        INSERT INTO posts (user_id, body)
        VALUES (${user_id}, ${body})`;
        return true;
    } catch (error) {
        console.log(error);
        throw new Error ('Failed to insert post');
    }
}