import { useState, useEffect, useCallback } from 'react';
import { REGIONAL_PRICING, DEFAULT_CURRENCY, PRODUCTION_CONFIG, ENV_CONFIG } from '../config/environment';

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
  const [currencyChangeKey, setCurrencyChangeKey] = useState(0); // Para forzar re-renderizados

  // Detectar región del usuario basado en el idioma del navegador
  const detectUserRegion = (): string => {
    // Verificar si estamos en el navegador
    if (typeof window === 'undefined') {
      return DEFAULT_CURRENCY; // Fallback para SSR
    }

    const language = navigator.language || navigator.languages?.[0] || 'en-US';
    
    // Mapear idiomas a regiones - Priorizar Argentina para español
    const languageToRegion: { [key: string]: string } = {
      'es-AR': 'AR',
      'es-PY': 'PY',
      'es-MX': 'MX',
      'es-CL': 'CL',
      'es-CO': 'CO',
      'es-PE': 'PE',
      'es-ES': 'EU',
      'pt-BR': 'BR',
      'en-US': 'US',
      'en-CA': 'US',
      'fr-FR': 'EU',
      'de-DE': 'EU',
      'it-IT': 'EU'
    };

    // Buscar coincidencia exacta
    if (languageToRegion[language]) {
      return languageToRegion[language];
    }

    // Buscar por código de idioma base - Priorizar Argentina para español
    const baseLanguage = language.split('-')[0];
    const regionMap: { [key: string]: string } = {
      'es': 'AR', // Prioridad alta para Argentina
      'pt': 'BR',
      'en': 'US',
      'fr': 'EU',
      'de': 'EU',
      'it': 'EU'
    };

    return regionMap[baseLanguage] || DEFAULT_CURRENCY;
  };

  // Función para detectar región por IP (opcional, para mejorar detección)
  const detectRegionByIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      // Mapear códigos de país a nuestras regiones
      const countryToRegion: { [key: string]: string } = {
        'AR': 'AR',
        'PY': 'PY',
        'US': 'US',
        'CA': 'US',
        'MX': 'MX',
        'CL': 'CL',
        'CO': 'CO',
        'PE': 'PE',
        'BR': 'BR',
        'ES': 'EU',
        'FR': 'EU',
        'DE': 'EU',
        'IT': 'EU'
      };
      
      return countryToRegion[data.country_code] || DEFAULT_CURRENCY;
    } catch (error) {
      console.log('No se pudo detectar región por IP, usando detección por idioma');
      return detectUserRegion();
    }
  };

  // Convertir precio de USD a la moneda seleccionada
  const convertPrice = useCallback((usdPrice: number): number => {
    if (!currencyConfig || !currencyConfig.rate) {
      return usdPrice; // Retornar precio original si no hay configuración
    }
    return Math.round(usdPrice * currencyConfig.rate);
  }, [currencyConfig]);

  // Formatear precio con el símbolo de moneda
  const formatPrice = useCallback((price: number): string => {
    if (!currencyConfig) {
      return `$${price}`; // Fallback si no hay configuración
    }
    
    const convertedPrice = convertPrice(price);
    
    // Para monedas con valores altos, mostrar en formato más legible
    if (currencyConfig.currency === 'ARS' || currencyConfig.currency === 'CLP' || currencyConfig.currency === 'COP' || currencyConfig.currency === 'PYG') {
      return `${currencyConfig.symbol}${convertedPrice.toLocaleString(currencyConfig.locale)}`;
    }
    
    return `${currencyConfig.symbol}${convertedPrice.toLocaleString(currencyConfig.locale)}`;
  }, [currencyConfig, convertPrice]);

  // Cambiar moneda manualmente
  const changeCurrency = useCallback((region: string) => {
    const newConfig = REGIONAL_PRICING[region as keyof typeof REGIONAL_PRICING];
    if (newConfig) {
      setCurrentCurrency(region);
      setCurrencyConfig(newConfig);
      setCurrencyChangeKey(prev => prev + 1); // Forzar re-renderizado
      // Guardar en localStorage para persistencia
      localStorage.setItem('preferred-currency', region);
    }
  }, []);

  // Obtener lista de monedas disponibles
  const getAvailableCurrencies = useCallback(() => {
    return Object.entries(REGIONAL_PRICING).map(([code, config]) => ({
      code,
      ...config
    }));
  }, []);

  useEffect(() => {
    const initializeCurrency = async () => {
      // Intentar cargar moneda guardada en localStorage
      const savedCurrency = localStorage.getItem('preferred-currency');
      
      if (savedCurrency && REGIONAL_PRICING[savedCurrency as keyof typeof REGIONAL_PRICING]) {
        setCurrentCurrency(savedCurrency);
        setCurrencyConfig(REGIONAL_PRICING[savedCurrency as keyof typeof REGIONAL_PRICING]);
      } else {
        // En producción, forzar Argentina si está configurado
        if (ENV_CONFIG.IS_PRODUCTION && PRODUCTION_CONFIG.FORCE_ARGENTINA_IN_PRODUCTION) {
          const argentinaConfig = REGIONAL_PRICING[PRODUCTION_CONFIG.PRODUCTION_DEFAULT_REGION as keyof typeof REGIONAL_PRICING];
          if (argentinaConfig) {
            setCurrentCurrency(PRODUCTION_CONFIG.PRODUCTION_DEFAULT_REGION);
            setCurrencyConfig(argentinaConfig);
            setIsInitialized(true);
            return;
          }
        }
        
        // Detectar región automáticamente
        let detectedRegion = detectUserRegion();
        
        // Si la detección por idioma no es confiable, intentar por IP
        if (detectedRegion === DEFAULT_CURRENCY && typeof window !== 'undefined') {
          try {
            detectedRegion = await detectRegionByIP();
          } catch (error) {
            // Si falla la detección por IP, mantener la detección por idioma
            console.log('Usando detección por idioma como fallback');
          }
        }
        
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
    };

    initializeCurrency();
  }, []);

  return {
    currentCurrency,
    currencyConfig,
    convertPrice,
    formatPrice,
    changeCurrency,
    getAvailableCurrencies,
    isInitialized,
    currencyChangeKey // Para usar como key en componentes
  };
}; 