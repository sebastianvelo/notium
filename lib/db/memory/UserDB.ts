import User from "@/types/model/User";
import usersJson from "./mock/users.json";

const UsersDB: User[] = usersJson.map((u) => ({
    ...u,
}));

export default UsersDB;
