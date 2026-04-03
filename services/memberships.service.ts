import { SupabaseClient } from "@supabase/supabase-js";
import { PaymentRepository } from "../db/repositories/payment.repository";
import { ProfileRepository } from "../db/repositories/profile.repository";

export class MembershipsService {
    private db: SupabaseClient;
    private paymentRepository: PaymentRepository;
    private profileRepository: ProfileRepository;

    constructor(db: SupabaseClient) {
        this.db = db;
        this.paymentRepository = new PaymentRepository(db);
        this.profileRepository = new ProfileRepository(db);
    }

    async extendMembership(userId: string) {
        return this.profileRepository.updateMembership(userId, new Date());
    }

    async getMembership(userId: string) {
        return this.profileRepository.findById(userId);
    }
}