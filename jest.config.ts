import type { Config } from "jest";
import presets from "jest-preset-angular/presets";

export default {
  ...presets.createCjsPreset(),
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  roots: ["<rootDir>/projects/ngx-voyage"],
  coverageReporters: ["json", "text"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
} satisfies Config;
