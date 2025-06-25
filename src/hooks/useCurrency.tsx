import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { REGIONAL_PRICING, DEFAULT_CURRENCY, PRODUCTION_CONFIG, ENV_CONFIG } from '../config/environment';

export interface CurrencyConfig {
  currency: string;
  rate: number;
  symbol: string;
  name: string;
  locale: string;
}

interface CurrencyContextProps {
  currentCurrency: string;
  currencyConfig: CurrencyConfig;
  convertPrice: (usdPrice: number) => number;
  formatPrice: (price: number) => string;
  changeCurrency: (region: string) => void;
  getAvailableCurrencies: () => any[];
  isInitialized: boolean;
  currencyChangeKey: number;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  const [currencyChangeKey, setCurrencyChangeKey] = useState(0);

  const detectUserRegion = (): string => {
    if (typeof window === 'undefined') {
      return DEFAULT_CURRENCY;
    }
    const language = navigator.language || navigator.languages?.[0] || 'en-US';
    if (language.startsWith('es') && language !== 'es-ES') {
      return 'AR'; // Prioriza Argentina para cualquier español que no sea España
    }
    const languageToRegion: { [key: string]: string } = {
      'es-AR': 'AR', 'es-PY': 'PY', 'es-MX': 'MX', 'es-CL': 'CL', 'es-CO': 'CO', 'es-PE': 'PE', 'es-ES': 'EU',
      'pt-BR': 'BR', 'en-US': 'US', 'en-CA': 'US', 'fr-FR': 'EU', 'de-DE': 'EU', 'it-IT': 'EU'
    };
    if (languageToRegion[language]) return languageToRegion[language];
    const baseLanguage = language.split('-')[0];
    const regionMap: { [key: string]: string } = {
      'es': 'AR', 'pt': 'BR', 'en': 'US', 'fr': 'EU', 'de': 'EU', 'it': 'EU'
    };
    return regionMap[baseLanguage] || DEFAULT_CURRENCY;
  };

  const detectRegionByIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const countryToRegion: { [key: string]: string } = {
        'AR': 'AR', 'PY': 'PY', 'US': 'US', 'CA': 'US', 'MX': 'MX', 'CL': 'CL', 'CO': 'CO', 'PE': 'PE', 'BR': 'BR',
        'ES': 'EU', 'FR': 'EU', 'DE': 'EU', 'IT': 'EU'
      };
      return countryToRegion[data.country_code] || DEFAULT_CURRENCY;
    } catch (error) {
      return detectUserRegion();
    }
  };

  const convertPrice = useCallback((usdPrice: number): number => {
    if (!currencyConfig || !currencyConfig.rate) return usdPrice;
    return Math.round(usdPrice * currencyConfig.rate);
  }, [currencyConfig]);

  const formatPrice = useCallback((price: number): string => {
    if (!currencyConfig) return `$${price}`;
    const convertedPrice = price;
    if (currencyConfig.currency === 'ARS' || currencyConfig.currency === 'CLP' || currencyConfig.currency === 'COP' || currencyConfig.currency === 'PYG') {
      return `${currencyConfig.symbol}${convertedPrice.toLocaleString(currencyConfig.locale)}`;
    }
    return `${currencyConfig.symbol}${convertedPrice.toLocaleString(currencyConfig.locale)}`;
  }, [currencyConfig]);

  const changeCurrency = useCallback((region: string) => {
    const newConfig = REGIONAL_PRICING[region as keyof typeof REGIONAL_PRICING];
    if (newConfig) {
      setCurrentCurrency(region);
      setCurrencyConfig(newConfig);
      setCurrencyChangeKey(prev => prev + 1);
      localStorage.setItem('preferred-currency', region);
    }
  }, []);

  const getAvailableCurrencies = useCallback(() => {
    return Object.entries(REGIONAL_PRICING).map(([code, config]) => ({ code, ...config }));
  }, []);

  useEffect(() => {
    const initializeCurrency = async () => {
      const savedCurrency = localStorage.getItem('preferred-currency');
      if (savedCurrency && REGIONAL_PRICING[savedCurrency as keyof typeof REGIONAL_PRICING]) {
        setCurrentCurrency(savedCurrency);
        setCurrencyConfig(REGIONAL_PRICING[savedCurrency as keyof typeof REGIONAL_PRICING]);
      } else {
        if (ENV_CONFIG.IS_PRODUCTION && PRODUCTION_CONFIG.FORCE_ARGENTINA_IN_PRODUCTION) {
          const argentinaConfig = REGIONAL_PRICING[PRODUCTION_CONFIG.PRODUCTION_DEFAULT_REGION as keyof typeof REGIONAL_PRICING];
          if (argentinaConfig) {
            setCurrentCurrency(PRODUCTION_CONFIG.PRODUCTION_DEFAULT_REGION);
            setCurrencyConfig(argentinaConfig);
            setIsInitialized(true);
            return;
          }
        }
        let detectedRegion = detectUserRegion();
        if (detectedRegion === DEFAULT_CURRENCY && typeof window !== 'undefined') {
          try {
            detectedRegion = await detectRegionByIP();
          } catch (error) {}
        }
        const detectedConfig = REGIONAL_PRICING[detectedRegion as keyof typeof REGIONAL_PRICING];
        if (detectedConfig) {
          setCurrentCurrency(detectedRegion);
          setCurrencyConfig(detectedConfig);
        } else {
          setCurrentCurrency(DEFAULT_CURRENCY);
          setCurrencyConfig(defaultConfig);
        }
      }
      setIsInitialized(true);
    };
    initializeCurrency();
  }, []);

  return (
    <CurrencyContext.Provider value={{
      currentCurrency,
      currencyConfig,
      convertPrice,
      formatPrice,
      changeCurrency,
      getAvailableCurrencies,
      isInitialized,
      currencyChangeKey
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency debe usarse dentro de CurrencyProvider');
  }
  return context;
}; 