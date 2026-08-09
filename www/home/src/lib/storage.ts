import type { IBlockResultValue } from "@undermuz/react-page-builder"

/** Bump when DEFAULT_PAGE gains/removes seed blocks so sessions pick up the new layout. */
export const PAGE_STORAGE_KEY = "uf-home-page-v1"

export function loadPageValue(
    fallback: IBlockResultValue[]
): IBlockResultValue[] {
    try {
        const raw = sessionStorage.getItem(PAGE_STORAGE_KEY)
        if (!raw) return fallback
        const parsed = JSON.parse(raw) as unknown
        if (!Array.isArray(parsed)) return fallback
        return parsed as IBlockResultValue[]
    } catch {
        return fallback
    }
}

export function savePageValue(value: IBlockResultValue[]): void {
    try {
        sessionStorage.setItem(PAGE_STORAGE_KEY, JSON.stringify(value))
    } catch {
        // ignore quota / private mode errors
    }
}

export function clearPageValue(): void {
    try {
        sessionStorage.removeItem(PAGE_STORAGE_KEY)
    } catch {
        // ignore
    }
}

export function downloadPageValue(value: IBlockResultValue[]): void {
    const blob = new Blob([JSON.stringify(value, null, 2)], {
        type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "home-page-value.json"
    a.click()
    URL.revokeObjectURL(url)
}
