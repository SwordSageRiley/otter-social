

import Link from "next/link";

export default function Settings(){
    return (
        <div className="flex flex-col">
            <form>
                <select>
                    <option value="public">Anyone Can See</option>
                    <option value="private">Registered Users Only</option>
                    <option value="hidden">Followers Only</option>
                </select>
            </form>
        </div>
    );
}