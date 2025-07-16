
import { useEffect } from 'react';
import { Quote } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-linkedin-blue via-linkedin-light-blue to-linkedin-dark-blue flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full mb-6 inline-block animate-pulse">
            <Quote className="h-16 w-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          QuoteGen Pro
        </h1>
        
        <p className="text-xl text-white/80 mb-8 max-w-md mx-auto">
          Creating professional quote posts for LinkedIn professionals
        </p>
        
        <div className="flex justify-center">
          <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="w-full h-full bg-linkedin-gold rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <p className="text-white/60 mt-4 text-sm">Loading your workspace...</p>
      </div>
    </div>
  );
};
