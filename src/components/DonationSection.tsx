
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const DonationSection = () => {
  const upiId = "adnanmuhammad4393@okicici";

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    toast({
      title: "UPI ID Copied!",
      description: "UPI ID has been copied to your clipboard.",
    });
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-linkedin-blue/5 to-linkedin-light-blue/5">
      <div className="container mx-auto text-center">
        <Card className="max-w-md mx-auto border-linkedin-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2 text-linkedin-blue">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              <span>Support the Developer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              If you find this tool helpful, consider supporting the development with a small donation.
            </p>
            <div className="bg-linkedin-light-gray/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">UPI ID:</p>
              <div className="flex items-center justify-between bg-background border border-border rounded-md p-2">
                <code className="text-sm font-mono">{upiId}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyUpiId}
                  className="text-linkedin-blue hover:text-linkedin-dark-blue"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Your support helps maintain and improve this platform. Thank you! 🙏
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
