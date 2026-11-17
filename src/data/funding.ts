// Config del bloque de financiamiento. Todo lo que cambia mes a mes vive acá:
// el contador de días, la billetera y los entregables.

export const funding = {
  /** Meta: un mes de trabajo. */
  goalUsd: 2000,
  /** Un día laboral. 20 días = 1 mes. */
  dayUsd: 100,
  days: 20,
  /**
   * Días ya financiados. Se actualiza a mano junto con el registro mensual del
   * blog: no hay integración con la billetera, y con este volumen no vale la pena.
   */
  fundedDays: 0,
  /** Dirección USDC en Polygon. Vacía = el bloque muestra el correo en su lugar. */
  wallet: '0xBF7FCBA2CAAE7cd0435FCfC1a38aA3ebFF0F77a0',
  network: 'USDC on Polygon',
  email: 'wiracochalabs@protonmail.com',
  whitepaper:
    'https://github.com/wiracocha-labs/research/tree/main/whitepapers/0001-compresion-pesos-ia-introduccion',
  tiers: [
    { usd: 25, label: '2 hours of work' },
    { usd: 100, label: '1 full day' },
    { usd: 500, label: '1 week' },
    { usd: 1500, label: '3 weeks' },
    { usd: 2000, label: '1 full month' },
  ],
  milestones: [
    {
      month: 'Month 1',
      detail: 'chaka with a verified round-trip, and whitepaper v1 without pending figures',
    },
    {
      month: 'Month 2',
      detail: 'post-quantization entropy benchmark across 4 model families',
    },
    {
      month: 'Month 3',
      detail: '.wcx format specification and delta measurements between model versions',
    },
  ],
}

/** Separador de miles con punto, sin depender del locale del build. */
export const nf = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
