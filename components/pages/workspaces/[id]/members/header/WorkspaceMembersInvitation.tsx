"use client";
import Button from "@/components/ui/atoms/button/Button";
import Input from "@/components/ui/atoms/input/Input";
import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import Card, { CardBody, CardFooter, CardHeader } from "@/components/ui/molecules/card/Card";
import Select from "@/components/ui/molecules/select/Select";
import I18n from "@/context/language/common/I18nKeys";
import useI18N from "@/hooks/app/useI18N";
import useMemberActions from "@/hooks/controller/useMemberActions";
import useMemberInvitation from "@/hooks/controller/useMemberInvitation";
import { useState } from "react";

const WorkspaceMembersInvitation: React.FC = () => {
    const { t } = useI18N();
    const [isOpen, setIsOpen] = useState(false);
    const { availableRoles } = useMemberActions();
    const { email, setEmail, role, setRole, isLoading, sendInvitation } = useMemberInvitation();

    const handleInvite = async () => {
        const result = await sendInvitation();
        if (result?.success) {
            setEmail("");
            setIsOpen(false);
        }
    };

    return (
        <>
            <div className="inline-block">
                <button onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 text-primary-400 hover:text-primary-700 font-medium transition-colors">
                    {t(I18n.WORKSPACE.MEMBERS.INVITE)}
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                    <Card className="relative w-full max-w-md animate-in fade-in zoom-in duration-200">
                        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <CardHeader className="space-y-6">
                            <Title t={I18n.WORKSPACE.MEMBERS.INVITATION.TITLE} />
                            <Input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder={t(I18n.WORKSPACE.MEMBERS.INVITATION.EMAIL_PLACEHOLDER)}
                            />
                        </CardHeader>

                        <CardBody className="space-y-4">
                            <Text t={I18n.WORKSPACE.MEMBERS.INVITATION.ROLE_LABEL} />
                            <Select
                                name="invitation"
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                options={availableRoles}
                            />
                        </CardBody>

                        <CardFooter className="flex items-center justify-end gap-3">
                            <Button variant="ghost" onClick={() => setIsOpen(false)} t={I18n.WORKSPACE.MEMBERS.INVITATION.CANCEL} />
                            <Button onClick={handleInvite} disabled={isLoading || !email} t={isLoading ? I18n.WORKSPACE.MEMBERS.INVITATION.SUBMIT_LOADING : I18n.WORKSPACE.MEMBERS.INVITATION.SUBMIT} />
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
};

export default WorkspaceMembersInvitation;
