import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { trackFormStart, trackFormSubmit, trackFormError } from '../lib/analytics';

// Schema de validação com Zod
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo'),
  email: z.string()
    .email('Email inválido')
    .min(5, 'Email muito curto'),
  subject: z.string()
    .min(5, 'Assunto deve ter pelo menos 5 caracteres')
    .max(200, 'Assunto muito longo'),
  message: z.string()
    .min(20, 'Mensagem deve ter pelo menos 20 caracteres')
    .max(2000, 'Mensagem muito longa')
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading');
    setErrorMessage('');
    
    // Track form start
    trackFormStart('contact');

    try {
      // CONFIGURAÇÃO ATUAL: Formspree (temporário até configurar Hostinger)
      // FUTURO: Trocar para '/api/send-email.php' quando configurar domínio
      
      const USE_PHP_BACKEND = false; // Mude para true quando configurar Hostinger
      
      const API_ENDPOINT = USE_PHP_BACKEND 
        ? '/api/send-email.php'  // Backend PHP (Hostinger)
        : 'https://formspree.io/f/hi@yanmantovani.com'; // Formspree (temporário)
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          _replyto: data.email, // Formspree usa isso para reply-to
          _subject: `Novo contato: ${data.subject}` // Assunto do email
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Erro ao enviar mensagem');
      }

      setSubmitStatus('success');
      
      // Track successful submission
      trackFormSubmit('contact', true);
      
      reset();
      onSuccess?.();

      // Reseta o status após 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
      
      // Track form error
      trackFormError('contact', error instanceof Error ? error.message : 'unknown');
      
      // Mensagem de erro mais amigável
      if (error instanceof Error && error.message.includes('fetch')) {
        setErrorMessage('Erro de conexão. Verifique sua internet e tente novamente.');
      } else {
        setErrorMessage('Erro ao enviar mensagem. Entre em contato diretamente: hello@yan-m.dev');
      }
      
      // Reseta o status de erro após 7 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 7000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nome */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-white/80 text-sm font-medium">
          Nome Completo *
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            <User size={18} />
          </div>
          <input
            {...register('name')}
            id="name"
            type="text"
            placeholder="Seu nome"
            className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
              errors.name ? 'border-red-500/50' : 'border-white/10'
            } rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all`}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </div>
        <AnimatePresence>
          {errors.name && (
            <motion.p
              id="name-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm flex items-center gap-1"
              role="alert"
            >
              <AlertCircle size={14} />
              {errors.name.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-white/80 text-sm font-medium">
          Email *
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
            <Mail size={18} />
          </div>
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder="seu@email.com"
            className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
              errors.email ? 'border-red-500/50' : 'border-white/10'
            } rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all`}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.p
              id="email-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm flex items-center gap-1"
              role="alert"
            >
              <AlertCircle size={14} />
              {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Assunto */}
      <div className="space-y-2">
        <label htmlFor="subject" className="block text-white/80 text-sm font-medium">
          Assunto *
        </label>
        <input
          {...register('subject')}
          id="subject"
          type="text"
          placeholder="Sobre o que você quer falar?"
          className={`w-full px-4 py-3 bg-white/5 border ${
            errors.subject ? 'border-red-500/50' : 'border-white/10'
          } rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all`}
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        <AnimatePresence>
          {errors.subject && (
            <motion.p
              id="subject-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm flex items-center gap-1"
              role="alert"
            >
              <AlertCircle size={14} />
              {errors.subject.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Mensagem */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-white/80 text-sm font-medium">
          Mensagem *
        </label>
        <div className="relative">
          <div className="absolute left-4 top-4 text-white/40">
            <MessageSquare size={18} />
          </div>
          <textarea
            {...register('message')}
            id="message"
            rows={6}
            placeholder="Conte-me mais sobre seu projeto..."
            className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
              errors.message ? 'border-red-500/50' : 'border-white/10'
            } rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none`}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
        </div>
        <AnimatePresence>
          {errors.message && (
            <motion.p
              id="message-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm flex items-center gap-1"
              role="alert"
            >
              <AlertCircle size={14} />
              {errors.message.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || submitStatus === 'success'}
        className={`w-full py-4 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all duration-300 ${
          submitStatus === 'success'
            ? 'bg-green-600 hover:bg-green-700'
            : submitStatus === 'error'
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl`}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        <AnimatePresence mode="wait">
          {submitStatus === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Enviando...</span>
            </motion.div>
          )}
          {submitStatus === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Mensagem Enviada!</span>
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Erro ao Enviar</span>
            </motion.div>
          )}
          {submitStatus === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span>Enviar Mensagem</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Error Message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
            role="alert"
          >
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm"
            role="status"
          >
            ✨ Obrigado! Sua mensagem foi enviada com sucesso. Responderei em breve!
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ContactForm;

