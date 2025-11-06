import IWorkspaceRepository from "./interface";
import WorkspaceRepositoryMemory from "./providers/memory";
import WorkspaceRepositorySupabase from "./providers/supabase";

const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === "true";

const WorkspaceRepository: IWorkspaceRepository = USE_SUPABASE
    ? WorkspaceRepositorySupabase
    : WorkspaceRepositoryMemory;

export default WorkspaceRepository;