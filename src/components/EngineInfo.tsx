
import React from 'react';
import { Download, ExternalLink, Info } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface EngineInfoProps {
  engineSlug: string;
}

const EngineInfo: React.FC<EngineInfoProps> = ({ engineSlug }) => {
  const getEngineData = (slug: string) => {
    const engines = {
      'mugen': {
        name: 'M.U.G.E.N',
        description: 'Motor de luta 2D altamente personalizável que permite criar jogos de luta únicos com personagens de diferentes universos.',
        version: '1.1 Beta',
        downloadUrl: 'http://www.elecbyte.com/mugen/downloads.html',
        officialSite: 'http://www.elecbyte.com/',
        features: ['Engine 2D completo', 'Suporte a sprites customizados', 'Sistema de combos avançado', 'Multiplayer local']
      },
      'ikemen-go': {
        name: 'Ikemen GO',
        description: 'Engine moderna baseada em M.U.G.E.N com melhorias significativas, incluindo suporte a resoluções HD e recursos avançados.',
        version: '0.98.2',
        downloadUrl: 'https://github.com/ikemen-engine/Ikemen-GO/releases/latest',
        officialSite: 'https://github.com/ikemen-engine/Ikemen-GO',
        features: ['Suporte HD nativo', 'Netplay integrado', 'Shaders modernos', 'Compatibilidade M.U.G.E.N']
      },
      'openbor': {
        name: 'OpenBOR',
        description: 'Engine open-source para jogos beat-em-up 2D, perfeito para criar jogos no estilo Streets of Rage e Final Fight.',
        version: '4.0',
        downloadUrl: 'https://github.com/DCurrent/openbor/releases/latest',
        officialSite: 'https://github.com/DCurrent/openbor',
        features: ['Beat-em-up especializado', 'Multiplayer cooperativo', 'Scripting avançado', 'Cross-platform']
      }
    };
    
    return engines[slug as keyof typeof engines];
  };

  const engineData = getEngineData(engineSlug);

  if (!engineData) {
    return null;
  }

  return (
    <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Info className="text-green-600 dark:text-green-400" size={24} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {engineData.name}
              </h2>
              <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                v{engineData.version}
              </span>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {engineData.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {engineData.features.map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-col">
            <Button 
              asChild
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <a 
                href={engineData.downloadUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Download size={18} />
                Download v{engineData.version}
              </a>
            </Button>
            
            <Button 
              variant="outline"
              asChild
              className="border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <a 
                href={engineData.officialSite} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink size={18} />
                Site Oficial
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngineInfo;
