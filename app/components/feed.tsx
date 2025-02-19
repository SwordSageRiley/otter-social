import Post from "./feedpost";

export default function Feed(){
    return (
        <div className="flex flex-col">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}