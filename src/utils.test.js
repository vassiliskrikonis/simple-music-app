import { formatDuration } from "./utils";

describe("formatDuration", () => {
  test("formats duration to string", () => {
    expect(formatDuration(0)).toBe("00:00");
    expect(formatDuration(10)).toBe("00:10");
    expect(formatDuration(60)).toBe("01:00");
    expect(formatDuration(70)).toBe("01:10");
    expect(formatDuration(121)).toBe("02:01");
    expect(formatDuration(121.12)).toBe("02:01");
  });
});
