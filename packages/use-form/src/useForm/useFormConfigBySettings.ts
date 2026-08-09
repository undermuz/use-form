import { useMemo } from "react"

import type {
    IUseFormField,
    IUseFormFieldRule,
    IFormConfig,
    IUseFormSettings,
    TypeUseFormField,
    FormSettingsTypeFields,
    InferValuesFromFields,
} from "./useForm"
import type { IFields, IValueTest } from "./reducer"

const useFormConfigBySettings = <
    F extends FormSettingsTypeFields = FormSettingsTypeFields
>(
    props: IUseFormSettings<F>
): IFormConfig<InferValuesFromFields<F>> => {
    return useMemo(() => {
        type Values = InferValuesFromFields<F>

        const options = props.options || {}

        const initialValues: Record<string, unknown> = props.value
            ? { ...props.value }
            : {}

        const valueTests: IValueTest<Values>[] = [
            ...((options.valueTests || []) as IValueTest<Values>[]),
        ]
        const fields: IFields = { ...(options.fields || {}) }

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

            fields[fieldName] = field.label || fieldName

            if (!props.value || props.value[fieldName as keyof Values] === undefined) {
                initialValues[fieldName] = field.initialValue
            }

            if (field.rules?.length) {
                field.rules.forEach((rule: IUseFormFieldRule) => {
                    const test: IValueTest<Values> = [
                        [fieldName as keyof Values & string],
                        ...rule,
                    ]
                    valueTests.push(test)
                })
            }
        })

        return {
            ...options,
            initialValues: initialValues as Values,
            valueTests,
            fields,
        }
    }, [])
}

export { useFormConfigBySettings }
