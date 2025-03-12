import Link from "next/link";
import Image from "next/image";

export default function Post(postData: any) {
    const post = postData.postData;
    return (
        <div className="p-3 border-t border-solid border-black" id={post.post_id}>
            <div className="flex" >
                <div className="h-8 w-8 rounded-full bg-gray-300 mr-2"></div>
                <Link href={`/p/${post.username}`} className="hover:underline">{post.username}</Link>
            </div>
            <p>{post.body}</p>
        </div>
    );
}