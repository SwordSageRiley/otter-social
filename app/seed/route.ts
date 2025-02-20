import postgres from "postgres";
import bcrypt from "bcrypt";
import { users, posts } from '@/app/lib/placeholder-data';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// async function seedUsers() {
//     console.log('start seed users');
//     const insertedUsers = await Promise.all(
//         users.map(async (user) => {
//             const hashedPassword = await bcrypt.hash(user.password, 10);
//             return sql`
//                 INSERT INTO users (user_id, username, pw, email, dob, bio, user_name, pfp_url)
//                 VALUES (${user.user_id}, ${user.username}, ${hashedPassword}, ${user.email}, ${user.dob}, ${user.bio}, ${user.user_name}, ${user.pfp_url})
//                 ON CONFLICT (user_id) DO NOTHING;
//                 `;
//         })
//     );
//     return insertedUsers;
// }

// async function seedPosts() {
//     console.log(posts.map(post => {
//         post.created
//     }));
//     const insertedPosts = await Promise.all(
//         posts.map(async (post) => {
//             return sql`
//                 INSERT INTO posts(body, user_id, posted) 
//                 VALUES (${post.body}, ${post.user_id}, ${post.created})
//             `;
//         })
//     );
//     return insertedPosts;
// }

export async function GET() {
    // try {
    //     const result = await sql.begin((sql) => [
    //     //   seedUsers(),
    //     //   seedPosts(),
    //     ]);
    
    //     return Response.json({ message: 'Database seeded successfully' });
    //   } catch (error) {
    //     return Response.json({ error }, { status: 500 });
    //   }

    return Response.json({message: 'Database already seeded'});
}

