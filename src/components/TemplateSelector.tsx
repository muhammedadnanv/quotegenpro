
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
  onBack: () => void;
}

const templates = [
  {
    id: 'modern',
    name: 'LinkedIn Premium',
    description: 'Professional LinkedIn blue theme with premium styling',
    preview: 'bg-gradient-to-br from-linkedin-blue to-linkedin-dark-blue',
  },
  {
    id: 'minimal',
    name: 'Clean White',
    description: 'Simple white background with elegant typography',
    preview: 'bg-white border-2 border-border',
  },
  {
    id: 'dark',
    name: 'Professional Dark',
    description: 'Dark theme with LinkedIn blue accents',
    preview: 'bg-gradient-to-br from-gray-900 to-black',
  },
  {
    id: 'corporate',
    name: 'Corporate Blue',
    description: 'Deep blue theme for business professionals',
    preview: 'bg-gradient-to-br from-linkedin-dark-blue to-blue-900',
  },
  {
    id: 'creative',
    name: 'Creative Gold',
    description: 'LinkedIn blue with gold accents for creative professionals',
    preview: 'bg-gradient-to-br from-linkedin-blue to-linkedin-gold',
  },
  {
    id: 'elegant',
    name: 'Executive Gray',
    description: 'Sophisticated gray design for executives',
    preview: 'bg-gradient-to-br from-gray-600 to-gray-800',
  },
];

export const TemplateSelector = ({ onSelect, onBack }: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const handleContinue = () => {
    onSelect(selectedTemplate);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Template</h2>
        <p className="text-lg text-muted-foreground">
          Select a design template that matches your professional style and brand
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
              selectedTemplate === template.id
                ? 'border-linkedin-blue shadow-lg ring-2 ring-linkedin-blue/20'
                : 'border-border hover:border-linkedin-blue/50'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <CardContent className="p-6">
              <div className={`${template.preview} h-32 rounded-lg mb-4 relative overflow-hidden`}>
                {/* Mock quote preview */}
                <div className="absolute inset-4 flex items-center justify-center">
                  <div className={`text-center ${template.id === 'minimal' ? 'text-foreground' : 'text-white'}`}>
                    <div className="text-sm font-medium mb-1">"Sample Quote"</div>
                    <div className="text-xs opacity-75">Your Name</div>
                  </div>
                </div>
                
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-linkedin-blue text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              
              <h3 className="font-semibold text-lg mb-2 text-foreground">{template.name}</h3>
              <p className="text-muted-foreground text-sm">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack} 
          size="lg"
          className="border-linkedin-blue text-linkedin-blue hover:bg-linkedin-blue hover:text-white"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Profile
        </Button>
        
        <Button 
          onClick={handleContinue} 
          size="lg"
          className="bg-linkedin-blue hover:bg-linkedin-dark-blue text-white"
        >
          Continue to Editor
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
