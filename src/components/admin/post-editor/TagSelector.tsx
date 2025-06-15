
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface TagSelectorProps {
  tags?: Tag[];
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ tags, selectedTags, onTagToggle }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <Label>Tags</Label>
      <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded p-3">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center space-x-2">
            <Checkbox
              id={tag.id}
              checked={selectedTags.includes(tag.id)}
              onCheckedChange={() => onTagToggle(tag.id)}
            />
            <Label htmlFor={tag.id} className="text-sm cursor-pointer">
              {tag.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;
