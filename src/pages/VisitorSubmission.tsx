
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VisitorSubmissionForm from '@/components/visitor/VisitorSubmissionForm';
import Breadcrumb from '@/components/Breadcrumb';

const VisitorSubmission: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Enviar Post' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Compartilhe Seu Conteúdo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tem algo interessante sobre jogos para compartilhar? Envie seu post para análise 
            e ele poderá ser publicado em nosso site!
          </p>
        </div>

        <VisitorSubmissionForm />
      </main>

      <Footer />
    </div>
  );
};

export default VisitorSubmission;
