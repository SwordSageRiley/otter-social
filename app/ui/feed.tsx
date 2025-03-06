
import Post from "./feedpost";
import { discoverFeed } from "@/app/lib/data";

export default async function Feed(){

    const posts = await discoverFeed();
    return (
            <div className="flex flex-col">
            {posts.map(post => {
                return <Post postData={post} id={post.post_id}/>
            })}
        </div>
    );
}