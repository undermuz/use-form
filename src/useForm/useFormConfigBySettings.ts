import { useMemo } from "react"

import type {
    IUseFormField,
    IUseFormFieldRule,
    IUseFormOptions,
    IUseFormSettings,
    TypeUseFormField,
} from "./useForm"

const useFormConfigBySettings = (props: IUseFormSettings): IUseFormOptions => {
    return useMemo<IUseFormOptions>(() => {
        const _config = {
            initialValues: props.value ? props.value : {},
            valueTests: [],
            fields: {},
            ...(props.options || {}),
        }

        Object.keys(props.fields).forEach((fieldName: string) => {
            const _field: TypeUseFormField = props.fields[fieldName]

            let field: IUseFormField

            if (typeof _field === "string") {
                field = {
                    label: _field,
                    initialValue: undefined,
                    rules: [],
                }
            } else {
                field = _field
            }

            _config.fields[fieldName] = field.label || fieldName

            if (!props.value)
                _config.initialValues[fieldName] = field.initialValue

            if (field.rules?.length) {
                field.rules.forEach((rule: IUseFormFieldRule) => {
                    _config.valueTests.push([[fieldName], ...rule])
                })
            }
        })

        return _config
    }, [])
}

export default useFormConfigBySettings
