import type { IUseFormSettings, UseFormConfig } from "./useForm"

import { useEffect, useRef } from "react"
import { isEqual } from "underscore"
import { useRefBy } from "../utils/common"

const useControlledForm = (form: UseFormConfig, props: IUseFormSettings) => {
    const { value, onChange, options } = props

    const valueRef = useRef(value)
    const onChangeRef = useRefBy(onChange)

    const mountFlag = useRef(false)

    useEffect(() => {
        if (!value) {
            return
        }

        if (value === valueRef.current) {
            return
        }

        if (isEqual(value, valueRef.current)) {
            return
        }

        if (options?.debug)
            console.log("[useForm][Update values from external]", {
                external: value,
                current: valueRef.current,
            })

        valueRef.current = value

        form.setValues(value)
    }, [value])

    useEffect(() => {
        if (!mountFlag.current) {
            mountFlag.current = true

            return
        }

        if (!onChangeRef.current) {
            return
        }

        if (
            valueRef.current !== form.values &&
            !isEqual(valueRef.current, form.values)
        ) {
            if (options?.debug)
                console.log("[useForm][Emit values to external]", {
                    current: form.values,
                    external: valueRef.current,
                })

            valueRef.current = form.values

            onChangeRef.current(form.values)
        }
    }, [form.values])

    useEffect(() => {
        if (!value) {
            return
        }

        if (value === form.store.getState().values) {
            return
        }

        if (options?.debug)
            console.log("[useForm][Set initials values]", {
                external: value,
                current: form.store.getState().values,
            })

        form.setValues(value)
    }, [])
}

export { useControlledForm }
