
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
    name: 'Modern',
    description: 'Clean and professional with gradient background',
    preview: 'bg-gradient-to-br from-blue-600 to-purple-600',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple white background with elegant typography',
    preview: 'bg-white border-2 border-gray-200',
  },
  {
    id: 'dark',
    name: 'Dark Theme',
    description: 'Dark background with bright accent colors',
    preview: 'bg-gradient-to-br from-gray-900 to-black',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional blue theme for business content',
    preview: 'bg-gradient-to-br from-blue-800 to-blue-900',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant colors for creative professionals',
    preview: 'bg-gradient-to-br from-pink-500 to-orange-500',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated design with subtle gradients',
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
        <p className="text-lg text-gray-600">
          Select a design template that matches your style and brand
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id
                ? 'ring-2 ring-blue-500 shadow-lg'
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <CardContent className="p-6">
              <div className={`${template.preview} h-32 rounded-lg mb-4 relative overflow-hidden`}>
                {/* Mock quote preview */}
                <div className="absolute inset-4 flex items-center justify-center">
                  <div className={`text-center ${template.id === 'minimal' ? 'text-gray-800' : 'text-white'}`}>
                    <div className="text-sm font-medium mb-1">"Sample Quote"</div>
                    <div className="text-xs opacity-75">Your Name</div>
                  </div>
                </div>
                
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
              <p className="text-gray-600 text-sm">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Profile
        </Button>
        
        <Button onClick={handleContinue} size="lg">
          Continue to Editor
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
