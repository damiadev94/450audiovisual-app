// types/subscription.ts
export interface Subscription {
    id: string;
    user_id: string;
    raffle_id: string;
    created_at: string;
    updated_at: string;
}

export type CreateSubscriptionDto = Omit<Subscription, 'id' | 'created_at' | 'updated_at'>;
export type UpdateSubscriptionDto = Partial<CreateSubscriptionDto>;
