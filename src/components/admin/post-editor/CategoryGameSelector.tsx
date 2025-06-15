
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Game {
  id: string;
  title: string;
  slug: string;
}

interface CategoryGameSelectorProps {
  categories?: Category[];
  games?: Game[];
  categoryId: string;
  gameId: string;
  onInputChange: (field: string, value: string) => void;
}

const CategoryGameSelector: React.FC<CategoryGameSelectorProps> = ({
  categories,
  games,
  categoryId,
  gameId,
  onInputChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select value={categoryId} onValueChange={(value) => onInputChange('category_id', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Nenhuma categoria</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="game">Jogo Relacionado</Label>
        <Select value={gameId} onValueChange={(value) => onInputChange('game_id', value === 'none' ? '' : value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um jogo (opcional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Nenhum jogo</SelectItem>
            {games?.map((game) => (
              <SelectItem key={game.id} value={game.id}>
                {game.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CategoryGameSelector;
