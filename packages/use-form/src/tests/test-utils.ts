import { vi } from "vitest"

export { renderHook } from "vitest-browser-react/pure"

export const waitFor = (assertion: () => void, timeout = 2000) =>
    vi.waitFor(assertion, { timeout })
