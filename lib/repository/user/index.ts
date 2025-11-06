import IUserRepository from "./interface";
import UserRepositoryMemory from "./providers/memory";
import UserRepositorySupabase from "./providers/supabase";

const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === "true";

const UserRepository: IUserRepository = USE_SUPABASE
    ? UserRepositorySupabase
    : UserRepositoryMemory;

export default UserRepository;