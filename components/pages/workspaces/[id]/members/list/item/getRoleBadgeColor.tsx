import { MemberRole } from "@/types/Member";

export const getRoleBadgeColor = (role: MemberRole) => {
    switch (role) {
        case "owner":
            return "bg-purple-100 text-purple-700";
        case "editor":
            return "bg-primary-100 text-primary-700";
        case "viewer":
            return "bg-secondary-100 text-secondary-700";
        default:
            return "bg-secondary-100 text-secondary-700";
    }
};
