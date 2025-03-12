
import Link from "next/link";

export default function PostButton() {

    return (
        <div className="fixed p-4 bottom-0 right-1/4">
            <Link href='/newpost'>
                <div className="rounded-full bg-blue-500 p-3 pr-4 text-sm">
                    + New Post
                </div>
            </Link>
        </div>
    );
}