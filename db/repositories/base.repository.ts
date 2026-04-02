import { SupabaseClient } from "@supabase/supabase-js";

export abstract class BaseRepository {
    protected db: SupabaseClient;

    constructor(db: SupabaseClient) {
        this.db = db;
    }
}