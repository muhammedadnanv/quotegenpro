import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Users, Download, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { DonationSection } from '@/components/DonationSection';

interface HomeProps {
  onGetStarted: () => void;
}

export const Home = ({ onGetStarted }: HomeProps) => {
  const features = [
    {
      icon: Quote,
      title: 'Professional Templates',
      description: 'Choose from 6 beautifully designed templates that match your brand'
    },
    {
      icon: Users,
      title: 'LinkedIn Integration',
      description: 'Use your LinkedIn profile photo and information seamlessly'
    },
    {
      icon: Download,
      title: 'High-Quality Downloads',
      description: 'Export your quotes in high resolution for any platform'
    },
    {
      icon: Star,
      title: 'Easy Customization',
      description: 'Customize fonts, sizes, and alignment with our intuitive editor'
    }
  ];

  const benefits = [
    'Create professional quote posts in minutes',
    'Stand out on LinkedIn with premium designs',
    'No design experience required',
    'Perfect for thought leaders and professionals',
    'Mobile-optimized and responsive',
    'Instant download and sharing'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-linkedin-light-gray to-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-linkedin-blue to-linkedin-light-blue p-4 rounded-2xl mb-6 inline-block">
              <Quote className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-linkedin-blue to-linkedin-dark-blue bg-clip-text text-transparent">
              QuoteGen Pro
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Create stunning, professional quote posts for LinkedIn in minutes. 
              Stand out with premium designs that capture attention and build your personal brand.
            </p>
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-linkedin-blue hover:bg-linkedin-dark-blue text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Everything You Need to Create Amazing Quotes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools you need to create professional quote posts that engage your audience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="bg-linkedin-blue/10 p-3 rounded-xl mb-4 inline-block">
                    <feature.icon className="h-8 w-8 text-linkedin-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-linkedin-light-gray/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Why Choose QuoteGen Pro?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-linkedin-blue mt-0.5 flex-shrink-0" />
                    <span className="text-lg text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="mt-8 bg-linkedin-blue hover:bg-linkedin-dark-blue text-white px-8 py-4 text-lg font-semibold rounded-xl"
              >
                Start Creating Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-linkedin-blue to-linkedin-light-blue p-8 rounded-2xl">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-linkedin-blue rounded-full flex items-center justify-center">
                      <Quote className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Sample Quote</h3>
                      <p className="text-sm text-muted-foreground">Professional Template</p>
                    </div>
                  </div>
                  <blockquote className="text-lg text-foreground italic mb-4">
                    "Success is not final, failure is not fatal: it is the courage to continue that counts."
                  </blockquote>
                  <div className="text-right">
                    <p className="font-semibold text-linkedin-blue">Winston Churchill</p>
                    <p className="text-sm text-muted-foreground">Former Prime Minister</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <DonationSection />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to Elevate Your LinkedIn Presence?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust QuoteGen Pro to create engaging content that builds their personal brand.
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-linkedin-blue hover:bg-linkedin-dark-blue text-white px-12 py-4 text-xl font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started for Free
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </section>
    </div>
  );
};
