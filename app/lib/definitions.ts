

export type postType = {
    body: string,
    post_id: string,
    posted: string,
    user_id: string,
    username: string,
    pfp_url: string,
};

export type profileType = {
    user_id: string,
    username: string,
    bio: string,
    pfp_url: string
}

export type UserWithPass = {
    user_id: string,
    username: string,
    pw: string,
    email: string
}

export type User = {
    user_id: string,
    username: string,
    email: string
}

export type Post = {
    user_id: string,
    body: string
}