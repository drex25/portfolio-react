import React, { useState, useMemo } from 'react';
import { FaCalculator, FaCheckCircle, FaWhatsapp, FaEnvelope, FaGlobe, FaShoppingCart, FaCogs, FaTools } from 'react-icons/fa';
import { useCurrency } from '../hooks/useCurrency';

const SERVICES = [
  {
    id: 'landing',
    name: 'Landing Page',
    icon: <FaGlobe className="text-cyan-500 text-2xl" />,
    basePrice: { USD: 299 },
    unitLabel: 'página',
    min: 1,
    max: 5,
    defaultQty: 1,
    description: 'Sitio web de una sola página, ideal para presencia online rápida y efectiva.'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Básico',
    icon: <FaShoppingCart className="text-cyan-500 text-2xl" />,
    basePrice: { USD: 799 },
    unitLabel: 'producto',
    min: 10,
    max: 100,
    defaultQty: 10,
    description: 'Tienda online para vender productos, con carrito y pagos integrados.'
  },
  {
    id: 'webapp',
    name: 'Web App Personalizada',
    icon: <FaCogs className="text-cyan-500 text-2xl" />,
    basePrice: { USD: 1299 },
    unitLabel: 'usuario',
    min: 5,
    max: 100,
    defaultQty: 5,
    description: 'Aplicaciones web a medida, con funcionalidades avanzadas.'
  },
  {
    id: 'maintenance',
    name: 'Mantenimiento Mensual',
    icon: <FaTools className="text-cyan-500 text-2xl" />,
    basePrice: { USD: 99 },
    unitLabel: 'mes',
    min: 1,
    max: 12,
    defaultQty: 1,
    description: 'Soporte y actualizaciones mensuales para tu sitio o app.'
  },
];

const CURRENCIES = [
  { code: 'AR', symbol: '$', label: 'Pesos (ARS)' },
  { code: 'US', symbol: 'US$', label: 'Dólar (USD)' },
  { code: 'EU', symbol: '€', label: 'Euro (EUR)' },
];

