"use client";
import Button from "@/components/ui/atoms/button/Button";
import Input from "@/components/ui/atoms/input/Input";
import Textarea from "@/components/ui/atoms/textarea/Textarea";
import Title from "@/components/ui/atoms/title/Title";
import Card, { CardBody, CardHeader } from "@/components/ui/molecules/card/Card";
import I18n from "@/context/language/common/I18nKeys";
import useI18N from "@/hooks/app/useI18N";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewWorkspaceLayoutForm: React.FC = () => {
    const router = useRouter();
    const { t } = useI18N();
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
        <Card>
            <CardHeader>
                <Title size="xs" t={I18n.WORKSPACE_NEW.FORM.TITLE} />
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label={t(I18n.WORKSPACE_NEW.FORM.NAME_LABEL)}
                        placeholder={t(I18n.WORKSPACE_NEW.FORM.NAME_PLACEHOLDER)}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <Textarea
                        label={t(I18n.WORKSPACE_NEW.FORM.DESCRIPTION_LABEL)}
                        placeholder={t(I18n.WORKSPACE_NEW.FORM.DESCRIPTION_PLACEHOLDER)}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                    />

                    <div className="flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={() => router.back()}>
                            {t(I18n.WORKSPACE_NEW.FORM.CANCEL)}
                        </Button>
                        <Button type="submit" disabled={!name || isSubmitting}>
                            {isSubmitting ? t(I18n.WORKSPACE_NEW.FORM.SUBMIT_LOADING) : t(I18n.WORKSPACE_NEW.FORM.SUBMIT)}
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}

export default NewWorkspaceLayoutForm;