import UsersDB from "@/lib/db/memory/UserDB";
import IUserRepository from "@/lib/repository/user/interface";
import User from "@/types/User";

class UserRepositoryMemory implements IUserRepository {
    async findAll(): Promise<User[]> {
        return UsersDB;
    }

    async findById(id: string): Promise<User | null> {
        return UsersDB.find((u) => u.id === id) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        return UsersDB.find((u) => u.email === email) || null;
    }

    async create(data: Omit<User, "id">): Promise<User> {
        const newUser: User = {
            id: `usr_${UsersDB.length + 1}`,
            ...data,
        };
        UsersDB.push(newUser);
        return newUser;
    }

    async update(id: string, data: Partial<Omit<User, "id">>): Promise<User | null> {
        const index = UsersDB.findIndex((u) => u.id === id);
        if (index === -1) return null;

        UsersDB[index] = { ...UsersDB[index], ...data };
        return UsersDB[index];
    }

    async upsertFromAuth(authUser: any): Promise<User> {
        const existing = await this.findById(authUser.id);

        const userData = {
            email: authUser.email!,
            name: authUser.user_metadata?.full_name || authUser.email!.split('@')[0],
            avatar: authUser.user_metadata?.avatar_url,
        };

        if (existing) {
            return (await this.update(authUser.id, userData))!;
        } else {
            const newUser: User = {
                id: authUser.id,
                ...userData,
            };
            UsersDB.push(newUser);
            return newUser;
        }
    }
}

export default new UserRepositoryMemory();