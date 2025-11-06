// /hooks/useMemberActions.ts
import { useState } from "react";
import API_ROUTES from "@/constants/api.routes";
import { mutate } from "swr";
import Member from "@/types/model/Member";

const useMemberActions = (workspaceId: string) => {
    const [isLoading, setIsLoading] = useState(false);

    const updateRole = async (memberId: string, role: Member["role"]) => {
        setIsLoading(true);
        try {
            const res = await fetch(API_ROUTES.WORKSPACES.MEMBERS(workspaceId), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberId, role })
            });

            if (!res.ok) throw new Error("Failed to update role");
            await mutate(API_ROUTES.WORKSPACES.MEMBERS(workspaceId));
        } finally {
            setIsLoading(false);
        }
    };

    const removeMember = async (memberId: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(API_ROUTES.WORKSPACES.MEMBERS(workspaceId), {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberId })
            });

            if (!res.ok) throw new Error("Failed to delete member");
            await mutate(API_ROUTES.WORKSPACES.MEMBERS(workspaceId));
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, updateRole, removeMember };
};

export default useMemberActions;
