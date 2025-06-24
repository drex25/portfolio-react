import { useState, useEffect } from 'react';
import { REGIONAL_PRICING, DEFAULT_CURRENCY } from '../config/environment';

export interface CurrencyConfig {
  currency: string;
  rate: number;
  symbol: string;
  name: string;
  locale: string;
}

export const useCurrency = () => {
  // Estado inicial seguro
  const defaultConfig: CurrencyConfig = REGIONAL_PRICING[DEFAULT_CURRENCY as keyof typeof REGIONAL_PRICING] || {
    currency: 'USD',
    rate: 1,
    symbol: '$',
    name: 'Dólar Estadounidense',
    locale: 'en-US'
  };

  const [currentCurrency, setCurrentCurrency] = useState<string>(DEFAULT_CURRENCY);
  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>(defaultConfig);
  const [isInitialized, setIsInitialized] = useState(false);

  // Detectar región del usuario basado en el idioma del navegador
  const detectUserRegion = (): string => {
    const language = navigator.language || navigator.languages?.[0] || 'en-US';
    
    // Mapear idiomas a regiones
    const languageToRegion: { [key: string]: string } = {
      'es-AR': 'AR',
      'es-MX': 'MX',
      'es-CL': 'CL',
      'es-CO': 'CO',
      'es-PE': 'PE',
      'pt-BR': 'BR',
      'en-US': 'US',
      'en-CA': 'US',
      'es-ES': 'EU',
      'fr-FR': 'EU',
      'de-DE': 'EU',
      'it-IT': 'EU'
    };

    // Buscar coincidencia exacta
    if (languageToRegion[language]) {
      return languageToRegion[language];
    }

    // Buscar por código de idioma base
    const baseLanguage = language.split('-')[0];
    const regionMap: { [key: string]: string } = {
      'es': 'AR', // Por defecto Argentina para español
      'pt': 'BR',
      'en': 'US',
      'fr': 'EU',
      'de': 'EU',
      'it': 'EU'
    };

    return regionMap[baseLanguage] || DEFAULT_CURRENCY;
  };

  // Convertir precio de USD a la moneda seleccionada
  const convertPrice = (usdPrice: number): number => {
    if (!currencyConfig || !currencyConfig.rate) {
      return usdPrice; // Retornar precio original si no hay configuración
    }
    return Math.round(usdPrice * currencyConfig.rate);
  };

  // Formatear precio con el símbolo de moneda
  const formatPrice = (price: number): string => {
    if (!currencyConfig) {
      return `$${price}`; // Fallback si no hay configuración
    }
    
    const convertedPrice = convertPrice(price);
    
    // Para monedas con valores altos, mostrar en formato más legible
    if (currencyConfig.currency === 'ARS' || currencyConfig.currency === 'CLP' || currencyConfig.currency === 'COP') {
      return `${currencyConfig.symbol}${convertedPrice.toLocaleString(currencyConfig.locale)}`;
    }
    
    return `${currencyConfig.symbol}${convertedPrice.toLocaleString(currencyConfig.locale)}`;
  };

  // Cambiar moneda manualmente
  const changeCurrency = (region: string) => {
    const newConfig = REGIONAL_PRICING[region as keyof typeof REGIONAL_PRICING];
    if (newConfig) {
      setCurrentCurrency(region);
      setCurrencyConfig(newConfig);
      // Guardar en localStorage para persistencia
      localStorage.setItem('preferred-currency', region);
    }
  };

  // Obtener lista de monedas disponibles
  const getAvailableCurrencies = () => {
    return Object.entries(REGIONAL_PRICING).map(([code, config]) => ({
      code,
      ...config
    }));
  };

  useEffect(() => {
    // Intentar cargar moneda guardada en localStorage
    const savedCurrency = localStorage.getItem('preferred-currency');
    
    if (savedCurrency && REGIONAL_PRICING[savedCurrency as keyof typeof REGIONAL_PRICING]) {
      setCurrentCurrency(savedCurrency);
      setCurrencyConfig(REGIONAL_PRICING[savedCurrency as keyof typeof REGIONAL_PRICING]);
    } else {
      // Detectar región automáticamente
      const detectedRegion = detectUserRegion();
      const detectedConfig = REGIONAL_PRICING[detectedRegion as keyof typeof REGIONAL_PRICING];
      
      if (detectedConfig) {
        setCurrentCurrency(detectedRegion);
        setCurrencyConfig(detectedConfig);
      } else {
        // Fallback a configuración por defecto
        setCurrentCurrency(DEFAULT_CURRENCY);
        setCurrencyConfig(defaultConfig);
      }
    }
    
    setIsInitialized(true);
  }, []);

  return {
    currentCurrency,
    currencyConfig,
    convertPrice,
    formatPrice,
    changeCurrency,
    getAvailableCurrencies,
    isInitialized
  };
}; 