
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PostBasicInfoProps {
  formData: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const PostBasicInfo: React.FC<PostBasicInfoProps> = ({ formData, onInputChange }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            placeholder="Digite o título do post"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => onInputChange('slug', e.target.value)}
            placeholder="slug-do-post"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Resumo</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => onInputChange('excerpt', e.target.value)}
          placeholder="Breve descrição do post"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => onInputChange('content', e.target.value)}
          placeholder="Conteúdo completo do post"
          rows={10}
        />
      </div>
    </>
  );
};

export default PostBasicInfo;
