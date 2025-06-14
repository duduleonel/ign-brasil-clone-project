
import React from 'react';
import Header from '../components/Header';
import ArticleCard from '../components/ArticleCard';
import ReviewCard from '../components/ReviewCard';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { Play, Star, Fire } from 'lucide-react';

const Index = () => {
  const featuredArticles = [
    {
      title: "Spider-Man 2: A nova era dos super-heróis chegou aos games",
      excerpt: "Marvel's Spider-Man 2 estabelece um novo padrão para jogos de super-heróis, combinando narrativa cinematográfica com gameplay inovador.",
      category: "DESTAQUE",
      readTime: "8 min",
      views: "15.2k",
      imageUrl: "photo-1635805737707-575885ab0820",
      isLarge: true
    },
    {
      title: "Cyberpunk 2077: Expansão Phantom Liberty surpreende",
      excerpt: "A aguardada expansão de Cyberpunk 2077 finalmente redime o jogo com conteúdo de qualidade excepcional.",
      category: "REVIEW",
      readTime: "6 min",
      views: "8.7k",
      imageUrl: "photo-1542751371-adc38448a05e"
    },
    {
      title: "Final Fantasy XVI chega ao PC em 2024",
      excerpt: "Square Enix confirma que o épico de fantasia medieval finalmente chegará aos PCs no próximo ano.",
      category: "NOTÍCIAS",
      readTime: "3 min",
      views: "12.1k",
      imageUrl: "photo-1560253023-3ec5d502959f"
    },
    {
      title: "PlayStation 5 Pro: Especificações vazadas",
      excerpt: "Novos rumores revelam possíveis especificações da versão Pro do console da Sony.",
      category: "TECH",
      readTime: "5 min",
      views: "9.3k",
      imageUrl: "photo-1606144042614-b2417e99c4e3"
    },
    {
      title: "The Game Awards 2024: Indicados revelados",
      excerpt: "Confira todos os jogos indicados para as principais categorias do maior evento do ano.",
      category: "EVENTOS",
      readTime: "4 min",
      views: "18.5k",
      imageUrl: "photo-1511512578047-dfb367046420"
    }
  ];

  const latestReviews = [
    {
      title: "Super Mario Bros. Wonder",
      score: 9.2,
      platform: "Nintendo Switch",
      imageUrl: "photo-1606144042614-b2417e99c4e3",
      reviewer: "Carlos Silva"
    },
    {
      title: "Alan Wake 2",
      score: 8.8,
      platform: "PC, PS5, Xbox",
      imageUrl: "photo-1552820728-8b83bb6b773f",
      reviewer: "Maria Santos"
    },
    {
      title: "Forza Motorsport",
      score: 8.5,
      platform: "Xbox, PC",
      imageUrl: "photo-1558618047-3c8c76ca7d13",
      reviewer: "João Pedro"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-4">
                O futuro dos games está aqui
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                Descubra as últimas novidades, reviews exclusivos e análises profundas do mundo dos videogames.
              </p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center">
                <Play size={20} className="mr-2" />
                Assistir trailer
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Featured articles */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <Fire className="mr-3 text-red-500" size={32} />
                Destaques
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArticles.map((article, index) => (
                  <ArticleCard key={index} {...article} />
                ))}
              </div>
            </section>

            {/* Latest Reviews */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <Star className="mr-3 text-yellow-500" size={32} />
                Últimos Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestReviews.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </div>
            </section>

            {/* Video section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <Play className="mr-3 text-red-500" size={32} />
                Vídeos em destaque
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1560253023-3ec5d502959f"
                    alt="Vídeo"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="bg-red-600 rounded-full p-4">
                      <Play size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white font-bold text-xl mb-2">
                      Gameplay exclusivo: Starfield
                    </h3>
                    <p className="text-gray-300">
                      Confira 20 minutos de gameplay inédito do mais aguardado RPG do ano.
                    </p>
                  </div>
                </div>
                
                <div className="relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1511512578047-dfb367046420"
                    alt="Vídeo"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="bg-red-600 rounded-full p-4">
                      <Play size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white font-bold text-xl mb-2">
                      Review: Baldur's Gate 3
                    </h3>
                    <p className="text-gray-300">
                      Nossa análise completa do RPG que está revolucionando o gênero.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
