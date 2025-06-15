
import React from 'react';
import { Download, ExternalLink, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Game } from '@/types/database';

interface GameDownloadLinksProps {
  game: Game;
}

const GameDownloadLinks: React.FC<GameDownloadLinksProps> = ({ game }) => {
  // Links fictícios para demonstração - em um caso real, estes viriam do banco de dados
  const downloadLinks = [
    {
      platform: 'Steam',
      url: '#',
      price: game.price || 0,
      type: 'purchase' as const
    },
    {
      platform: 'Epic Games',
      url: '#',
      price: game.price || 0,
      type: 'purchase' as const
    },
    {
      platform: 'Mugen Archive',
      url: '#',
      price: 0,
      type: 'download' as const
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download size={20} />
          Download & Compra
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {downloadLinks.map((link, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                {link.type === 'purchase' ? (
                  <ShoppingCart size={16} className="text-green-600 dark:text-green-400" />
                ) : (
                  <Download size={16} className="text-green-600 dark:text-green-400" />
                )}
              </div>
              <div>
                <div className="font-medium">{link.platform}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {link.price > 0 ? `R$ ${link.price.toFixed(2)}` : 'Gratuito'}
                </div>
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => window.open(link.url, '_blank')}
            >
              {link.type === 'purchase' ? 'Comprar' : 'Download'}
              <ExternalLink size={14} className="ml-1" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default GameDownloadLinks;
