
import React from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameViewControlsProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  showComparator: boolean;
  setShowComparator: (show: boolean) => void;
}

const GameViewControls: React.FC<GameViewControlsProps> = ({
  viewMode,
  setViewMode,
  showComparator,
  setShowComparator
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={showComparator ? "default" : "outline"}
        onClick={() => setShowComparator(!showComparator)}
        className="hidden lg:flex"
      >
        Comparador
      </Button>
      <Button
        variant={viewMode === 'grid' ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode('grid')}
      >
        <Grid size={16} />
      </Button>
      <Button
        variant={viewMode === 'list' ? "default" : "outline"}
        size="sm"
        onClick={() => setViewMode('list')}
      >
        <List size={16} />
      </Button>
    </div>
  );
};

export default GameViewControls;
