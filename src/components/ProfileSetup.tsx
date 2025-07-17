import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User, Linkedin, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
interface ProfileSetupProps {
  onComplete: (data: {
    name: string;
    image: string;
    title?: string;
  }) => void;
}
export const ProfileSetup = ({
  onComplete
}: ProfileSetupProps) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file.",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target?.result as string;
        setProfileImage(result);
        toast({
          title: "Image uploaded",
          description: "Your profile image has been uploaded successfully."
        });
      };
      reader.onerror = () => {
        toast({
          title: "Upload failed",
          description: "Failed to upload image. Please try again.",
          variant: "destructive"
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleLinkedInConnect = async () => {
    setIsLoading(true);

    // Simulate LinkedIn API call with realistic data
    setTimeout(() => {
      const mockProfiles = [{
        name: 'John Doe',
        title: 'Software Engineer at Tech Corp',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      }, {
        name: 'Jane Smith',
        title: 'Marketing Manager at Digital Agency',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b9c5c2bb?w=400&h=400&fit=crop&crop=face'
      }, {
        name: 'Alex Johnson',
        title: 'Product Designer at Innovation Lab',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
      }];
      const randomProfile = mockProfiles[Math.floor(Math.random() * mockProfiles.length)];
      setName(randomProfile.name);
      setTitle(randomProfile.title);
      setProfileImage(randomProfile.image);
      setIsLoading(false);
      toast({
        title: "LinkedIn Profile Loaded",
        description: "Your profile information has been imported successfully."
      });
    }, 2000);
  };
  const handleContinue = () => {
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to continue.",
        variant: "destructive"
      });
      return;
    }
    onComplete({
      name: name.trim(),
      image: profileImage,
      title: title.trim() || undefined
    });
  };
  return <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Set Up Your Profile</h2>
        <p className="text-lg text-muted-foreground">
          Connect your LinkedIn or manually enter your information to get started
        </p>
      </div>

      <Card className="shadow-lg border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Information</span>
          </CardTitle>
          <CardDescription>
            This information will be used to generate your quote images
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* LinkedIn Integration */}
          <div className="text-center">
            
            
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">Or enter manually</span>
            </div>
          </div>

          {/* Manual Profile Setup */}
          <div className="space-y-4">
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImage} alt="Profile" />
                <AvatarFallback className="text-2xl bg-linkedin-light-blue text-white">
                  {name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-fit border-linkedin-blue text-linkedin-blue hover:bg-linkedin-blue hover:text-white">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" className="text-lg" />
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title (Optional)</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Software Engineer, Marketing Manager" />
            </div>
          </div>

          <Button onClick={handleContinue} className="w-full text-lg py-6 bg-linkedin-blue hover:bg-linkedin-dark-blue text-white" size="lg">
            Continue to Templates
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>;
};