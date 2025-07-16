
import { Quote, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onBackToHome?: () => void;
}

export const Header = ({ onBackToHome }: HeaderProps) => {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-linkedin-blue to-linkedin-light-blue p-2 rounded-lg">
              <Quote className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-linkedin-blue to-linkedin-dark-blue bg-clip-text text-transparent">
                QuoteGen Pro
              </h1>
              <p className="text-sm text-muted-foreground">Professional Quote Generator</p>
            </div>
          </div>
          
          {onBackToHome && (
            <Button
              variant="outline"
              onClick={onBackToHome}
              className="border-linkedin-blue text-linkedin-blue hover:bg-linkedin-blue hover:text-white"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
