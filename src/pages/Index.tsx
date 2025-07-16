
import { useState } from 'react';
import { Header } from '@/components/Header';
import { QuoteEditor } from '@/components/QuoteEditor';
import { ProfileSetup } from '@/components/ProfileSetup';
import { TemplateSelector } from '@/components/TemplateSelector';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'profile' | 'template' | 'editor'>('profile');
  const [profileData, setProfileData] = useState<{
    name: string;
    image: string;
    title?: string;
  } | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');

  const handleProfileComplete = (data: { name: string; image: string; title?: string }) => {
    setProfileData(data);
    setCurrentStep('template');
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentStep('editor');
  };

  const handleBackToProfile = () => {
    setCurrentStep('profile');
    setProfileData(null);
  };

  const handleBackToTemplate = () => {
    setCurrentStep('template');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'profile' && (
          <ProfileSetup onComplete={handleProfileComplete} />
        )}
        
        {currentStep === 'template' && (
          <TemplateSelector 
            onSelect={handleTemplateSelect}
            onBack={handleBackToProfile}
          />
        )}
        
        {currentStep === 'editor' && profileData && (
          <QuoteEditor 
            profileData={profileData}
            templateId={selectedTemplate}
            onBackToTemplate={handleBackToTemplate}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
