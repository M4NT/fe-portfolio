import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, Users, Shield, Clock, DollarSign, Gavel, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Header */}
      <motion.div 
        className="relative z-10 pt-8 pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Termos de Uso</h1>
              <p className="text-white/60">Contrato de Prestação de Serviços de Desenvolvimento Web</p>
              <p className="text-white/50 text-sm">Última atualização: {typeof Intl !== 'undefined' && Intl.DateTimeFormat ? new Date().toLocaleDateString('pt-BR') : '06/11/2025'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            
            {/* Legal Notice */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Gavel className="w-6 h-6 text-blue-400" />
                <h3 className="text-blue-400 font-semibold text-lg">Aviso Legal Importante</h3>
              </div>
              <p className="text-white/70 text-sm">
                Estes Termos de Uso constituem um contrato vinculativo entre você (Cliente) 
                e Yan Mantovani (Prestador de Serviços). Ao contratar nossos serviços, 
                você concorda integralmente com estes termos.
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-400" />
                1. Identificação das Partes
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Prestador de Serviços</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li><strong>Nome:</strong> Yan Mantovani</li>
                    <li><strong>CPF:</strong> [CPF]</li>
                    <li><strong>Profissão:</strong> Desenvolvedor Frontend Freelancer</li>
                    <li><strong>Especialização:</strong> React, TypeScript, Landing Pages</li>
                    <li><strong>Localização:</strong> Monte Alto, SP - Brasil</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Cliente</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li><strong>Identificação:</strong> Conforme contrato específico</li>
                    <li><strong>Responsabilidades:</strong> Definidas neste documento</li>
                    <li><strong>Direitos:</strong> Protegidos por lei</li>
                    <li><strong>Obrigações:</strong> Especificadas nos termos</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Services Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-green-400" />
                2. Descrição dos Serviços Oferecidos
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Oferecemos serviços especializados de desenvolvimento frontend, incluindo:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Desenvolvimento Web</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• Landing Pages responsivas e otimizadas</li>
                    <li>• Sites institucionais e corporativos</li>
                    <li>• Aplicações web com React/TypeScript</li>
                    <li>• Otimização de performance e SEO</li>
                    <li>• Integração com APIs e sistemas</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Design e Identidade</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• Criação de identidade visual</li>
                    <li>• Design de interfaces (UI/UX)</li>
                    <li>• Materiais para redes sociais</li>
                    <li>• Logotipos e marca</li>
                    <li>• Manual de identidade visual</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Client Responsibilities */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-purple-400" />
                3. Responsabilidades do Cliente
              </h2>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Obrigações Fundamentais</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• <strong>Fornecer informações precisas:</strong> Dados corretos e atualizados</li>
                    <li>• <strong>Disponibilizar materiais:</strong> Conteúdo, imagens, textos no prazo acordado</li>
                    <li>• <strong>Realizar pagamentos:</strong> Conforme cronograma estabelecido</li>
                    <li>• <strong>Participar ativamente:</strong> Feedback e aprovações em tempo hábil</li>
                    <li>• <strong>Respeitar prazos:</strong> Entregas de materiais conforme cronograma</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Obrigações Técnicas</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• <strong>Acesso a sistemas:</strong> Fornecer credenciais necessárias</li>
                    <li>• <strong>Domínio e hospedagem:</strong> Configurações conforme especificado</li>
                    <li>• <strong>Testes e validações:</strong> Participar do processo de testes</li>
                    <li>• <strong>Backup de dados:</strong> Manter cópias de segurança</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-yellow-400" />
                4. Condições de Pagamento
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Formas de Pagamento Aceitas</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <h4 className="text-green-400 font-medium mb-2">PIX (Recomendado)</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Desconto especial aplicado</li>
                        <li>• Transferência instantânea</li>
                        <li>• Sem taxas bancárias</li>
                        <li>• Confirmação imediata</li>
                      </ul>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="text-blue-400 font-medium mb-2">Cartão de Crédito</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Até 10x sem juros</li>
                        <li>• Link seguro de pagamento</li>
                        <li>• Processamento via PagSeguro</li>
                        <li>• Proteção do comprador</li>
                      </ul>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <h4 className="text-purple-400 font-medium mb-2">Parcelamento 50/50</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Para valores acima de R$ 900</li>
                        <li>• 50% no início do projeto</li>
                        <li>• 50% na entrega final</li>
                        <li>• Segurança para ambas as partes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Política de Reembolso</h3>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <h4 className="text-red-400 font-medium">Sem Reembolso</h4>
                    </div>
                    <p className="text-white/70 text-sm mb-3">
                      Devido à natureza personalizada e intelectual dos serviços, não oferecemos reembolsos. 
                      No entanto, garantimos:
                    </p>
                    <ul className="text-white/70 space-y-1 text-sm ml-4">
                      <li>• <strong>Revisões ilimitadas:</strong> Até sua total satisfação</li>
                      <li>• <strong>Suporte pós-entrega:</strong> 30 dias de suporte gratuito</li>
                      <li>• <strong>Correções:</strong> Ajustes necessários sem custo adicional</li>
                      <li>• <strong>Garantia de qualidade:</strong> Código limpo e documentado</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-indigo-400" />
                5. Propriedade Intelectual
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Transferência de Direitos</h3>
                  <p className="text-white/70 mb-4">
                    Após o pagamento integral do projeto, todos os direitos sobre o trabalho desenvolvido 
                    são transferidos ao cliente, incluindo:
                  </p>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• <strong>Código fonte:</strong> HTML, CSS, JavaScript, TypeScript</li>
                    <li>• <strong>Designs:</strong> Layouts, interfaces, elementos visuais</li>
                    <li>• <strong>Documentação:</strong> Manuais, guias de uso</li>
                    <li>• <strong>Assets:</strong> Imagens, ícones, fontes (quando criados)</li>
                    <li>• <strong>Configurações:</strong> Arquivos de configuração e setup</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Uso em Portfólio</h3>
                  <p className="text-white/70 mb-3">
                    Reservamos o direito de usar o trabalho desenvolvido em nosso portfólio e 
                    materiais promocionais, com as seguintes condições:
                  </p>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• <strong>Autorização prévia:</strong> Sempre solicitada ao cliente</li>
                    <li>• <strong>Confidencialidade:</strong> Respeitando informações sensíveis</li>
                    <li>• <strong>Créditos:</strong> Mencionando o cliente quando apropriado</li>
                    <li>• <strong>Uso limitado:</strong> Apenas para demonstração de competências</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Project Timeline */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-orange-400" />
                6. Cronograma e Entregas
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Prazos Típicos</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• <strong>Landing Pages:</strong> 1-2 semanas</li>
                    <li>• <strong>Identidade Visual:</strong> 2-3 semanas</li>
                    <li>• <strong>Social Media:</strong> 1 semana</li>
                    <li>• <strong>Sites Institucionais:</strong> 3-4 semanas</li>
                    <li>• <strong>Projetos Complexos:</strong> A combinar</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Fatores que Afetam Prazos</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• <strong>Disponibilidade de materiais:</strong> Conteúdo, imagens, textos</li>
                    <li>• <strong>Complexidade do projeto:</strong> Funcionalidades especiais</li>
                    <li>• <strong>Revisões e feedback:</strong> Tempo de aprovação</li>
                    <li>• <strong>Integrações:</strong> APIs, sistemas externos</li>
                    <li>• <strong>Força maior:</strong> Eventos imprevistos</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Quality Standards */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-400" />
                7. Padrões de Qualidade e Garantias
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Garantias Oferecidas</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• <strong>Funcionamento correto:</strong> Conforme especificações acordadas</li>
                    <li>• <strong>Compatibilidade:</strong> Navegadores modernos e dispositivos</li>
                    <li>• <strong>Performance:</strong> Carregamento otimizado e responsivo</li>
                    <li>• <strong>SEO básico:</strong> Estrutura otimizada para motores de busca</li>
                    <li>• <strong>Código limpo:</strong> Documentado e bem estruturado</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Suporte Pós-Entrega</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• <strong>30 dias gratuitos:</strong> Correções de bugs e ajustes</li>
                    <li>• <strong>Suporte técnico:</strong> Orientação para uso e manutenção</li>
                    <li>• <strong>Documentação:</strong> Guias de uso e manutenção</li>
                    <li>• <strong>Treinamento:</strong> Orientação para administração do site</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Limitations */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                8. Limitações de Responsabilidade
              </h2>
              
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                <h3 className="text-red-400 font-medium mb-3">Exclusões de Responsabilidade</h3>
                <p className="text-white/70 mb-4 text-sm">
                  Nossa responsabilidade está limitada ao valor pago pelos serviços. 
                  Não nos responsabilizamos por:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• <strong>Danos indiretos:</strong> Perda de lucros, oportunidades de negócio</li>
                  <li>• <strong>Problemas de terceiros:</strong> Serviços de hospedagem, domínio, APIs</li>
                  <li>• <strong>Alterações não solicitadas:</strong> Modificações feitas pelo cliente</li>
                  <li>• <strong>Força maior:</strong> Eventos imprevistos e inevitáveis</li>
                  <li>• <strong>Uso inadequado:</strong> Implementação incorreta pelo cliente</li>
                </ul>
              </div>
            </section>

            {/* Confidentiality */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Confidencialidade</h2>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-3">Compromisso de Sigilo</h3>
                <p className="text-white/70 mb-4">
                  Comprometemo-nos a manter total confidencialidade sobre:
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• <strong>Informações comerciais:</strong> Estratégias, planos, dados financeiros</li>
                  <li>• <strong>Dados pessoais:</strong> Informações dos clientes e usuários</li>
                  <li>• <strong>Projetos em desenvolvimento:</strong> Detalhes técnicos e funcionais</li>
                  <li>• <strong>Propriedade intelectual:</strong> Ideias, conceitos, inovações</li>
                </ul>
                <p className="text-white/70 text-sm mt-4">
                  Este compromisso permanece válido mesmo após o término do contrato.
                </p>
              </div>
            </section>

            {/* Force Majeure */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">10. Força Maior</h2>
              <div className="bg-white/5 rounded-lg p-6">
                <p className="text-white/70 mb-4">
                  Eventos de força maior que podem afetar a prestação dos serviços:
                </p>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• <strong>Desastres naturais:</strong> Enchentes, terremotos, pandemias</li>
                  <li>• <strong>Falhas técnicas:</strong> Problemas em servidores, internet, energia</li>
                  <li>• <strong>Alterações legais:</strong> Mudanças na legislação que afetem o projeto</li>
                  <li>• <strong>Guerras e conflitos:</strong> Situações de instabilidade social</li>
                </ul>
                <p className="text-white/70 text-sm mt-4">
                  Em caso de força maior, os prazos serão automaticamente prorrogados 
                  pelo tempo necessário para superação do evento.
                </p>
              </div>
            </section>

            {/* Modifications */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">11. Alterações dos Termos</h2>
              <div className="bg-white/5 rounded-lg p-6">
                <p className="text-white/70 mb-4">
                  Reservamos o direito de modificar estes termos a qualquer momento. 
                  As alterações entrarão em vigor imediatamente após a publicação no site.
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• <strong>Notificação:</strong> Clientes ativos serão notificados por e-mail</li>
                  <li>• <strong>Versão atual:</strong> Sempre disponível neste link</li>
                  <li>• <strong>Data de vigência:</strong> Indicada no cabeçalho desta página</li>
                  <li>• <strong>Continuidade:</strong> Uso dos serviços implica aceitação das alterações</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Contato e Resolução de Conflitos</h2>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-3">Resolução de Disputas</h3>
                <p className="text-white/70 mb-4">
                  Para questões sobre estes Termos de Uso ou resolução de conflitos:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Contato Direto</h4>
                    <p className="text-white/70 text-sm">
                      <strong>E-mail:</strong> contato@yanmantovani.com<br/>
                      <strong>Telefone:</strong> +55 (16) 99999-9999<br/>
                      <strong>Endereço:</strong> Monte Alto, SP - Brasil
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Jurisdição</h4>
                    <p className="text-white/70 text-sm">
                      <strong>Foro:</strong> Comarca de Monte Alto, SP<br/>
                      <strong>Lei aplicável:</strong> Legislação brasileira<br/>
                      <strong>Idioma:</strong> Português brasileiro
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfUse;