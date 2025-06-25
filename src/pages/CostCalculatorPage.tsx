import React from 'react';
import CostCalculator from '../components/CostCalculator';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const CostCalculatorPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-start pt-20 pb-10">
      <Helmet>
        <title>{t('costCalculator.title', 'Calculadora de Presupuestos')}</title>
        <meta name="description" content={t('costCalculator.description', 'Calcula el costo de tu proyecto o servicio a medida, elige servicios, moneda y obtén descuentos automáticos.')} />
        <link rel="canonical" href="/presupuesto" />
      </Helmet>
      <section className="w-full max-w-4xl mx-auto text-center mb-8 animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-700 dark:text-cyan-300 mb-4 drop-shadow-lg">
          {t('costCalculator.heroTitle', 'Calculadora de Presupuestos')}
        </h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-6">
          {t('costCalculator.heroSubtitle', 'Simula el costo de tu proyecto, selecciona servicios, moneda y obtén descuentos automáticos.')}
        </p>
      </section>
      <div className="w-full max-w-5xl bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-2xl p-4 md:p-12 animate-fadeInUp border border-cyan-200 dark:border-cyan-900 flex flex-col items-center">
        <CostCalculator />
      </div>
    </div>
  );
};

export default CostCalculatorPage; 