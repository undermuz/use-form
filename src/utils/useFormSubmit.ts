import { useCallback } from "react"

import { useFormContext } from "../components/form-context"

export const useFormSubmit = (
    onSend: Function,
    onSucceed: (value: any) => any,
    onError?: (reason: any) => any
) => {
    const {
        send,
        config: { debug = false },
    } = useFormContext()

    const handleSave = useCallback(() => {
        if (debug) console.log(`[useFormSubmit][Start sending]`)

        send(onSend).then<any, any>(onSucceed, onError)

        if (debug) console.log(`[useFormSubmit][Sent]`)
    }, [send, onSend, onSucceed, onError])

    return handleSave
}
