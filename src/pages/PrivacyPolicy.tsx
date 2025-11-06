import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, FileText, AlertTriangle, CheckCircle, Clock, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Política de Privacidade</h1>
              <p className="text-white/60">Conforme Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018</p>
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
            
            {/* LGPD Compliance Notice */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-green-400 font-semibold text-lg">Conformidade com a LGPD</h3>
              </div>
              <p className="text-white/70 text-sm">
                Esta política está em total conformidade com a Lei Geral de Proteção de Dados (LGPD) 
                e garante a proteção dos dados pessoais dos usuários, bem como os direitos do 
                controlador (Yan Mantovani) conforme estabelecido na legislação brasileira.
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-blue-400" />
                1. Introdução e Base Legal
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Esta Política de Privacidade descreve como Yan Mantovani, pessoa física, 
                inscrito no CPF sob nº [CPF], atuando como desenvolvedor frontend freelancer, 
                coleta, usa, armazena e protege suas informações pessoais quando você utiliza 
                nosso site e serviços.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong>Base Legal para Tratamento (Art. 7º da LGPD):</strong>
              </p>
              <ul className="text-white/70 space-y-2 ml-4">
                <li>• <strong>Consentimento:</strong> Para comunicações promocionais e newsletter</li>
                <li>• <strong>Execução de Contrato:</strong> Para prestação de serviços contratados</li>
                <li>• <strong>Legítimo Interesse:</strong> Para análise de tráfego e melhoria do site</li>
                <li>• <strong>Obrigação Legal:</strong> Para cumprimento de obrigações fiscais e trabalhistas</li>
              </ul>
            </section>

            {/* Data Controller Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-green-400" />
                2. Controlador dos Dados
              </h2>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-3">Identificação do Controlador</h3>
                <div className="grid md:grid-cols-2 gap-4 text-white/70">
                  <div>
                    <p><strong>Nome:</strong> Yan Mantovani</p>
                    <p><strong>CPF:</strong> [CPF]</p>
                    <p><strong>Profissão:</strong> Desenvolvedor Frontend Freelancer</p>
                  </div>
                  <div>
                    <p><strong>E-mail:</strong> contato@yanmantovani.com</p>
                    <p><strong>Telefone:</strong> +55 (16) 99999-9999</p>
                    <p><strong>Localização:</strong> Monte Alto, SP - Brasil</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Information Collection */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-green-400" />
                3. Dados Pessoais Coletados
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Dados de Identificação</h3>
                  <ul className="text-white/70 space-y-2">
                    <li>• Nome completo (obrigatório para contratos)</li>
                    <li>• CPF ou CNPJ (para faturamento e obrigações fiscais)</li>
                    <li>• Endereço completo (para emissão de notas fiscais)</li>
                    <li>• Data de nascimento (quando necessário para verificação de idade)</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Dados de Contato</h3>
                  <ul className="text-white/70 space-y-2">
                    <li>• Endereço de e-mail (obrigatório para comunicação)</li>
                    <li>• Número de telefone/WhatsApp (para comunicação direta)</li>
                    <li>• Perfis em redes sociais (quando fornecidos voluntariamente)</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Dados Técnicos e de Navegação</h3>
                  <ul className="text-white/70 space-y-2">
                    <li>• Endereço IP e localização aproximada</li>
                    <li>• Tipo e versão do navegador</li>
                    <li>• Sistema operacional utilizado</li>
                    <li>• Páginas visitadas e tempo de permanência</li>
                    <li>• Cookies e tecnologias similares</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Dados Comerciais</h3>
                  <ul className="text-white/70 space-y-2">
                    <li>• Histórico de projetos e serviços contratados</li>
                    <li>• Preferências de comunicação</li>
                    <li>• Feedback e avaliações sobre serviços</li>
                    <li>• Informações de pagamento (processadas por terceiros seguros)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-purple-400" />
                4. Finalidades do Tratamento
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Finalidades Principais</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• Prestação de serviços de desenvolvimento</li>
                    <li>• Comunicação sobre projetos e prazos</li>
                    <li>• Emissão de notas fiscais e documentos fiscais</li>
                    <li>• Suporte técnico e atendimento ao cliente</li>
                    <li>• Cumprimento de obrigações contratuais</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Finalidades Secundárias</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• Análise de tráfego e comportamento no site</li>
                    <li>• Melhoria da experiência do usuário</li>
                    <li>• Marketing direto (com consentimento)</li>
                    <li>• Desenvolvimento de novos produtos/serviços</li>
                    <li>• Segurança e prevenção de fraudes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-red-400" />
                5. Medidas de Segurança e Proteção
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Implementamos medidas técnicas e organizacionais para proteger seus dados pessoais 
                contra acesso não autorizado, alteração, divulgação ou destruição, conforme 
                Art. 46 da LGPD.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Medidas Técnicas</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• Criptografia SSL/TLS para transmissão de dados</li>
                    <li>• Senhas seguras e autenticação de dois fatores</li>
                    <li>• Backup seguro e criptografado</li>
                    <li>• Antivírus e firewall atualizados</li>
                    <li>• Atualizações regulares de segurança</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">Medidas Organizacionais</h3>
                  <ul className="text-white/70 space-y-2 text-sm">
                    <li>• Acesso restrito a dados pessoais</li>
                    <li>• Treinamento em proteção de dados</li>
                    <li>• Políticas internas de segurança</li>
                    <li>• Monitoramento de acessos</li>
                    <li>• Contratos de confidencialidade</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Globe className="w-6 h-6 text-cyan-400" />
                6. Compartilhamento de Dados
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Seus dados pessoais podem ser compartilhados apenas nas seguintes situações:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Prestadores de Serviços</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• Processadores de pagamento (PagSeguro, PayPal)</li>
                    <li>• Serviços de hospedagem (Vercel, Netlify)</li>
                    <li>• Ferramentas de análise (Google Analytics)</li>
                    <li>• Serviços de e-mail (Gmail, Outlook)</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Autoridades Competentes</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• Receita Federal (obrigações fiscais)</li>
                    <li>• Justiça do Trabalho (quando aplicável)</li>
                    <li>• Autoridade Nacional de Proteção de Dados (ANPD)</li>
                    <li>• Outros órgãos quando exigido por lei</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* User Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. Seus Direitos (Art. 18 da LGPD)</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Você tem os seguintes direitos em relação aos seus dados pessoais:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Direitos Fundamentais</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• <strong>Confirmação:</strong> Saber se seus dados são tratados</li>
                    <li>• <strong>Acesso:</strong> Obter cópia dos seus dados</li>
                    <li>• <strong>Correção:</strong> Corrigir dados incorretos</li>
                    <li>• <strong>Anonimização:</strong> Tornar dados anônimos</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Direitos de Controle</h3>
                  <ul className="text-white/70 space-y-1 text-sm">
                    <li>• <strong>Eliminação:</strong> Excluir dados desnecessários</li>
                    <li>• <strong>Portabilidade:</strong> Transferir dados para outro controlador</li>
                    <li>• <strong>Informação:</strong> Saber com quem dados são compartilhados</li>
                    <li>• <strong>Revogação:</strong> Retirar consentimento a qualquer momento</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-yellow-400" />
                8. Prazo de Retenção de Dados
              </h2>
              <div className="bg-white/5 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-medium mb-3">Dados Contratuais</h3>
                    <ul className="text-white/70 space-y-1 text-sm">
                      <li>• <strong>5 anos:</strong> Dados de contratos e projetos</li>
                      <li>• <strong>5 anos:</strong> Documentos fiscais e contábeis</li>
                      <li>• <strong>3 anos:</strong> Comunicações comerciais</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-3">Dados de Navegação</h3>
                    <ul className="text-white/70 space-y-1 text-sm">
                      <li>• <strong>2 anos:</strong> Logs de acesso e navegação</li>
                      <li>• <strong>1 ano:</strong> Cookies analíticos</li>
                      <li>• <strong>Imediato:</strong> Dados de sessão (ao fechar navegador)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* International Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Transferência Internacional</h2>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  <h3 className="text-yellow-400 font-medium">Transferências Limitadas</h3>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  Alguns dados podem ser transferidos para países estrangeiros apenas para:
                </p>
                <ul className="text-white/70 space-y-1 text-sm ml-4">
                  <li>• Hospedagem de sites (Vercel - EUA)</li>
                  <li>• Análise de tráfego (Google Analytics - EUA)</li>
                  <li>• Processamento de pagamentos (PayPal - EUA)</li>
                </ul>
                <p className="text-white/70 text-sm mt-3">
                  Todas as transferências são feitas com garantias adequadas de proteção 
                  conforme Art. 33 da LGPD.
                </p>
              </div>
            </section>

            {/* Contact and DPO */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">10. Contato e Exercício de Direitos</h2>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-white font-medium mb-3">Como Exercer Seus Direitos</h3>
                <p className="text-white/70 mb-4">
                  Para exercer qualquer um dos seus direitos ou esclarecer dúvidas sobre 
                  esta política, entre em contato:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-medium mb-2">Contato Principal</h4>
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

            {/* Updates */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">11. Alterações nesta Política</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Esta Política de Privacidade pode ser atualizada periodicamente para refletir 
                mudanças em nossas práticas, serviços ou requisitos legais.
              </p>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Notificação de Alterações</h3>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>• Alterações significativas serão comunicadas por e-mail</li>
                  <li>• Versão atual sempre disponível neste link</li>
                  <li>• Data da última atualização no cabeçalho desta página</li>
                  <li>• Uso continuado do site implica aceitação das alterações</li>
                </ul>
              </div>
            </section>

            {/* Legal Framework */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Marco Legal</h2>
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-white font-medium mb-3">Legislação Aplicável</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>• <strong>Lei Geral de Proteção de Dados (LGPD):</strong> Lei nº 13.709/2018</li>
                  <li>• <strong>Marco Civil da Internet:</strong> Lei nº 12.965/2014</li>
                  <li>• <strong>Código de Defesa do Consumidor:</strong> Lei nº 8.078/1990</li>
                  <li>• <strong>Constituição Federal:</strong> Art. 5º, inciso X (direito à privacidade)</li>
                </ul>
                <p className="text-white/70 text-sm mt-4">
                  Esta política está em conformidade com a Autoridade Nacional de Proteção de Dados (ANPD) 
                  e demais órgãos competentes.
                </p>
              </div>
            </section>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;