import IMemberRepository from "./interface";
import MemberRepositoryMemory from "./providers/memory";
import MemberRepositorySupabase from "./providers/supabase";

const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === "true";

const MemberRepository: IMemberRepository = USE_SUPABASE
    ? MemberRepositorySupabase
    : MemberRepositoryMemory;

export default MemberRepository;