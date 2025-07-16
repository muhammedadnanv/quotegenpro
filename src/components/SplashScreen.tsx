
import { useEffect, useState } from 'react';
import { Quote, Loader2 } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const messages = [
      'Initializing...',
      'Loading templates...',
      'Setting up editor...',
      'Almost ready...',
    ];

    let currentMessage = 0;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        
        // Update loading text based on progress
        if (newProgress >= 25 && currentMessage === 0) {
          setLoadingText(messages[1]);
          currentMessage = 1;
        } else if (newProgress >= 50 && currentMessage === 1) {
          setLoadingText(messages[2]);
          currentMessage = 2;
        } else if (newProgress >= 75 && currentMessage === 2) {
          setLoadingText(messages[3]);
          currentMessage = 3;
        }
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-linkedin-blue via-linkedin-dark-blue to-linkedin-light-blue flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="mb-8 animate-fade-in">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-6 inline-block">
            <Quote className="h-16 w-16 text-white animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-linkedin-gold bg-clip-text text-transparent">
            QuoteGen Pro
          </h1>
          <p className="text-xl text-white/90">Professional Quote Generator</p>
        </div>
        
        <div className="w-80 mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-linkedin-gold to-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-white/80 mt-3">{progress}%</p>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-white/80">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">{loadingText}</span>
        </div>
      </div>
    </div>
  );
};
