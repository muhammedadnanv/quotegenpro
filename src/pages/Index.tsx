
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { QuoteEditor } from '@/components/QuoteEditor';
import { ProfileSetup } from '@/components/ProfileSetup';
import { TemplateSelector } from '@/components/TemplateSelector';
import { SplashScreen } from '@/components/SplashScreen';
import { Home } from '@/pages/Home';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<'home' | 'profile' | 'template' | 'editor'>('home');
  const [profileData, setProfileData] = useState<{
    name: string;
    image: string;
    title?: string;
  } | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');

  const handleSplashComplete = () => {
    setIsLoading(false);
  };

  const handleGetStarted = () => {
    setCurrentStep('profile');
  };

  const handleProfileComplete = (data: { name: string; image: string; title?: string }) => {
    setProfileData(data);
    setCurrentStep('template');
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentStep('editor');
  };

  const handleBackToHome = () => {
    setCurrentStep('home');
    setProfileData(null);
    setSelectedTemplate('modern');
  };

  const handleBackToProfile = () => {
    setCurrentStep('profile');
  };

  const handleBackToTemplate = () => {
    setCurrentStep('template');
  };

  if (isLoading) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {currentStep !== 'home' && <Header onBackToHome={handleBackToHome} />}
      
      <main className={currentStep === 'home' ? '' : 'container mx-auto px-4 py-8'}>
        {currentStep === 'home' && (
          <Home onGetStarted={handleGetStarted} />
        )}
        
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
