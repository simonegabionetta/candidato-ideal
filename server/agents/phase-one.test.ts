import { describe, expect, it } from "vitest";
import { runPhaseOneScan } from "./phase-one";

describe("runPhaseOneScan", () => {
  it("returns the initial placeholder output", async () => {
    const result = await runPhaseOneScan({
      jobUrl: "https://example.com/jobs/product-manager",
    });

    expect(result.decision).toBe("apply");
    expect(result.companyDna).toContain("https://example.com/jobs/product-manager");
  });
});
