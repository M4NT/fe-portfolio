import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Settings, Eye, Shield, Database, Clock, AlertTriangle, CheckCircle, Globe, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-red-900/20 to-pink-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Política de Cookies</h1>
              <p className="text-white/60">Conforme Lei Geral de Proteção de Dados (LGPD) e Marco Civil da Internet</p>
              <p className="text-white/50 text-sm">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
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
            
            {/* LGPD Compliance Notice */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-green-400 font-semibold text-lg">Conformidade com a LGPD</h3>
              </div>
              <p className="text-white/70 text-sm">
                Esta política está em total conformidade com a Lei Geral de Proteção de Dados (LGPD) 
                e o Marco Civil da Internet, garantindo transparência sobre o uso de cookies e 
                tecnologias similares em nosso site.
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Cookie className="w-6 h-6 text-orange-400" />
                1. O que são Cookies?
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando 
                você visita nosso site. Eles nos ajudam a melhorar sua experiência, 
                analisar o tráfego e personalizar conteúdo, sempre respeitando sua privacidade 
                conforme a LGPD.
              </p>
              <p className="text-white/70 leading-relaxed">
                Esta política explica como usamos cookies, quais dados coletamos e como você 
                pode controlá-los, garantindo total transparência conforme exigido pela legislação brasileira.
              </p>
            </section>

            {/* Legal Framework */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-400" />
                2. Base Legal para Uso de Cookies
              </h2>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-3">Fundamentação Legal</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• <strong>Art. 7º da LGPD:</strong> Consentimento para cookies não essenciais</li>
                  <li>• <strong>Art. 8º da LGPD:</strong> Consentimento livre, informado e inequívoco</li>
                  <li>• <strong>Marco Civil da Internet:</strong> Lei nº 12.965/2014</li>
                  <li>• <strong>Resolução ANPD:</strong> Orientações sobre cookies e tecnologias similares</li>
                </ul>
                <p className="text-white/70 text-sm mt-4">
                  Utilizamos cookies essenciais com base no legítimo interesse (Art. 7º, IX da LGPD) 
                  e cookies não essenciais apenas com seu consentimento expresso.
                </p>
              </div>
            </section>

            {/* Types of Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Settings className="w-6 h-6 text-blue-400" />
                3. Tipos de Cookies Utilizados
              </h2>
              
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Cookies Essenciais (Obrigatórios)
                  </h3>
                  <p className="text-white/70 mb-4">
                    Necessários para o funcionamento básico do site. Não podem ser desativados 
                    conforme Art. 7º, IX da LGPD (legítimo interesse).
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Finalidades</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Autenticação de usuário</li>
                        <li>• Preferências de idioma</li>
                        <li>• Segurança e prevenção de fraudes</li>
                        <li>• Funcionalidades básicas do site</li>
                        <li>• Carregamento de páginas</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Dados Coletados</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Sessão do usuário</li>
                        <li>• Preferências de navegação</li>
                        <li>• Configurações de segurança</li>
                        <li>• Estado da aplicação</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-400" />
                    Cookies Analíticos (Com Consentimento)
                  </h3>
                  <p className="text-white/70 mb-4">
                    Nos ajudam a entender como você usa o site para melhorar a experiência. 
                    Requerem consentimento expresso conforme Art. 8º da LGPD.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Finalidades</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Análise de tráfego e comportamento</li>
                        <li>• Páginas mais visitadas</li>
                        <li>• Tempo de permanência</li>
                        <li>• Origem do tráfego</li>
                        <li>• Taxa de conversão</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Ferramentas Utilizadas</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Google Analytics</li>
                        <li>• Google Tag Manager</li>
                        <li>• Hotjar (quando aplicável)</li>
                        <li>• Facebook Pixel (quando aplicável)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5 text-cyan-400" />
                    Cookies Funcionais (Com Consentimento)
                  </h3>
                  <p className="text-white/70 mb-4">
                    Melhoram a funcionalidade e personalização do site. Requerem consentimento 
                    para coleta de dados pessoais.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Finalidades</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Preferências de tema (claro/escuro)</li>
                        <li>• Configurações de acessibilidade</li>
                        <li>• Lembrar preferências de formulário</li>
                        <li>• Personalização de conteúdo</li>
                        <li>• Idioma preferido</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Dados Armazenados</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Configurações do usuário</li>
                        <li>• Preferências de interface</li>
                        <li>• Histórico de navegação</li>
                        <li>• Dados de formulários</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-pink-400" />
                    Cookies de Marketing (Com Consentimento)
                  </h3>
                  <p className="text-white/70 mb-4">
                    Utilizados para personalizar anúncios e conteúdo. Requerem consentimento 
                    expresso e podem ser revogados a qualquer momento.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Finalidades</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Personalização de anúncios</li>
                        <li>• Remarketing</li>
                        <li>• Análise de campanhas</li>
                        <li>• Segmentação de audiência</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Controle</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Consentimento específico</li>
                        <li>• Revogação a qualquer momento</li>
                        <li>• Opt-out disponível</li>
                        <li>• Transparência total</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookie Duration */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-yellow-400" />
                4. Duração e Retenção de Cookies
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Cookies de Sessão</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• <strong>Duração:</strong> Temporários, excluídos ao fechar o navegador</li>
                    <li>• <strong>Finalidade:</strong> Funcionamento básico do site</li>
                    <li>• <strong>Dados:</strong> Sessão do usuário, preferências temporárias</li>
                    <li>• <strong>Base Legal:</strong> Legítimo interesse (Art. 7º, IX LGPD)</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Cookies Persistentes</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• <strong>Duração:</strong> 30 dias a 2 anos (conforme tipo)</li>
                    <li>• <strong>Finalidade:</strong> Análise, personalização, marketing</li>
                    <li>• <strong>Dados:</strong> Preferências, histórico, identificação</li>
                    <li>• <strong>Base Legal:</strong> Consentimento (Art. 7º, I LGPD)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Third Party Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies de Terceiros</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Alguns cookies são definidos por serviços de terceiros que aparecem em nossas páginas. 
                Cada serviço possui sua própria política de privacidade e cookies.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Google Analytics</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Finalidade</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Análise de tráfego</li>
                        <li>• Comportamento dos usuários</li>
                        <li>• Métricas de performance</li>
                        <li>• Relatórios de uso</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Controle</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-400 hover:text-blue-300">Opt-out Google Analytics</a></li>
                        <li>• Configurações do navegador</li>
                        <li>• Extensões de privacidade</li>
                        <li>• Modo incógnito</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Redes Sociais</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Serviços</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Botões de compartilhamento</li>
                        <li>• Widgets de redes sociais</li>
                        <li>• Integração com APIs</li>
                        <li>• Botões de "curtir"</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Políticas</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• <a href="https://www.facebook.com/privacy/explanation" className="text-blue-400 hover:text-blue-300">Facebook Privacy</a></li>
                        <li>• <a href="https://twitter.com/privacy" className="text-blue-400 hover:text-blue-300">Twitter Privacy</a></li>
                        <li>• <a href="https://www.linkedin.com/legal/privacy-policy" className="text-blue-400 hover:text-blue-300">LinkedIn Privacy</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Como Gerenciar Cookies</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Você tem total controle sobre os cookies. Aqui estão as opções disponíveis:
              </p>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Configurações do Navegador</h3>
                  <p className="text-white/70 text-sm mb-3">
                    A maioria dos navegadores permite controlar cookies através das configurações:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Navegadores Populares</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• <strong>Chrome:</strong> Configurações &gt; Privacidade e segurança &gt; Cookies</li>
                        <li>• <strong>Firefox:</strong> Opções &gt; Privacidade e segurança &gt; Cookies</li>
                        <li>• <strong>Safari:</strong> Preferências &gt; Privacidade &gt; Cookies</li>
                        <li>• <strong>Edge:</strong> Configurações &gt; Cookies e permissões do site</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Ferramentas Avançadas</h4>
                      <ul className="text-white/70 space-y-1 text-sm">
                        <li>• Extensões de privacidade</li>
                        <li>• Bloqueadores de anúncios</li>
                        <li>• Modo incógnito/privado</li>
                        <li>• VPN e proxy</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-yellow-400 font-medium">⚠️ Importante</h3>
                  </div>
                  <p className="text-white/70 text-sm mb-3">
                    Desabilitar cookies essenciais pode afetar o funcionamento do site. 
                    Algumas funcionalidades podem não estar disponíveis.
                  </p>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• <strong>Cookies essenciais:</strong> Necessários para funcionamento básico</li>
                    <li>• <strong>Cookies opcionais:</strong> Podem ser desabilitados sem impacto</li>
                    <li>• <strong>Configuração granular:</strong> Controle por tipo de cookie</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Seus Direitos (Art. 18 da LGPD)</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Em relação aos dados coletados através de cookies, você tem os seguintes direitos:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Direitos Fundamentais</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• <strong>Confirmação:</strong> Saber se seus dados são tratados</li>
                    <li>• <strong>Acesso:</strong> Obter informações sobre o tratamento</li>
                    <li>• <strong>Correção:</strong> Corrigir dados incorretos</li>
                    <li>• <strong>Anonimização:</strong> Tornar dados anônimos</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Direitos de Controle</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• <strong>Eliminação:</strong> Excluir dados desnecessários</li>
                    <li>• <strong>Portabilidade:</strong> Transferir dados</li>
                    <li>• <strong>Revogação:</strong> Retirar consentimento</li>
                    <li>• <strong>Informação:</strong> Saber com quem dados são compartilhados</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-red-400" />
                8. Proteção e Segurança dos Dados
              </h2>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-3">Medidas de Segurança</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Medidas Técnicas</h4>
                    <ul className="text-white/70 space-y-1 text-sm">
                      <li>• Criptografia de dados em trânsito</li>
                      <li>• Armazenamento seguro</li>
                      <li>• Acesso restrito e controlado</li>
                      <li>• Monitoramento de segurança</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Medidas Organizacionais</h4>
                    <ul className="text-white/70 space-y-1 text-sm">
                      <li>• Políticas de privacidade</li>
                      <li>• Treinamento em proteção de dados</li>
                      <li>• Contratos com terceiros</li>
                      <li>• Auditorias regulares</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Atualizações desta Política</h2>
              <div className="bg-white/5 rounded-lg p-6">
                <p className="text-white/70 mb-4">
                  Podemos atualizar esta Política de Cookies periodicamente para refletir 
                  mudanças em nossas práticas, serviços ou requisitos legais.
                </p>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• <strong>Notificação:</strong> Alterações significativas serão comunicadas</li>
                  <li>• <strong>Versão atual:</strong> Sempre disponível neste link</li>
                  <li>• <strong>Data:</strong> Última atualização no cabeçalho</li>
                  <li>• <strong>Consentimento:</strong> Pode ser necessário novo consentimento</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Contato e Exercício de Direitos</h2>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-3">Como Exercer Seus Direitos</h3>
                <p className="text-white/70 mb-4">
                  Para questões sobre nossa Política de Cookies ou exercer seus direitos:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Contato</h4>
                    <p className="text-white/70 text-sm">
                      <strong>E-mail:</strong> contato@yanmantovani.com<br/>
                      <strong>Telefone:</strong> +55 (16) 99999-9999<br/>
                      <strong>Endereço:</strong> Monte Alto, SP - Brasil
                    </p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Prazo de Resposta</h4>
                    <p className="text-white/70 text-sm">
                      Resposta em até <strong>15 dias úteis</strong> conforme Art. 19 da LGPD.<br/>
                      Em casos complexos, prazo pode ser estendido por mais 15 dias.
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

export default CookiePolicy;