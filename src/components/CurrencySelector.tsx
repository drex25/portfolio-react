import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaChevronDown, FaCheck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../hooks/useCurrency';

const CurrencySelector: React.FC = () => {
  const { t } = useTranslation();
  const { currentCurrency, currencyConfig, changeCurrency, getAvailableCurrencies, isInitialized } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currencies = getAvailableCurrencies();

  const handleCurrencyChange = (currencyCode: string) => {
    changeCurrency(currencyCode);
    setIsOpen(false);
  };

  // No mostrar nada hasta que esté inicializado
  if (!isInitialized) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white">
        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-gray-300">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-cyan-400/50 transition-all duration-300 text-white"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaGlobe className="text-cyan-400" />
        <span className="font-semibold">{currencyConfig.symbol}</span>
        <span className="text-sm text-gray-300">{currencyConfig.currency}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown className="text-xs text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-slate-800/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl z-50 min-w-[200px]"
          >
            <div className="p-2">
              <div className="text-xs text-gray-400 px-3 py-2 border-b border-white/10">
                {t('services.selectCurrency', 'Seleccionar Moneda')}
              </div>
              {currencies.map((currency) => (
                <motion.button
                  key={currency.code}
                  onClick={() => handleCurrencyChange(currency.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                    currentCurrency === currency.code
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-white hover:bg-white/10'
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{currency.symbol}</span>
                    <div>
                      <div className="text-sm font-medium">{currency.currency}</div>
                      <div className="text-xs text-gray-400">{currency.name}</div>
                    </div>
                  </div>
                  {currentCurrency === currency.code && (
                    <FaCheck className="text-cyan-400 text-sm" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencySelector; 