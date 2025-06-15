
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ArticleCard from '@/components/ArticleCard';
import GameReviews from '@/components/GameReviews';
import GameGallery from '@/components/GameGallery';
import GameVideos from '@/components/GameVideos';
import type { Game, Post } from '@/types/database';

interface GameDetailTabsProps {
  game: Game;
  relatedPosts?: Post[];
}

const GameDetailTabs: React.FC<GameDetailTabsProps> = ({ game, relatedPosts }) => {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
        <TabsTrigger value="posts">Posts Relacionados</TabsTrigger>
        <TabsTrigger value="reviews">Avaliações</TabsTrigger>
        <TabsTrigger value="gallery">Galeria</TabsTrigger>
        <TabsTrigger value="videos">Vídeos</TabsTrigger>
      </TabsList>

      <TabsContent value="posts">
        <Card>
          <CardHeader>
            <CardTitle>Posts Relacionados</CardTitle>
          </CardHeader>
          <CardContent>
            {relatedPosts && relatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Nenhum post relacionado encontrado.
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews">
        <GameReviews gameId={game.id} />
      </TabsContent>

      <TabsContent value="gallery">
        <GameGallery game={game} />
      </TabsContent>

      <TabsContent value="videos">
         <Card>
          <CardHeader>
            <CardTitle>Vídeos</CardTitle>
          </CardHeader>
          <CardContent>
            <GameVideos game={game} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default GameDetailTabs;
