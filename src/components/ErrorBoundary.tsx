
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8 max-w-md w-full text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle size={48} className="text-red-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ops! Algo deu errado
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Encontramos um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver.
            </p>
            
            {this.state.error && (
              <details className="text-left bg-gray-50 dark:bg-gray-800 rounded p-3 mb-4 text-xs">
                <summary className="cursor-pointer text-gray-700 dark:text-gray-300 font-medium">
                  Detalhes técnicos
                </summary>
                <code className="text-red-600 dark:text-red-400 mt-2 block">
                  {this.state.error.message}
                </code>
              </details>
            )}
            
            <div className="space-y-3">
              <Button onClick={this.handleRetry} className="w-full">
                <RefreshCw size={16} className="mr-2" />
                Tentar novamente
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                Voltar ao início
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
