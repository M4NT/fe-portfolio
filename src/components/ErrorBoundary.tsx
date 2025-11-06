import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Atualiza o state para que a próxima renderização mostre a UI de fallback
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log do erro para serviços de monitoramento (Sentry, LogRocket, etc)
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Aqui você pode enviar para um serviço de monitoramento
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  public render() {
    if (this.state.hasError) {
      // Fallback UI customizado
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // UI de erro padrão
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            {/* Card de erro */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl p-8 shadow-2xl">
              {/* Ícone de erro */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
              </div>

              {/* Título */}
              <h1 className="text-3xl font-bold text-white text-center mb-4">
                Oops! Algo deu errado
              </h1>

              {/* Descrição */}
              <p className="text-white/70 text-center mb-8">
                Encontramos um erro inesperado. Não se preocupe, já estamos trabalhando para resolver isso.
              </p>

              {/* Detalhes do erro (apenas em desenvolvimento) */}
              {typeof process !== 'undefined' && process.env?.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-8 p-4 bg-black/50 rounded-lg border border-white/10">
                  <summary className="text-white/80 cursor-pointer hover:text-white transition-colors mb-2">
                    Detalhes técnicos (dev only)
                  </summary>
                  <div className="mt-4 space-y-2">
                    <div className="text-red-400 font-mono text-sm break-all">
                      <strong>Error:</strong> {this.state.error.toString()}
                    </div>
                    {this.state.errorInfo && (
                      <div className="text-white/60 font-mono text-xs break-all max-h-40 overflow-y-auto">
                        <strong>Stack:</strong>
                        <pre className="mt-2 whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Ações */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReload}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <RefreshCw className="w-5 h-5" />
                  Recarregar Página
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                >
                  <Home className="w-5 h-5" />
                  Ir para Início
                </button>
              </div>

              {/* Informação adicional */}
              <p className="text-white/40 text-sm text-center mt-8">
                Se o problema persistir, entre em contato: 
                <a href="mailto:hi@yanmantovani.com" className="text-blue-400 hover:text-blue-300 ml-1 underline">
                  hi@yanmantovani.com
                </a>
              </p>
            </div>

            {/* Decoração */}
            <div className="mt-8 flex justify-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

