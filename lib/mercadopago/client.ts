import MercadoPago, { MercadoPagoConfig } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    options: {
        timeout: 10000,
        integratorId: 'dev_450audiovisual'
    }
});

export default client;
