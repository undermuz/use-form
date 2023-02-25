import { useEffect, useRef } from "react"
import { isEqual } from "underscore"
import { useRefBy } from "../../utils/common"
import type { IUseFormSettings, UseFormConfig } from "../useForm"

const useFormOnError = (form: UseFormConfig, props: IUseFormSettings) => {
    const { onError, options } = props

    const onErrorRef = useRefBy(onError)

    const errorsRef = useRef(form.errors)

    useEffect(() => {
        if (!isEqual(errorsRef.current, form.errors)) {
            if (options?.debug)
                console.log(
                    "[useForm][On: Error]",
                    errorsRef.current,
                    form.errors
                )

            errorsRef.current = form.errors

            onErrorRef.current?.(form.errors)
        }
    }, [form.errors])
}

export default useFormOnError
