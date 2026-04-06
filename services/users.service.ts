import { ProfileRepository } from "../db/repositories/profile.repository";
import { SubscriptionRepository } from "../db/repositories/subscription.repository";
import { PaymentRepository } from "../db/repositories/payment.repository";

export class UsersService {
    private profileRepository: ProfileRepository;
    private subscriptionRepository: SubscriptionRepository;
    private paymentRepository: PaymentRepository;

    constructor(
        profileRepository: ProfileRepository,
        subscriptionRepository: SubscriptionRepository,
        paymentRepository: PaymentRepository
    ) {
        this.profileRepository = profileRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.paymentRepository = paymentRepository;
    }

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
