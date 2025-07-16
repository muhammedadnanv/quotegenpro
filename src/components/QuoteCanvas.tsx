
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface QuoteCanvasProps {
  profileData: {
    name: string;
    image: string;
    title?: string;
  };
  templateId: string;
  quoteText: string;
  fontSize: number;
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
}

export const QuoteCanvas = forwardRef<HTMLCanvasElement, QuoteCanvasProps>(
  ({ profileData, templateId, quoteText, fontSize, fontFamily, textAlign }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => canvasRef.current!);

    const getTemplateStyle = (templateId: string) => {
      const styles = {
        modern: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textColor: '#ffffff',
          accentColor: '#ffffff',
        },
        minimal: {
          background: '#ffffff',
          textColor: '#1f2937',
          accentColor: '#3b82f6',
        },
        dark: {
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          textColor: '#ffffff',
          accentColor: '#60a5fa',
        },
        corporate: {
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
          textColor: '#ffffff',
          accentColor: '#93c5fd',
        },
        creative: {
          background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
          textColor: '#ffffff',
          accentColor: '#ffffff',
        },
        elegant: {
          background: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)',
          textColor: '#ffffff',
          accentColor: '#d1d5db',
        },
      };
      return styles[templateId as keyof typeof styles] || styles.modern;
    };

    const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    };

    const drawCanvas = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size for high quality
      const scale = window.devicePixelRatio || 1;
      const width = 1080;
      const height = 1080;
      
      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = `${Math.min(width, 500)}px`;
      canvas.style.height = `${Math.min(height, 500)}px`;
      
      ctx.scale(scale, scale);

      const style = getTemplateStyle(templateId);

      // Draw background
      if (style.background.startsWith('linear-gradient')) {
        // Parse gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        if (templateId === 'modern') {
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, '#764ba2');
        } else if (templateId === 'dark') {
          gradient.addColorStop(0, '#1f2937');
          gradient.addColorStop(1, '#111827');
        } else if (templateId === 'corporate') {
          gradient.addColorStop(0, '#1e40af');
          gradient.addColorStop(1, '#1e3a8a');
        } else if (templateId === 'creative') {
          gradient.addColorStop(0, '#ec4899');
          gradient.addColorStop(1, '#f97316');
        } else if (templateId === 'elegant') {
          gradient.addColorStop(0, '#4b5563');
          gradient.addColorStop(1, '#374151');
        }
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = style.background;
      }
      ctx.fillRect(0, 0, width, height);

      // Draw quote text
      ctx.fillStyle = style.textColor;
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textAlign = textAlign;

      const maxWidth = width - 120;
      const lines = wrapText(ctx, `"${quoteText}"`, maxWidth);
      
      const lineHeight = fontSize * 1.4;
      const totalTextHeight = lines.length * lineHeight;
      const startY = (height - totalTextHeight - 200) / 2; // Leave space for profile

      let x = width / 2;
      if (textAlign === 'left') x = 60;
      if (textAlign === 'right') x = width - 60;

      lines.forEach((line, index) => {
        ctx.fillText(line, x, startY + index * lineHeight);
      });

      // Draw profile section
      const profileY = startY + totalTextHeight + 80;

      // Draw profile image if available
      if (profileData.image) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          
          await new Promise<void>((resolve, reject) => {
            img.onload = () => {
              const imageSize = 80;
              const imageX = (width - imageSize) / 2;
              
              // Draw circular image
              ctx.save();
              ctx.beginPath();
              ctx.arc(imageX + imageSize/2, profileY, imageSize/2, 0, Math.PI * 2);
              ctx.clip();
              ctx.drawImage(img, imageX, profileY - imageSize/2, imageSize, imageSize);
              ctx.restore();
              
              // Draw border
              ctx.strokeStyle = style.accentColor;
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.arc(imageX + imageSize/2, profileY, imageSize/2, 0, Math.PI * 2);
              ctx.stroke();
              
              resolve();
            };
            img.onerror = reject;
          });
          
          img.src = profileData.image;
        } catch (error) {
          console.log('Could not load profile image:', error);
        }
      }

      // Draw name
      ctx.fillStyle = style.textColor;
      ctx.font = `bold 28px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.fillText(profileData.name, width / 2, profileY + 60);

      // Draw title if available
      if (profileData.title) {
        ctx.fillStyle = style.accentColor;
        ctx.font = `20px ${fontFamily}`;
        ctx.fillText(profileData.title, width / 2, profileY + 90);
      }
    };

    useEffect(() => {
      drawCanvas();
    }, [profileData, templateId, quoteText, fontSize, fontFamily, textAlign]);

    return (
      <canvas
        ref={canvasRef}
        className="border border-gray-200 rounded-lg shadow-lg max-w-full h-auto"
      />
    );
  }
);

QuoteCanvas.displayName = 'QuoteCanvas';
