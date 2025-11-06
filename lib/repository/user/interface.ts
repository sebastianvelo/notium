import User from "@/types/model/User";

interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: Omit<User, "id">): Promise<User>;
    update(id: string, data: Partial<Omit<User, "id">>): Promise<User | null>;
    upsertFromAuth(authUser: any): Promise<User>;
}

export default IUserRepository;