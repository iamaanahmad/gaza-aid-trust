'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Contrast, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTranslation } from '@/hooks/use-translation';

export function AccessibilityControls() {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const { t } = useTranslation();

  useEffect(() => {
    const root = document.documentElement;
    if (isHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  const toggleHighContrast = () => setIsHighContrast(!isHighContrast);
  const increaseFontSize = () => setFontSize((size) => Math.min(size + 10, 140));
  const decreaseFontSize = () => setFontSize((size) => Math.max(size - 10, 80));
  const resetFontSize = () => setFontSize(100);


  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={decreaseFontSize} aria-label={t('a11y_decrease_font_size')}>
              <ZoomOut className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('a11y_decrease_font_size')}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={resetFontSize} aria-label={t('a11y_reset_font_size')}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('a11y_reset_font_size')}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={increaseFontSize} aria-label={t('a11y_increase_font_size')}>
               <ZoomIn className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('a11y_increase_font_size')}</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={toggleHighContrast} aria-label={t('a11y_toggle_high_contrast')}>
              <Contrast className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isHighContrast ? t('a11y_disable_high_contrast') : t('a11y_enable_high_contrast')}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
