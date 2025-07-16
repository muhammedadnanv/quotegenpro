
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Download, RefreshCw, Type, Palette, Image } from 'lucide-react';
import { QuoteCanvas } from '@/components/QuoteCanvas';
import { toast } from '@/hooks/use-toast';

interface QuoteEditorProps {
  profileData: {
    name: string;
    image: string;
    title?: string;
  };
  templateId: string;
  onBackToTemplate: () => void;
}

export const QuoteEditor = ({ profileData, templateId, onBackToTemplate }: QuoteEditorProps) => {
  const [quoteText, setQuoteText] = useState('Your inspiring quote goes here...');
  const [fontSize, setFontSize] = useState([32]);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = useCallback(async () => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    
    try {
      // Create a high-resolution version for download
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = `quote-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      
      toast({
        title: "Quote Downloaded!",
        description: "Your quote image has been saved to your device.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading your quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleShare = () => {
    if (navigator.share && canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'quote.png', { type: 'image/png' });
          navigator.share({
            files: [file],
            title: 'Check out my quote!',
          });
        }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onBackToTemplate}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Type className="h-5 w-5" />
                <span>Quote Text</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                placeholder="Enter your inspiring quote here..."
                className="min-h-[120px] text-lg"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Styling</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Font Family */}
              <div className="space-y-2">
                <Label>Font Family</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lora">Lora</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <Label>Font Size: {fontSize[0]}px</Label>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  max={64}
                  min={16}
                  step={2}
                  className="w-full"
                />
              </div>

              {/* Text Alignment */}
              <div className="space-y-2">
                <Label>Text Alignment</Label>
                <Select value={textAlign} onValueChange={(value: 'left' | 'center' | 'right') => setTextAlign(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Download Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Image className="h-5 w-5" />
                <span>Export</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleDownload}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 mr-2" />
                )}
                Download Quote
              </Button>
              
              {navigator.share && (
                <Button 
                  variant="outline"
                  onClick={handleShare}
                  className="w-full"
                >
                  Share Quote
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Canvas Preview */}
        <div className="lg:col-span-2">
          <Card className="h-fit">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                <p className="text-gray-600">Your quote will appear as shown below</p>
              </div>
              
              <div className="flex justify-center">
                <QuoteCanvas
                  ref={canvasRef}
                  profileData={profileData}
                  templateId={templateId}
                  quoteText={quoteText}
                  fontSize={fontSize[0]}
                  fontFamily={fontFamily}
                  textAlign={textAlign}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
