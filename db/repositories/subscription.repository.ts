import { BaseRepository } from "./base.repository";
import { Subscription, CreateSubscriptionDto, UpdateSubscriptionDto } from "../../types/subscription";

export class SubscriptionRepository extends BaseRepository<Subscription> {
    private readonly TABLE_NAME = "subscriptions";

    async findByUserId(userId: string): Promise<Subscription | null> {
        const { data, error } = await this.db
            .from(this.TABLE_NAME)
            .select("*")
            .eq("user_id", userId)
            .maybeSingle(); // .single() lanza error si no existe, .maybeSingle() es más seguro

        if (error) this.handleError(error);
        return data;
    }

    async create(payload: CreateSubscriptionDto): Promise<void> {
        const { error } = await this.db
            .from(this.TABLE_NAME)
            .insert(payload);

        if (error) this.handleError(error);
    }

    async update(id: string, payload: UpdateSubscriptionDto): Promise<void> {
        const { error } = await this.db
            .from(this.TABLE_NAME)
            .update(payload)
            .eq("id", id);

        if (error) this.handleError(error);
    }

    async delete(id: string): Promise<void> {
        const { error } = await this.db
            .from(this.TABLE_NAME)
            .delete()
            .eq("id", id);

        if (error) this.handleError(error);
    }
}
