interface PendingInvitation {
    id: string;
    workspaceId: string;
    email: string;
    role: string;
    invitedBy: string;
    createdAt: string;
}

export default PendingInvitation;