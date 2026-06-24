// Copyright (C) 2025 Anuj
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

"use client";
import { useEffect, useState } from "react";

interface ParallaxHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  height?: string;
  overlayOpacity?: number;
  textSize?: string;
  /** Besley serif on the title; set false to match hackbox services hero (Author). */
  serifTitle?: boolean;
}

export default function ParallaxHero({ 
  title, 
  subtitle,
  backgroundImage, 
  height = "h-120",
  overlayOpacity = 0.5,
  textSize = "text-7xl",
  serifTitle = true,
}: ParallaxHeroProps) {
  const [offsetY, setOffsetY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${height} relative overflow-hidden`}>
      <div 
        className="absolute inset-0 bg-cover bg-top will-change-transform"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          transform: `translateY(${offsetY * 0.5}px) scale(1.1)`,
        }}
      />
      <img 
        src={backgroundImage}
        alt=""
        className="hidden"
        onLoad={() => setIsLoaded(true)}
        onError={() => console.error('Failed to load background image:', backgroundImage)}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/70 z-10"
        style={{ opacity: overlayOpacity }}
      />
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center text-white animate-fade-in-up">
          <h1
            className={`${textSize} font-medium tracking-wide mb-4 drop-shadow-2xl ${serifTitle ? "font-besley" : "font-sans"}`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl font-light tracking-wider opacity-90 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}