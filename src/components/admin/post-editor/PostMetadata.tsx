
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PostMetadataProps {
  author: string;
  status: string;
  onInputChange: (field: string, value: string) => void;
}

const PostMetadata: React.FC<PostMetadataProps> = ({ author, status, onInputChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="author">Autor</Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => onInputChange('author', e.target.value)}
          placeholder="Nome do autor"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={(value) => onInputChange('status', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Rascunho</SelectItem>
            <SelectItem value="published">Publicado</SelectItem>
            <SelectItem value="archived">Arquivado</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PostMetadata;
