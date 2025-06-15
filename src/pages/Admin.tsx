
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, FileText, Gamepad2, Users, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteSettings from '@/components/admin/SiteSettings';
import PostsManagement from '@/components/admin/PostsManagement';
import GamesManagement from '@/components/admin/GamesManagement';
import SubmissionsManagement from '@/components/admin/SubmissionsManagement';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Área Administrativa
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Gerencie o conteúdo e configurações do site
          </p>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText size={16} />
              Posts
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad2 size={16} />
              Jogos
            </TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center gap-2">
              <Send size={16} />
              Envios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>

          <TabsContent value="posts">
            <PostsManagement />
          </TabsContent>

          <TabsContent value="games">
            <GamesManagement />
          </TabsContent>

          <TabsContent value="submissions">
            <SubmissionsManagement />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
