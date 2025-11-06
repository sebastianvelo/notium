import UserRepository from "@/lib/repository/user";
import User from "@/types/model/User";

const UserService = {
    getAllUsers(): Promise<User[]> {
        return UserRepository.findAll();
    },

    getUserById(id: string): Promise<User | null> {
        return UserRepository.findById(id);
    },

    getUserByEmail(email: string): Promise<User | null> {
        return UserRepository.findByEmail(email);
    },

    async registerUser(data: Omit<User, "id">): Promise<User | null> {
        const existingUser = await UserRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already registered");
        }

        return UserRepository.create(data);
    },

    async updateUser(id: string, data: Partial<Omit<User, "id">>): Promise<User | null> {
        // Si se está actualizando el email, verificar que no exista
        if (data.email) {
            const existingUser = await UserRepository.findByEmail(data.email);
            if (existingUser && existingUser.id !== id) {
                throw new Error("Email already in use");
            }
        }

        return UserRepository.update(id, data);
    },
};

export default UserService;
