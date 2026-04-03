import { describe, it, expect } from "vitest";
import { UsersService } from "./users.service";
import { createMockProfileRepo } from "@/test/mocks/profile.repository.mock";

describe("UsersService", () => {
    it("should get user by id", async () => {
        const profileRepo = createMockProfileRepo();

        profileRepo.findById.mockResolvedValue({
            id: "1",
            name: "Damián"
        })
    });
});