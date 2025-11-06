import API_ROUTES from "@/constants/api.routes";
import ROUTES from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { mutate } from "swr";

interface UseNewWorkspaceFormReturn {
    name: string;
    description: string;
    isSubmitting: boolean;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleCancel: () => void;
}

const useNewWorkspaceForm = (): UseNewWorkspaceFormReturn => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(API_ROUTES.WORKSPACES.ROOT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description })
            });
            if (!res.ok) throw new Error("Failed");
            const workspace = await res.json();
            mutate(API_ROUTES.WORKSPACES.ROOT);
            router.push(ROUTES.WORKSPACE(workspace.id));
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return {
        name,
        description,
        isSubmitting,
        setName,
        setDescription,
        handleSubmit,
        handleCancel
    };
};

export default useNewWorkspaceForm;