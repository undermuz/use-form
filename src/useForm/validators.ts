import type { FieldValidator } from "./reducer"

/** Passes when the value is truthy (same idea as using `Boolean` in rules). */
export const required: FieldValidator = (value) => Boolean(value)

/** Passes when the value is a string with at least `min` characters. */
export const minLength =
    (min: number): FieldValidator =>
    (value) =>
        typeof value === "string" && value.length >= min

/** Passes when the value is a string that matches `pattern`. */
export const pattern =
    (re: RegExp): FieldValidator =>
    (value) =>
        typeof value === "string" && re.test(value)
