import type { Config } from 'jest'
import { createCjsPreset } from 'jest-preset-angular/presets'

export default {
  ...createCjsPreset(),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/.angular/'],
  collectCoverage: false
} satisfies Config
