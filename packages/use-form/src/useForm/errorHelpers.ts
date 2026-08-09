import type { FieldName, IError, IErrors, IValues } from "./reducer"

/**
 * Flattens a field's `IError` tree into plain string messages
 * (nested `IErrors` maps are walked recursively).
 */
export const getFieldErrorMessages = (
    error: IError | null | undefined
): string[] => {
    if (!error?.length) {
        return []
    }

    const messages: string[] = []

    for (const item of error) {
        if (typeof item === "string") {
            messages.push(item)
            continue
        }

        for (const nested of Object.values(item)) {
            messages.push(...getFieldErrorMessages(nested))
        }
    }

    return messages
}

/** Returns string error messages for a field name from an errors map. */
export const getFieldError = <T extends IValues = IValues>(
    errors: IErrors<T> | null | undefined,
    name: FieldName<T>
): string[] => {
    return getFieldErrorMessages(errors?.[name])
}
