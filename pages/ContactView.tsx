
import React from 'react';
import { PhoneIcon, EnvelopeIcon, FacebookIcon, XIcon, TelegramIcon, WhatsAppIcon, InstagramIcon } from '../components/icons/Icons';

const ContactView: React.FC = () => {
    const SocialLink: React.FC<{href: string; icon: React.ReactNode; ariaLabel: string;}> = ({href, icon, ariaLabel}) => (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={ariaLabel}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
        >
            {icon}
        </a>
    );

    return (
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-primary-dark dark:text-primary-light opacity-0 animate-fade-in-up">Get in Touch</h1>
                <p className="mt-2 text-secondary dark:text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    Have questions or feedback? We'd love to hear from you. Reach out to us through any of the channels below.
                </p>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg overflow-hidden p-8">
                {/* Contact Info Section */}
                <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h2 className="text-2xl font-bold mb-6 text-primary-dark dark:text-primary-light text-center">Contact Information</h2>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                        <div className="flex items-center">
                            <PhoneIcon className="h-6 w-6 mr-3 text-primary-DEFAULT"/>
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="text-secondary dark:text-gray-400">(123) 456-7890</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <EnvelopeIcon className="h-6 w-6 mr-3 text-primary-DEFAULT"/>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-secondary dark:text-gray-400">contact@clinicsys.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <hr className="my-8 border-gray-200 dark:border-gray-700" />

                {/* Social Media Section */}
                <div className="opacity-0 animate-fade-in-up flex flex-col items-center" style={{ animationDelay: '400ms' }}>
                    <h2 className="text-2xl font-bold text-primary-dark dark:text-primary-light mb-6">Follow Us</h2>
                    <div className="flex justify-center items-center gap-6">
                        <SocialLink href="https://facebook.com" ariaLabel="Facebook" icon={<FacebookIcon className="h-8 w-8 text-blue-600"/>} />
                        <SocialLink href="https://x.com" ariaLabel="X (Twitter)" icon={<XIcon className="h-8 w-8 text-text-light dark:text-text-dark"/>} />
                        <SocialLink href="https://telegram.org" ariaLabel="Telegram" icon={<TelegramIcon className="h-8 w-8 text-sky-500"/>} />
                        <SocialLink href="https://whatsapp.com" ariaLabel="WhatsApp" icon={<WhatsAppIcon className="h-8 w-8 text-green-500"/>} />
                        <SocialLink href="https://instagram.com" ariaLabel="Instagram" icon={<InstagramIcon className="h-8 w-8 text-pink-500"/>} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactView;
