

export default function NewPostPage() {


    return (
        <div>
            <form >
                <label htmlFor="body" className="m-2">
                </label>
                <input className="mb-4 text-black"
                    id="body" name="body" type="text" placeholder="Enter your post" required />
            </form>
        </div>
    );

}