const CostCalculator: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState([
    { id: 'landing', qty: 1 },
  ]);
  const { currentCurrency, convertPrice, formatPrice, changeCurrency } = useCurrency();

  // Calcular el total y descuentos
  const { total, discount, breakdown } = useMemo(() => {
    let subtotal = 0;
    let discount = 0;
    let breakdown: string[] = [];
    let multiService = selectedServices.length > 1;

    selectedServices.forEach(({ id, qty }) => {
      const service = SERVICES.find(s => s.id === id)!;
      let usdPrice = service.basePrice['USD'] * qty;
      let price = usdPrice;
      let serviceDiscount = 0;
      // Descuento por volumen
      if (qty >= 4) serviceDiscount += 0.10;
      // Descuento por combo
      if (multiService) serviceDiscount += 0.15;
      const discounted = price * (1 - serviceDiscount);
      subtotal += discounted;
      if (serviceDiscount > 0) {
        breakdown.push(`${service.name}: ${formatPrice(convertPrice(discounted))} (descuento aplicado)`);
        discount += price - discounted;
      } else {
        breakdown.push(`${service.name}: ${formatPrice(convertPrice(price))}`);
      }
    });
    return { total: subtotal, discount, breakdown };
  }, [selectedServices, convertPrice, formatPrice]);

  // Handlers
  const handleServiceChange = (id: string, checked: boolean) => {
    if (checked) {
      const service = SERVICES.find(s => s.id === id)!;
      setSelectedServices(prev => [...prev, { id, qty: service.defaultQty }]);
    } else {
      setSelectedServices(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleQtyChange = (id: string, qty: number) => {
    setSelectedServices(prev => prev.map(s => s.id === id ? { ...s, qty } : s));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeCurrency(e.target.value);
  };

  // WhatsApp/email
  const getSummaryText = () => {
    return `Hola! Quiero solicitar un presupuesto:\n\n${selectedServices.map(({ id, qty }) => {
      const service = SERVICES.find(s => s.id === id)!;
      return `- ${service.name} (${qty} ${service.unitLabel}${qty > 1 ? 's' : ''})`;
    }).join('\n')}\n\nTotal estimado: ${formatPrice(convertPrice(total))}\n`;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(getSummaryText());
    window.open(`https://wa.me/543765115897?text=${text}`, '_blank');
  };
  const handleEmail = () => {
    const subject = encodeURIComponent('Solicitud de presupuesto');
    const body = encodeURIComponent(getSummaryText());
    window.open(`mailto:contacto@itsdrex.dev?subject=${subject}&body=${body}`);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-2 md:px-0">
      {/* Fondo glassmorphism y cabecera */}
      <div className="absolute inset-0 blur-2xl opacity-60 bg-gradient-to-br from-cyan-200/40 via-white/60 to-cyan-400/30 rounded-3xl -z-10" />
      <div className="flex flex-col md:flex-row gap-8 items-start animate-fadeInUp">
        {/* Servicios */}
        <section className="flex-1">
          <header className="mb-8 text-center">
            <FaCalculator className="mx-auto text-5xl text-cyan-500 mb-2 drop-shadow-lg" />
            <h2 className="text-4xl font-extrabold text-cyan-700 dark:text-cyan-300 mb-2">Calculadora de Presupuestos</h2>
            <p className="text-lg text-slate-600 dark:text-slate-200">Simula el costo de tu proyecto y obtén descuentos automáticos.</p>
          </header>
          <div className="mb-6">
            <label className="block text-gray-500 font-semibold mb-2">Moneda</label>
            <select value={currentCurrency} onChange={handleCurrencyChange} className="w-full p-3 rounded-xl bg-white/80 dark:bg-slate-800 text-cyan-700 dark:text-cyan-200 border border-cyan-200 focus:border-cyan-400 outline-none shadow-sm">
              {CURRENCIES.map(cur => (
                <option key={cur.code} value={cur.code}>{cur.label}</option>
              ))}
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICES.map(service => {
              const selected = selectedServices.find(s => s.id === service.id);
              return (
                <div
                  key={service.id}
                  className={`group transition-all duration-300 p-5 rounded-2xl shadow-lg border-2 cursor-pointer bg-white/80 dark:bg-slate-900/80 hover:scale-[1.03] hover:shadow-2xl ${selected ? 'border-cyan-400 ring-2 ring-cyan-300/40' : 'border-transparent'}`}
                  onClick={() => handleServiceChange(service.id, !selected)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span>{service.icon}</span>
                    <span className="text-xl font-bold text-cyan-700 dark:text-cyan-200">{service.name}</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-300 text-sm mb-3 min-h-[40px]">{service.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-cyan-600 font-semibold">{formatPrice(convertPrice(service.basePrice['USD']))}</span>
                    <span className="text-gray-400 text-xs">/ {service.unitLabel}</span>
                  </div>
                  {selected && (
                    <div className="flex items-center gap-2 mt-2">
                      <label className="text-gray-400 font-medium">{service.unitLabel.charAt(0).toUpperCase() + service.unitLabel.slice(1)}s:</label>
                      <input
                        type="number"
                        min={service.min}
                        max={service.max}
                        value={selected.qty}
                        onClick={e => e.stopPropagation()}
                        onChange={e => handleQtyChange(service.id, Math.max(service.min, Math.min(service.max, Number(e.target.value))))}
                        className="w-16 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-white border border-cyan-200 focus:border-cyan-400 outline-none shadow-sm"
                      />
                      <span className="text-gray-400 text-xs">({service.min}-{service.max})</span>
                    </div>
                  )}
                  <div className="mt-3">
                    <input
                      type="checkbox"
                      checked={!!selected}
                      onChange={e => handleServiceChange(service.id, e.target.checked)}
                      onClick={e => e.stopPropagation()}
                      className="accent-cyan-500 w-5 h-5 mr-2 align-middle"
                    />
                    <span className="text-sm text-gray-500">Seleccionar</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* Resumen */}
        <aside className="w-full md:w-[350px] bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-2xl p-8 sticky top-24 self-start border border-cyan-100 dark:border-cyan-900 animate-fadeInUp flex flex-col gap-6">
          <h3 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300 mb-2 flex items-center gap-2"><FaCheckCircle className="text-cyan-400" /> Resumen</h3>
          <ul className="text-gray-700 dark:text-gray-200 mb-2 list-disc pl-6 text-base">
            {breakdown.map((line, i) => <li key={i}>{line}</li>)}
          </ul>
          {discount > 0 && <div className="text-green-500 font-semibold mb-2">Descuento aplicado: {formatPrice(convertPrice(discount))}</div>}
          <div className="text-3xl font-black text-cyan-500 dark:text-cyan-300 drop-shadow-lg">Total: {formatPrice(convertPrice(total))}</div>
          <div className="flex flex-col gap-3 mt-4">
            <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 text-lg">
              <FaWhatsapp className="text-2xl" /> WhatsApp
            </button>
            <button onClick={handleEmail} className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 text-lg">
              <FaEnvelope className="text-2xl" /> Email
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CostCalculator; 