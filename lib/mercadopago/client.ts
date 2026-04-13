import MercadoPago, { MercadoPagoConfig } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    options: {
        timeout: 10000
    }
});

export default client;
