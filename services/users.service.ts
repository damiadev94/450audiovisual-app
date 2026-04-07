import { ProfileRepository } from "../db/repositories/profile.repository";
import { SubscriptionRepository } from "../db/repositories/subscription.repository";
import { PaymentRepository } from "../db/repositories/payment.repository";

export class UsersService {
    // Usando "Parameter Properties" de TS: 
    // defines e inicializas en una sola línea.
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly subscriptionRepository: SubscriptionRepository,
        private readonly paymentRepository: PaymentRepository
    ) { }

    async getUserById(userId: string) {
        return this.profileRepository.findById(userId);
    }

    async updateUserMembership(userId: string, expiresAt: Date) {
        return this.profileRepository.updateMembership(userId, expiresAt);
    }

    async getUserSubscription(userId: string) {
        return this.subscriptionRepository.findByUserId(userId);
    }

    async getUserPayment(userId: string) {
        return this.paymentRepository.findByUserId(userId);
    }
}
