"use client"
import Brand from "@/components/ui/app/Brand";
import Text from "@/components/ui/atoms/text/Text";
import useI18N from "@/hooks/app/useI18N";
import contacts from "./contacts";

const Footer: React.FC = () => {
    const { t } = useI18N();

    return (
        <footer className="bg-gradient-to-l from-secondary-200 via-white to-secondary-200 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 border-b border-secondary-300 dark:border-secondary-800 backdrop-blur-lg sticky bottom-0 border-t shadow-lg py-4">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 justify-between w-full">
                        <Brand size={"sm"} />
                        <div className="flex space-x-6 items-center">
                            {contacts.map(({ id, name, url, Icon }) => (
                                <Text key={id}>
                                    <a href={url}>
                                        <Icon />
                                    </a>
                                </Text>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;