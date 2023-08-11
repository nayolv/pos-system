import { baseUrl } from "./base"

export const login = async() => {
    const res = await fetch(`${baseUrl}users`);
    const users = await res.json();
    return users;
}