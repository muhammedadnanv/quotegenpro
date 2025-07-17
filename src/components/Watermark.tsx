
import { ExternalLink, Heart } from 'lucide-react';

export const Watermark = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span>Developed by</span>
          <a
            href="https://www.linkedin.com/in/muhammedadnanvv/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-linkedin-blue hover:text-linkedin-dark-blue transition-colors"
          >
            <span>Muhammed Adnan</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
