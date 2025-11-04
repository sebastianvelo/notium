"use client";
import Button from "@/components/ui/atoms/button/Button";
import Input from "@/components/ui/atoms/Input";
import Textarea from "@/components/ui/atoms/Textarea";
import Card, { CardBody, CardHeader } from "@/components/ui/molecules/card/Card";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewWorkspacePage: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: Call API to create workspace
        // await createWorkspace({ name, description });

        // Simulate API call
        setTimeout(() => {
            router.push("/workspaces");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-secondary-900">Create New Workspace</h1>
                    <p className="text-secondary-600 mt-1">Set up a new workspace for your team</p>
                </div>

                <Card>
                    <CardHeader>
                        <h2 className="text-xl font-semibold text-secondary-900">Workspace Details</h2>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Workspace Name"
                                placeholder="e.g., Marketing Team, Personal Notes"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <Textarea
                                label="Description (Optional)"
                                placeholder="What is this workspace for?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                            />

                            <div className="flex justify-end space-x-3">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => router.back()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!name || isSubmitting}
                                >
                                    {isSubmitting ? "Creating..." : "Create Workspace"}
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default NewWorkspacePage;