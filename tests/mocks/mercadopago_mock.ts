/**
 * MOCK TEST: SIMULACIÓN DE WEBHOOK DE MERCADOPAGO
 * 
 * Este script se puede usar (vía Postman o cURL) para probar el webhook localmente
 * sin tener que realizar un pago real.
 * 
 * URL: http://localhost:3000/api/webhooks/mercadopago
 * MÉTODO: POST
 * CUERPO (JSON):
 */

const mockWebhookPayload = {
  action: "payment.updated",
  data: {
    id: "1234567890" // ID de pago ficticio
  }
}

/**
 * REQUERIMIENTO PARA PRUEBA:
 * 1. Tener el servidor corriendo (`npm run dev`).
 * 2. El comando cURL sería:
 *    curl -X POST http://localhost:3000/api/webhooks/mercadopago \
 *    -H "Content-Type: application/json" \
 *    -d '{"action": "payment.updated", "data": {"id": "1234567890"}}'
 * 
 * NOTA: El webhook intentará consultar este ID a MercadoPago usando el TOKEN.
 * Si el TOKEN es de prueba, el ID debe existir en tu cuenta de prueba.
 */
