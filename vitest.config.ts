import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['test/**/*.spec.ts'],
        coverage: {
            provider: 'istanbul',
            include: ['src'],
            exclude: ['src/**/*.type.ts'],
        },
    },
});
