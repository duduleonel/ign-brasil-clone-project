
import React from 'react';
import { MessageCircle, Facebook, Twitter, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SocialLogin: React.FC = () => {
  const handleSocialLogin = (provider: string) => {
    // This would integrate with your authentication system
    console.log(`Login with ${provider}`);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="mr-2" size={20} />
          Comentários
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Faça login para participar da discussão
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('google')}
              className="flex items-center"
            >
              <Mail size={16} className="mr-2" />
              Google
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('facebook')}
              className="flex items-center"
            >
              <Facebook size={16} className="mr-2" />
              Facebook
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('twitter')}
              className="flex items-center"
            >
              <Twitter size={16} className="mr-2" />
              Twitter
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleSocialLogin('github')}
              className="flex items-center"
            >
              <Github size={16} className="mr-2" />
              GitHub
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Seus comentários são importantes para nossa comunidade!</p>
            <p className="mt-1">Por favor, mantenha um ambiente respeitoso e construtivo.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialLogin;
