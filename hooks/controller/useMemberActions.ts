import API_ROUTES from "@/constants/api.routes";
import Member from "@/types/model/Member";
import { useState } from "react";
import { mutate } from "swr";
import useWorkspace from "../data/useWorkspace";

const availableRoles = [
    { label: "Admin", value: "owner" },
    { label: "Editor", value: "editor" },
    { label: "Lector", value: "viewer" },
];

const useMemberActions = () => {
    const { workspace } = useWorkspace();
    const [isLoading, setIsLoading] = useState(false);

    const updateRole = async (memberId: string, role: Member["role"]) => {
        setIsLoading(true);
        try {
            const res = await fetch(API_ROUTES.WORKSPACES.MEMBERS(workspace.id), {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberId, role })
            });

            if (!res.ok) throw new Error("Failed to update role");
            await mutate(API_ROUTES.WORKSPACES.MEMBERS(workspace.id));
        } finally {
            setIsLoading(false);
        }
    };

    const removeMember = async (memberId: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(API_ROUTES.WORKSPACES.MEMBERS(workspace.id), {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ memberId })
            });

            if (!res.ok) throw new Error("Failed to delete member");
            await mutate(API_ROUTES.WORKSPACES.MEMBERS(workspace.id));
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, updateRole, removeMember, availableRoles };
};

export default useMemberActions;
