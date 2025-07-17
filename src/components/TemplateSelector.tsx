
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
  onBack: () => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional with LinkedIn blue gradients',
    preview: 'bg-gradient-to-br from-linkedin-blue to-linkedin-dark-blue'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple white background with clean typography',
    preview: 'bg-white border-2 border-border'
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Elegant dark theme with blue accents',
    preview: 'bg-gradient-to-br from-gray-800 to-gray-900'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional blue gradient for business content',
    preview: 'bg-gradient-to-br from-blue-800 to-blue-900'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant blue to gold gradient for creative posts',
    preview: 'bg-gradient-to-br from-linkedin-blue to-linkedin-gold'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated gray tones with subtle accents',
    preview: 'bg-gradient-to-br from-gray-600 to-gray-700'
  }
];

export const TemplateSelector = ({ onSelect, onBack }: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');

  const handleContinue = () => {
    onSelect(selectedTemplate);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Template</h2>
        <p className="text-lg text-muted-foreground">
          Select a template that matches your style and brand
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-linkedin-blue border-linkedin-blue' 
                : 'hover:border-linkedin-blue/50'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <CardContent className="p-4">
              <div className={`w-full h-32 rounded-lg mb-4 flex items-center justify-center ${template.preview}`}>
                <div className="text-white text-center">
                  <div className="text-lg font-semibold mb-2">"Sample Quote"</div>
                  <div className="text-sm opacity-90">Your Name</div>
                </div>
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-linkedin-blue rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <CardHeader className="p-0">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription className="text-sm">
                  {template.description}
                </CardDescription>
              </CardHeader>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Button>
        
        <Button 
          onClick={handleContinue}
          className="bg-linkedin-blue hover:bg-linkedin-dark-blue text-white"
        >
          Continue to Editor
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
