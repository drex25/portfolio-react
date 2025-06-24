# Sistema de Conversión de Monedas

## Descripción
Este sistema permite mostrar los precios de los servicios en diferentes monedas según la región del usuario, con detección automática y selector manual.

## Características

### ✅ Implementado
- **Detección automática de región** basada en el idioma del navegador
- **8 monedas soportadas**: ARS, USD, EUR, MXN, CLP, COP, PEN, BRL
- **Selector de moneda** con interfaz visual atractiva
- **Persistencia** de la moneda seleccionada en localStorage
- **Animaciones suaves** al cambiar moneda
- **Formateo automático** de precios según la región
- **Internacionalización** completa (ES, EN, FR)

### 🎯 Monedas Soportadas

| Región | Moneda | Símbolo | Tasa (1 USD =) | Locale |
|--------|--------|---------|----------------|--------|
| AR | Peso Argentino | $ | 1210 | es-AR |
| PY | Guaraní Paraguayo | ₲ | 7500 | es-PY |
| US | Dólar Estadounidense | $ | 1 | en-US |
| EU | Euro | € | 0.85 | es-ES |
| MX | Peso Mexicano | $ | 18.5 | es-MX |
| CL | Peso Chileno | $ | 950 | es-CL |
| CO | Peso Colombiano | $ | 4000 | es-CO |
| PE | Sol Peruano | S/ | 3.8 | es-PE |
| BR | Real Brasileño | R$ | 5.2 | pt-BR |

## Archivos Principales

### `src/config/environment.ts`
- Configuración de monedas y tasas de cambio
- Constantes `REGIONAL_PRICING` y `DEFAULT_CURRENCY`

### `src/hooks/useCurrency.ts`
- Hook personalizado para manejo de monedas
- Detección automática de región
- Conversión y formateo de precios
- Persistencia en localStorage

### `src/components/CurrencySelector.tsx`
- Componente visual para seleccionar moneda
- Dropdown con todas las monedas disponibles
- Animaciones y feedback visual

### `src/pages/Services.tsx`
- Integración del sistema en la página de servicios
- Animaciones al cambiar moneda
- Formateo automático de precios

## Uso

### En un componente:
```typescript
import { useCurrency } from '../hooks/useCurrency';

const MyComponent = () => {
  const { formatPrice, changeCurrency, currentCurrency } = useCurrency();
  
  return (
    <div>
      <p>Precio: {formatPrice(299)}</p>
      <button onClick={() => changeCurrency('AR')}>
        Cambiar a Pesos Argentinos
      </button>
    </div>
  );
};
```

### Agregar nueva moneda:
1. Editar `src/config/environment.ts`
2. Agregar entrada en `REGIONAL_PRICING`
3. Actualizar detección en `useCurrency.ts` si es necesario

## Ventajas

- **Sin dependencias externas**: No requiere APIs de terceros
- **Rápido**: Conversión instantánea sin llamadas a servidor
- **Confiable**: No depende de servicios externos
- **Personalizable**: Fácil agregar nuevas monedas
- **UX optimizada**: Detección automática + selector manual

## Futuras Mejoras

- [ ] API de tasas de cambio en tiempo real
- [ ] Cache de tasas con expiración
- [ ] Más monedas (Asia, África)
- [ ] Modo offline con tasas guardadas
- [ ] Historial de cambios de moneda

## Notas Técnicas

- Las tasas están hardcodeadas para simplicidad
- Se puede migrar fácilmente a API externa cambiando solo el hook
- El sistema es completamente reactivo y no requiere refrescar la página
- Compatible con SSR y SSG 