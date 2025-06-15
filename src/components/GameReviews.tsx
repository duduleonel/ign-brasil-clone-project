
import React, { useState } from 'react';
import { Star, MessageSquare, User } from 'lucide-react';
import { useGameReviews, useCreateGameReview } from '@/hooks/useGameReviews';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

interface GameReviewsProps {
  gameId: string;
}

const GameReviews: React.FC<GameReviewsProps> = ({ gameId }) => {
  const { data: reviews, isLoading } = useGameReviews(gameId);
  const createReview = useCreateGameReview();
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    user_name: '',
    rating: 5,
    review_text: ''
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.user_name.trim()) return;

    try {
      await createReview.mutateAsync({
        game_id: gameId,
        user_name: newReview.user_name,
        rating: newReview.rating,
        review_text: newReview.review_text
      });

      setNewReview({ user_name: '', rating: 5, review_text: '' });
      setIsReviewFormOpen(false);
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const renderStars = (rating: number, size = 16) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={size}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
      />
    ));
  };

  const averageRating = reviews && reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Avaliações dos Usuários
          </h3>
          {reviews && reviews.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {renderStars(Math.round(averageRating), 20)}
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                ({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})
              </span>
            </div>
          )}
        </div>
        
        <Button 
          onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
          className="bg-green-600 hover:bg-green-700"
        >
          <MessageSquare size={16} className="mr-2" />
          Avaliar Jogo
        </Button>
      </div>

      {/* Formulário de Nova Avaliação */}
      {isReviewFormOpen && (
        <form onSubmit={handleSubmitReview} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Sua Avaliação</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seu Nome
              </label>
              <Input
                value={newReview.user_name}
                onChange={(e) => setNewReview({ ...newReview, user_name: e.target.value })}
                placeholder="Digite seu nome"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nota (1-5)
              </label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {[5, 4, 3, 2, 1].map(rating => (
                  <option key={rating} value={rating}>
                    {rating} {rating === 1 ? 'Estrela' : 'Estrelas'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Comentário (opcional)
            </label>
            <Textarea
              value={newReview.review_text}
              onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
              placeholder="Escreva sua opinião sobre o jogo..."
              rows={3}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={createReview.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {createReview.isPending ? 'Enviando...' : 'Enviar Avaliação'}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setIsReviewFormOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}

      {/* Lista de Avaliações */}
      {reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <User size={16} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {review.user_name}
                    </h5>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {review.review_text && (
                <p className="text-gray-600 dark:text-gray-400 ml-11">
                  {review.review_text}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
            Nenhuma avaliação ainda
          </h4>
          <p className="text-gray-400 dark:text-gray-500">
            Seja o primeiro a avaliar este jogo!
          </p>
        </div>
      )}
    </div>
  );
};

export default GameReviews;
