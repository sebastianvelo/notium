import User from "@/types/User";
import UsersDB from "../db/memory/UserDB";

const UserRepository = {
    findAll(): User[] {
        return UsersDB;
    },

    findById(id: string): User | undefined {
        return UsersDB.find((u) => u.id === id);
    },

    findByEmail(email: string): User | undefined {
        return UsersDB.find((u) => u.email === email);
    },

    create(data: Omit<User, "id">): User {
        const newUser: User = {
            id: `usr_${UsersDB.length + 1}`,
            ...data,
        };
        UsersDB.push(newUser);
        return newUser;
    },

    update(id: string, data: Partial<Omit<User, "id">>): User | undefined {
        const index = UsersDB.findIndex((u) => u.id === id);
        if (index === -1) return undefined;

        UsersDB[index] = { ...UsersDB[index], ...data };
        return UsersDB[index];
    },
};

export default UserRepository;
