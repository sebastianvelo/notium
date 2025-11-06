"use client";
import Button from "@/components/ui/atoms/button/Button";
import Input from "@/components/ui/atoms/input/Input";
import Textarea from "@/components/ui/atoms/textarea/Textarea";
import Title from "@/components/ui/atoms/title/Title";
import Card, { CardBody, CardHeader } from "@/components/ui/molecules/card/Card";
import I18n from "@/context/language/common/I18nKeys";
import useI18N from "@/hooks/app/useI18N";
import useNewWorkspaceForm from "@/hooks/controller/useNewWorkspaceForm";

const NewWorkspaceLayoutForm: React.FC = () => {
    const { t } = useI18N();
    const { name, description, isSubmitting, setName, setDescription, handleSubmit, handleCancel } = useNewWorkspaceForm();

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
                        <Button type="button" variant="secondary" onClick={handleCancel}>
                            {t(I18n.WORKSPACE_NEW.FORM.CANCEL)}
                        </Button>
                        <Button type="submit" disabled={!name || isSubmitting}>
                            {t(isSubmitting ? I18n.WORKSPACE_NEW.FORM.SUBMIT_LOADING : I18n.WORKSPACE_NEW.FORM.SUBMIT)}
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};

export default NewWorkspaceLayoutForm;