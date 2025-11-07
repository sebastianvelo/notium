import PendingInvitation from "@/types/model/PendingInvitation";

interface IPendingInvitationRepository {
    findByEmail(email: string): Promise<PendingInvitation[]>;
    findByWorkspace(workspaceId: string): Promise<PendingInvitation[]>;
    create(data: Omit<PendingInvitation, "id" | "createdAt">): Promise<PendingInvitation>;
    delete(id: string): Promise<boolean>;
}
export default IPendingInvitationRepository;