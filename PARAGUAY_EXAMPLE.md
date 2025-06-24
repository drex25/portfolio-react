# Ejemplo de Precios en Guaraní Paraguayo

## Tasas de Cambio
- **1 USD = 7,500 PYG** (Guaraní Paraguayo)
- **Símbolo:** ₲

## Ejemplos de Precios Convertidos

### Servicios Principales
| Servicio | Precio USD | Precio en Guaraní |
|----------|------------|-------------------|
| Landing Page | $299 | ₲2,242,500 |
| E-commerce Básico | $799 | ₲5,992,500 |
| WordPress | $599 | ₲4,492,500 |
| Aplicación Web | $1,299 | ₲9,742,500 |
| E-commerce Empresarial | $1,899 | ₲14,242,500 |
| Mantenimiento Mensual | $99 | ₲742,500 |

### Servicios Adicionales
| Servicio | Precio USD | Precio en Guaraní |
|----------|------------|-------------------|
| SEO Avanzado | $199 | ₲1,492,500 |
| App Móvil | $599 | ₲4,492,500 |
| Analytics | $149 | ₲1,117,500 |
| Capacitación | $99 | ₲742,500 |

## Características del Formateo
- **Separadores de miles:** ₲2,242,500 (no ₲2242500)
- **Locale:** es-PY (español de Paraguay)
- **Detección automática:** Para usuarios con idioma es-PY
- **Selector manual:** Disponible en el dropdown de monedas

## Cómo Actualizar la Tasa
Para cambiar la tasa del Guaraní, editar en `src/config/environment.ts`:

```typescript
'PY': { 
  currency: 'PYG', 
  rate: 7500,  // ← Cambiar este número
  symbol: '₲',
  name: 'Guaraní Paraguayo',
  locale: 'es-PY'
},
```

## Notas Importantes
- El Guaraní tiene valores muy altos, por eso se incluye en el formateo especial
- Se detecta automáticamente para usuarios de Paraguay
- Los precios se muestran con separadores de miles para mejor legibilidad
- Compatible con el sistema de detección por IP y idioma 