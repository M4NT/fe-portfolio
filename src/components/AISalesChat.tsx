import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Brain } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { YanAiTracker } from '../lib/session-tracker';
import { geminiChat, GeminiMessage } from '../lib/gemini';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AISalesChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const trackerRef = useRef<YanAiTracker | null>(null);
  const proactiveTimerRef = useRef<number | null>(null);
  const greetedRef = useRef<boolean>(false);
  const startTimeRef = useRef<number>(performance.now());
  const lastHintAtRef = useRef<number>(0);
  const lastHintSectionRef = useRef<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Start session tracking and controlled proactive hints (throttled, humanized)
  useEffect(() => {
    trackerRef.current = new YanAiTracker();
    // Check once per second instead of rAF to reduce noise
    intervalRef.current = window.setInterval(() => {
      if (isOpen) return; // nunca incomodar quando o chat está aberto
      const now = performance.now();
      if (now - startTimeRef.current < 8000) return; // aguarda 8s antes do 1º hint
      if (now - lastHintAtRef.current < 45000) return; // cooldown de 45s entre hints

      const tracker = trackerRef.current!;
      const snap = tracker.getSnapshot();
      const section = snap.lastSectionId || 'home';
      if (!tracker.isUserHesitating()) return; // só sugere se houver hesitação
      if (section === lastHintSectionRef.current) return; // não repetir na mesma seção

      // mensagens mais humanas e variadas
      const humanTips: Record<string, string[]> = {
        home: [
          'Oi! 👋 Precisa de ajuda para navegar? Posso te mostrar meus destaques.',
          'Se quiser, eu te guio pelos trabalhos principais. Quer ver agora?'
        ],
        works: [
          'Curtiu algum projeto? Posso contar o impacto e a stack por trás dele.',
          'Quer um resumo rápido de um projeto específico? Só me dizer qual.'
        ],
        projects: [
          'Está explorando os experiments? Posso sugerir algo alinhado ao seu objetivo.',
          'Se quiser, explico como cada ferramenta/experimento pode ajudar seu caso.'
        ],
        services: [
          'Posso te dar uma faixa de preço de acordo com seu escopo. Quer tentar?',
          'Se me disser seu objetivo, eu estimo prazos e valores em 1 minuto.'
        ],
        about: [
          'Quer entender meu processo de trabalho? Posso explicar rapidinho 🙂',
          'Posso falar sobre etapas, prazos e como começamos. Te ajudo?'
        ],
        contact: [
          'Pronto pra começar? Posso montar uma mensagem inicial com seu objetivo.',
          'Quer que eu te ajude a descrever o projeto para agilizar o orçamento?'
        ],
      };

      const picks = humanTips[section] || humanTips.home;
      const content = picks[Math.floor(Math.random() * picks.length)];
      lastHintAtRef.current = now;
      lastHintSectionRef.current = section;

      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), content, sender: 'ai', timestamp: new Date() },
      ]);
    }, 1000) as unknown as number;
    return () => {
      if (proactiveTimerRef.current) window.clearTimeout(proactiveTimerRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      trackerRef.current?.destroy();
    };
  }, [isOpen]);

  // Greet when chat opens (once per session) and cancel any pending proactive timers
  useEffect(() => {
    if (isOpen) {
      if (proactiveTimerRef.current) {
        window.clearTimeout(proactiveTimerRef.current);
        proactiveTimerRef.current = null;
      }
      if (!greetedRef.current) {
        const section = trackerRef.current?.getSnapshot().lastSectionId || 'home';
        const greeting = {
          home: 'Opa, e ai! 👋 Sou o Yan.AI. Quer que eu te guie pelos destaques ou te ajude a estimar valores?',
          works: 'Opa! Vejo que está nos trabalhos selecionados. Quer saber o impacto/stack de algum projeto ou iniciar um projeto?',
          projects: 'E ai! Aqui estão experiments e ferramentas. Posso sugerir algo pro seu objetivo?',
          services: 'Opa! Quer um orçamento baseado no que precisa? Posso orientar agora 🙂',
          about: 'E ai! Posso explicar rapidamente meu processo, prazos e como começamos.',
          contact: 'Interessado? Podemos entrar em contato agora 🙂'
        } as Record<string, string>;
        setMessages(prev => [
          ...prev,
          { id: Date.now().toString(), content: greeting[section] || greeting.home, sender: 'ai', timestamp: new Date() },
        ]);
        greetedRef.current = true;
      }
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const snap = trackerRef.current?.getSnapshot();
      const systemPrompt = `You are YAN.AI, a portfolio concierge for a frontend developer & digital artist. Be concise, friendly, and helpful. You can answer about services, pricing ranges, process, timelines, and how to start. If the user asks for prices, provide the ranges that were described in the site and suggest next steps. Summarize when long. Context: lastSection=${snap?.lastSectionId || 'home'}, sessionId=${snap?.sessionId || 'n/a'}.`;

      const history: GeminiMessage[] = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', content: m.content })),
        { role: 'user', content: inputValue },
      ];

      const reply = await geminiChat(history);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: reply,
        sender: 'ai',
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: 'Desculpe, ocorreu um erro com a IA agora. Tente novamente em instantes.',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed z-[60] rounded-full flex items-center justify-center shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 bottom-5 right-5 md:w-14 md:h-14 md:bottom-8 md:right-8"
        style={{
          right: 'max(1.0rem, env(safe-area-inset-right))',
          bottom: 'max(1.0rem, env(safe-area-inset-bottom))',
        }}
        whileHover={{ scale: 1.1 }}
      >
        <MessageCircle className="text-white" size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            
            <motion.div
              className="relative w-full max-w-md h-[70vh] md:h-[600px] bg-black/90 rounded-2xl border border-white/20 overflow-hidden flex flex-col"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Brain className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Yan.AI</h3>
                    <p className="text-sm text-white/60">Assistente</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="text-white" size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-2xl px-4 py-2">
                      <div className="flex gap-2">
                        <motion.div className="w-2 h-2 bg-white/60 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} />
                        <motion.div className="w-2 h-2 bg-white/60 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                        <motion.div className="w-2 h-2 bg-white/60 rounded-full" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="border-t border-white/10">
                <div className="p-2 bg-black/30">
                  <div className="flex gap-2 overflow-x-auto px-2">
                    {['Tell me more', 'Services', 'Pricing', 'Contact'].map((action) => (
                      <button
                        key={action}
                        onClick={() => setInputValue(action)}
                        className="px-3 py-1 text-sm text-white/80 bg-white/5 hover:bg-white/10 rounded-full whitespace-nowrap"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 bg-black/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/10 text-white placeholder-white/40 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center disabled:opacity-50"
                  >
                    <Send className="text-white" size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AISalesChat;
