
import Link from "next/link";

export default function PostButton() {

    return (
        <div className="fixed p-4 bottom-0 right-1/4">
            <Link href='/newpost'>
                <div className="h-16 w-16 rounded-full bg-blue-500">
                    <p className="">+</p>
                </div>
            </Link>
        </div>
    );
}