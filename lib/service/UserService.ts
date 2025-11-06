import UserRepository from "@/lib/repository/user/providers/memory";
import User from "@/types/User";

const UserService = {
    getAllUsers(): User[] {
        return UserRepository.findAll();
    },

    getUserById(id: string): User | undefined {
        return UserRepository.findById(id);
    },

    getUserByEmail(email: string): User | undefined {
        return UserRepository.findByEmail(email);
    },

    registerUser(data: Omit<User, "id">): User {
        // Verificar si el email ya existe
        const existingUser = UserRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already registered");
        }

        return UserRepository.create(data);
    },

    updateUser(id: string, data: Partial<Omit<User, "id">>): User | undefined {
        // Si se está actualizando el email, verificar que no exista
        if (data.email) {
            const existingUser = UserRepository.findByEmail(data.email);
            if (existingUser && existingUser.id !== id) {
                throw new Error("Email already in use");
            }
        }

        return UserRepository.update(id, data);
    },
};

export default UserService;
