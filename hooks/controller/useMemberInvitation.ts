import useWorkspace from "@/hooks/data/useWorkspace";
import { useState } from "react";

const useMemberInvitation = () => {
    const { workspaceId } = useWorkspace();
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("viewer");
    const [isLoading, setIsLoading] = useState(false);

    const sendInvitation = async () => {
        if (!email) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/workspaces/${workspaceId}/members`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, role })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: (error as Error).message };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email,
        setEmail,
        role,
        setRole,
        isLoading,
        sendInvitation
    };
}

export default useMemberInvitation;