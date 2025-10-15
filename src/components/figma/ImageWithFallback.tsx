import React, { useState, useEffect } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

// Blur placeholder SVG - 20x20px base64
const BLUR_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWExYTFhO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMmEyYTJhO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+'

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const { src, alt, style, className, width, height, fetchpriority, ...rest } = props

  // IntersectionObserver para lazy loading avançado
  useEffect(() => {
    const imgElement = document.querySelector(`img[data-src="${src}"]`) as HTMLElement
    if (!imgElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px', // Começa a carregar 50px antes de entrar na viewport
        threshold: 0.01
      }
    )

    observer.observe(imgElement)

    return () => {
      if (imgElement) observer.unobserve(imgElement)
    }
  }, [src])

  return didError ? (
    <div
      className={`inline-block bg-gray-900 text-center align-middle ${className ?? ''}`}
      style={{
        ...style,
        aspectRatio: width && height ? `${width}/${height}` : '16/9'
      }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <div className="relative" style={{ aspectRatio: width && height ? `${width}/${height}` : '16/9' }}>
      {/* Blur placeholder - carrega instantaneamente */}
      {!isLoaded && (
        <img
          src={BLUR_PLACEHOLDER}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover ${className ?? ''}`}
          style={{
            ...style,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            transition: 'opacity 0.3s ease-out'
          }}
        />
      )}
      
      {/* Skeleton overlay com animação */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 loading-skeleton"
          style={{
            opacity: 0.6,
            mixBlendMode: 'multiply'
          }}
        />
      )}
      
      {/* Imagem principal */}
      <img 
        data-src={src}
        src={isInView || fetchpriority === 'high' ? src : BLUR_PLACEHOLDER}
        alt={alt || ''} 
        className={`${className ?? ''} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          ...style,
          transition: 'opacity 0.5s ease-out',
          willChange: isLoaded ? 'auto' : 'opacity'
        }}
        width={width} 
        height={height}
        loading={fetchpriority === 'high' ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={fetchpriority as any}
        {...rest} 
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}
