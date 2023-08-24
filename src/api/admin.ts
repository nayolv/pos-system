import { baseUrl } from "./base";

export const getUsers = async () => {
    const res = await fetch(`${baseUrl}users`);
    const users = await res.json();
    return users;
}