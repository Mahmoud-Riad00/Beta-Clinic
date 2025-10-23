
import React from 'react';
import { HeartIcon, LightbulbIcon, ShieldCheckIcon, SparklesIcon } from '../components/icons/Icons';

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string; delay: number }> = ({ icon, title, description, delay }) => (
  <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-lg text-center opacity-0 animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
    <div className="flex justify-center items-center mb-4">
        <div className="bg-primary-light dark:bg-sky-900 p-4 rounded-full">
            {icon}
        </div>
    </div>
    <h3 className="mt-4 text-lg font-semibold text-text-light dark:text-text-dark">{title}</h3>
    <p className="text-secondary dark:text-gray-400 mt-2 text-sm">{description}</p>
  </div>
);


const AboutView: React.FC = () => {
  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-12 opacity-0 animate-fade-in-up" style={{ minHeight: '300px' }}>
        <img src="https://picsum.photos/seed/about-hero/1200/400" alt="Clinic Interior" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary-dark bg-opacity-60"></div>
        <div className="relative h-full flex flex-col justify-center items-center text-center p-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">About ClinicSys</h1>
          <p className="mt-4 text-lg text-primary-light max-w-2xl">Your trusted partner in comprehensive and accessible healthcare management.</p>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-3xl font-bold text-primary-dark dark:text-primary-light mb-4">Our Mission</h2>
          <p className="text-secondary dark:text-gray-400 leading-relaxed">
            To empower healthcare providers with innovative, intuitive, and efficient tools that streamline clinic operations, enhance patient care, and improve overall health outcomes. We are committed to simplifying the complexities of medical administration so that doctors can focus on what they do best: healing.
          </p>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark p-8 rounded-xl shadow-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h2 className="text-3xl font-bold text-primary-dark dark:text-primary-light mb-4">Our Vision</h2>
          <p className="text-secondary dark:text-gray-400 leading-relaxed">
            To be the leading platform for clinic management, recognized for our cutting-edge technology, user-centric design, and unwavering dedication to the healthcare community. We envision a future where every clinic, regardless of size, has access to the best digital tools to provide exceptional patient experiences.
          </p>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-primary-dark dark:text-primary-light opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>Our Core Values</h2>
        <p className="mt-2 text-secondary dark:text-gray-400 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
            Our commitment to excellence is guided by these core principles.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ValueCard 
            icon={<HeartIcon className="h-8 w-8 text-primary-dark dark:text-primary-light"/>}
            title="Patient-Centric Care"
            description="We prioritize the needs and well-being of patients in every feature we design."
            delay={800} 
        />
        <ValueCard 
            icon={<LightbulbIcon className="h-8 w-8 text-primary-dark dark:text-primary-light"/>}
            title="Innovation"
            description="We continuously seek and implement cutting-edge technology to solve real-world healthcare challenges."
            delay={900} 
        />
        <ValueCard 
            icon={<ShieldCheckIcon className="h-8 w-8 text-primary-dark dark:text-primary-light"/>}
            title="Integrity & Security"
            description="We uphold the highest standards of data security and ethical conduct to build unwavering trust."
            delay={1000} 
        />
        <ValueCard 
            icon={<SparklesIcon className="h-8 w-8 text-primary-dark dark:text-primary-light"/>}
            title="Excellence"
            description="We are dedicated to delivering a high-quality, reliable, and seamless user experience."
            delay={1100} 
        />
      </div>
    </div>
  );
};

export default AboutView;
