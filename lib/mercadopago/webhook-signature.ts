import crypto from 'crypto'

interface SignatureParams {
    xSignature: string | null
    xRequestId: string | null
    dataId: string
}

export function verifyWebhookSignature({ xSignature, xRequestId, dataId }: SignatureParams): boolean {
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
    if (!secret || !xSignature || !xRequestId) return false

    // Extraer ts y v1 del header x-signature
    const parts = xSignature.split(',')
    let ts: string | undefined, v1: string | undefined
    for (const part of parts) {
        const [key, value] = part.split('=')
        if (key.trim() === 'ts') ts = value.trim()
        if (key.trim() === 'v1') v1 = value.trim()
    }

    if (!ts || !v1) return false

    // Construir manifest según spec de MP
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`

    // HMAC SHA-256
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(manifest)
    const calculatedHash = hmac.digest('hex')

    // Comparación timing-safe para prevenir ataques de temporización
    try {
        return crypto.timingSafeEqual(
            Buffer.from(calculatedHash, 'hex'),
            Buffer.from(v1, 'hex')
        )
    } catch {
        return false
    }
}
