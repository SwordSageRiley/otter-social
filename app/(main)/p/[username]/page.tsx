import { ProfileData, UserPosts } from "@/app/lib/data";
import { profileType } from "@/app/lib/definitions";
import Post from "@/app/ui/feedpost";
// import Image from "next/image";

export default async function Profile(props: { params: Promise<{ username: string }> }) {
    const params = await props.params;

    const profdata = await ProfileData(params.username);
    const profile: profileType = profdata[0]; 

    const userposts = await UserPosts(params.username);

    return (
        <div>
            <div className="flex">
                <div className="h-16 w-16 rounded-full bg-gray-300 mr-2"></div>
                <h1 className="my-auto">{profile.username}</h1>
            </div>
            <p>{profile.bio}</p>

            <div className="mt-8">
                {userposts.map(post => {
                    return <Post postData={post} key={post.post_id}/>
                })}
            </div>
        </div>
    )
}