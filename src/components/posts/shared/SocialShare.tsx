
import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  title: string;
  url?: string;
  text?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url = window.location.href, text }) => {
  const { toast } = useToast();

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o link.",
        variant: "destructive",
      });
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        // User cancelled sharing
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Compartilhar:</span>
      
      {navigator.share && (
        <Button onClick={nativeShare} variant="outline" size="sm">
          <Share2 size={16} />
        </Button>
      )}
      
      <Button 
        onClick={() => window.open(shareLinks.facebook, '_blank')} 
        variant="outline" 
        size="sm"
      >
        <Facebook size={16} />
      </Button>
      
      <Button 
        onClick={() => window.open(shareLinks.twitter, '_blank')} 
        variant="outline" 
        size="sm"
      >
        <Twitter size={16} />
      </Button>
      
      <Button 
        onClick={() => window.open(shareLinks.linkedin, '_blank')} 
        variant="outline" 
        size="sm"
      >
        <Linkedin size={16} />
      </Button>
      
      <Button onClick={copyToClipboard} variant="outline" size="sm">
        <Copy size={16} />
      </Button>
    </div>
  );
};

export default SocialShare;
