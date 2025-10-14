import React, { useEffect, useState } from "react";

const Preloader: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => setAnimationComplete(true), 1000);
      return () => clearTimeout(timer);
    }
    setAnimationComplete(false);
  }, [visible]);

  if (!visible && animationComplete) return null;

  return (
    <div className={`fixed inset-0 w-screen h-screen bg-black z-[9999] flex items-center justify-center ${
      !visible ? "opacity-0" : "opacity-100"
    } transition-opacity duration-700`}>
      {/* Grid de fundo animado */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className={`absolute inset-0 bg-[linear-gradient(transparent_1px,_transparent_1px),_linear-gradient(90deg,_transparent_1px,_transparent_1px)] bg-[size:40px_40px] [background-position:center] ${
          visible ? 'animate-gridMove' : ''
        }`} style={{ backgroundColor: 'transparent', backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)' }} />
      </div>

      {/* Círculos de fundo com glow */}
      <div className={`absolute inset-0 overflow-hidden ${visible ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="absolute w-[45vw] h-[45vw] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 
          -top-[20%] -left-[10%] blur-[100px] animate-pulseGlow" />
        <div className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 
          -bottom-[10%] -right-[15%] blur-[100px] animate-pulseGlow2" />
      </div>

      {/* Container central */}
      <div className="relative flex flex-col items-center">
        {/* Container do logo com efeitos */}
        <div className={`relative group ${visible ? 'animate-fadeInScale' : ''}`}>
          {/* Círculo de progresso */}
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md
            animate-spin-slow opacity-75" />
          
          {/* Container principal */}
          <div className="relative p-12 rounded-2xl backdrop-blur-sm bg-black/50 border border-white/10
            shadow-[0_0_25px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Efeito de scanner */}
            <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent translate-y-[-200%]
              ${visible ? 'animate-scanline' : ''}`} />
            
            {/* Logo principal */}
            <div className="font-inter text-6xl font-light tracking-[0.2em] relative">
              <div className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80
                hover:from-blue-400 hover:via-purple-400 hover:to-blue-400 transition-all duration-300">
                YAN.M
              </div>
              
              {/* Linha animada abaixo do logo */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
                  ${visible ? 'animate-shimmer' : ''}`}
                  style={{
                    transformOrigin: 'center center'
                  }}
                />
              </div>
            </div>

            {/* Indicador de progresso circular */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-full px-2">
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-black/30">
                <div 
                  className={`h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full
                    ${visible ? 'animate-progressBar' : ''}`}
                  style={{
                    transformOrigin: 'left center',
                    width: '100%'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Texto de carregamento com animações */}
        <div className={`mt-12 flex flex-col items-center gap-3 ${visible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <div className="text-white/60 text-sm tracking-[0.3em] uppercase flex items-center">
            <span className="font-light">Iniciando</span>
            <span className="inline-flex ml-2">
              <span className={`transition-opacity duration-300 ${visible ? 'animate-dot1' : 'opacity-0'}`}>.</span>
              <span className={`transition-opacity duration-300 ${visible ? 'animate-dot2' : 'opacity-0'}`}>.</span>
              <span className={`transition-opacity duration-300 ${visible ? 'animate-dot3' : 'opacity-0'}`}>.</span>
            </span>
          </div>
          
          {/* Mensagens de status rotativas */}
          <div className="h-5 overflow-hidden">
            <div className={`text-white/30 text-xs tracking-wider text-center transition-transform
              ${visible ? 'animate-statusMessages' : ''}`}>
              <div className="py-1">Carregando assets</div>
              <div className="py-1">Preparando interface</div>
              <div className="py-1">Iniciando sistemas</div>
              <div className="py-1">Quase pronto</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
