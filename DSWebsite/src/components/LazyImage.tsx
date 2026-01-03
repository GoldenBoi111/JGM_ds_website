import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string; // Optional low-quality placeholder
  width?: number;
  height?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  width,
  height
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Set a timeout to ensure the image loads even if intersection observer doesn't trigger
    const timeoutId = setTimeout(() => {
      setIsInView(true);
    }, 100); // Small delay to allow for intersection observer to work first

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          clearTimeout(timeoutId); // Clear timeout if intersection observer triggers
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' } // Increase root margin to trigger earlier
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Show skeleton loader while not in view */}
      {!isInView && (
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full animate-pulse" />
      )}

      {/* Show image when in view */}
      {isInView && (
        <div className="relative w-full h-full">
          {/* Placeholder image while main image is loading */}
          {placeholder && !isLoaded && (
            <img
              src={placeholder}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
          )}

          {/* Fallback skeleton while image is loading and no placeholder */}
          {!isLoaded && !placeholder && (
            <div className="absolute inset-0 bg-gray-200 border-2 border-dashed rounded-xl w-full h-full animate-pulse" />
          )}

          {/* Main image - only show when loaded */}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
            onLoad={() => setIsLoaded(true)}
            style={{ transition: 'opacity 0.3s ease-in-out' }}
          />
        </div>
      )}
    </div>
  );
};

export default LazyImage;