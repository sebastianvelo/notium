import User from "@/types/User";
import usersJson from "./mock/users.json";

const UsersDB: User[] = usersJson.map((u) => ({
    ...u,
}));

export default UsersDB;
