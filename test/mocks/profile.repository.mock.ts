import { vi } from "vitest";

export const createMockProfileRepo = () => ({
    findById: vi.fn(),
    updateMembership: vi.fn(),
});