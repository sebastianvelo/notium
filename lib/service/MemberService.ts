import toMemberView from "@/lib/mapper/toMemberView";
import MemberRepository from "@/lib/repository/member";
import Member, { MemberRole } from "@/types/model/Member";
import MemberItemView from "@/types/view/MemberItemView";
import InviteMemberDTO from "../dto/InviteMemberDTO";
import PendingInvitationRepository from "../repository/pending-invitation";
import UserRepository from "../repository/user";
import UserService from "./UserService";

const MemberService = {
    getMembersByWorkspace(workspaceId: string): Promise<Member[]> {
        return MemberRepository.findByWorkspace(workspaceId);
    },

    getMembersByUser(userId: string): Promise<Member[]> {
        return MemberRepository.findByUser(userId);
    },

    getMember(userId: string, workspaceId: string): Promise<Member | null> {
        return MemberRepository.findByUserInWorkspace(userId, workspaceId);
    },

    async addMember(data: Omit<Member, "id" | "joinedAt">): Promise<Member> {
        const existing = await MemberRepository.findByUserInWorkspace(
            data.userId,
            data.workspaceId
        );
        if (existing) throw new Error("User is already a member of this workspace");
        return MemberRepository.create({
            ...data,
            joinedAt: new Date().toISOString(),
        });
    },

    async updateMemberRole(id: string, role: Member["role"]): Promise<Member | null> {
        return MemberRepository.update(id, { role });
    },

    async removeMember(id: string): Promise<boolean> {
        return MemberRepository.delete(id);
    },

    async getMembersViewsByWorkspace(workspaceId: string, loggedInUserId: string): Promise<MemberItemView[]> {
        const members = await this.getMembersByWorkspace(workspaceId);

        const users = await Promise.all(
            members.map((m) => UserService.getUserById(m.userId))
        );

        return members
            .map((member, index) => {
                const user = users[index];
                if (!user) return null;
                return toMemberView(member, user, loggedInUserId);
            })
            .filter(Boolean) as MemberItemView[];
    },

    async inviteMember(data: InviteMemberDTO) {
        console.log("🔍 Buscando usuario con email:", data.email);

        // 1. Verificar si el usuario ya existe
        const existingUser = await UserRepository.findByEmail(data.email);

        if (existingUser) {
            console.log("✅ Usuario existe, agregando como member directo");

            // Verificar si ya es miembro
            const existingMember = await MemberRepository.findByUserInWorkspace(
                existingUser.id,
                data.workspaceId
            );

            if (existingMember) {
                throw new Error("Este usuario ya es miembro del workspace");
            }

            return await MemberRepository.create({
                userId: existingUser.id,
                workspaceId: data.workspaceId,
                role: data.role as MemberRole,
                joinedAt: Date.now().toLocaleString()
            });
        } else {
            console.log("⏳ Usuario no existe, creando invitación pendiente");

            // Crear invitación pendiente
            return await PendingInvitationRepository.create({
                workspaceId: data.workspaceId,
                email: data.email,
                role: data.role,
                invitedBy: data.invitedBy,
            });
        }
    },
    async processPendingInvitations(userId: string, email: string) {
        const pendingInvites = await PendingInvitationRepository.findByEmail(email);

        for (const invite of pendingInvites) {
            await MemberRepository.create({
                userId: userId,
                workspaceId: invite.workspaceId,
                role: invite.role as MemberRole,
                joinedAt: Date.now().toLocaleString()
            });
            await PendingInvitationRepository.delete(invite.id);
        }

        console.log(`✅ Procesadas ${pendingInvites.length} invitaciones pendientes`);
    }
};

export default MemberService;