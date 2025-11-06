import INoteRepository from "./interface";
import NoteRepositoryMemory from "./providers/memory";
import NoteRepositorySupabase from "./providers/supabase";

const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === "true";

const NoteRepository: INoteRepository = USE_SUPABASE
    ? NoteRepositorySupabase
    : NoteRepositoryMemory;

export default NoteRepository;