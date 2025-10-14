import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const { src, alt, style, className, width, height, ...rest } = props

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
    <>
      {/* Skeleton placeholder para prevenir CLS */}
      {!isLoaded && (
        <div 
          className={`absolute inset-0 bg-gray-900 loading-skeleton ${className ?? ''}`}
          style={{
            ...style,
            aspectRatio: width && height ? `${width}/${height}` : '16/9'
          }}
        />
      )}
      <img 
        src={src} 
        alt={alt} 
        className={className} 
        style={style} 
        width={width} 
        height={height}
        loading="lazy"
        decoding="async"
        {...rest} 
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  )
}
