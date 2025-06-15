
import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Salvar no localStorage por enquanto
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    }
    
    setIsSubscribed(true);
    setIsLoading(false);
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-3">
          <Check size={32} className="text-white" />
        </div>
        <h3 className="text-white font-bold text-xl mb-2">Inscrito com sucesso!</h3>
        <p className="text-white/90 text-sm">
          Obrigado por se inscrever. Você receberá nossas novidades em breve!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6">
      <h3 className="text-white font-bold text-xl mb-4 flex items-center">
        <Mail className="mr-2" size={24} />
        Newsletter
      </h3>
      <p className="text-white/90 mb-4">
        Receba as últimas notícias sobre Mugen, Ikemen GO e OpenBOR direto no seu email.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/20 text-white placeholder-white/70 border-white/30 focus:border-white"
          disabled={isLoading}
        />
        <Button 
          type="submit"
          className="w-full bg-white text-green-600 font-bold hover:bg-gray-100 transition-colors"
          disabled={isLoading || !email}
        >
          {isLoading ? 'Inscrevendo...' : 'Inscrever-se'}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
