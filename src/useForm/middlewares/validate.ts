import type { DispatchFunction, IAction, IStore } from "../../utils/useReducer"
import type { IUseIsFormSettings } from "../helpers"
import { FORM_ACTIONS, type IFormState, type IErrors } from "../reducer"

export const getFormErrors = (state: IFormState): IErrors => {
    const { tests, touched, values } = state

    const errors: IErrors = {}

    for (let index = 0; index < tests.length; index++) {
        const [names, testList, errorText = "Invalid"] = tests[index]

        for (const name of names) {
            if (!touched.includes(name)) {
                continue
            }

            for (const valueTest of testList) {
                if (valueTest(values[name])) {
                    continue
                }

                if (!errors[name]) {
                    errors[name] = []
                }

                const fieldErrors: string[] = errors[name] as string[]

                fieldErrors.push(errorText)

                break
            }
        }
    }

    return errors
}

const getValidateFunction = (action: IAction, store: IStore<IFormState>) => {
    const { validate: customValidate = null } = action.payload

    const state = store.getState()

    return customValidate ?? state.validate
}

const validateEffect = (
    action: IAction,
    store: IStore<IFormState>,
    settings: IUseIsFormSettings = {}
) => {
    const { silent = false, checkOnlyFilled = true } = action
    const { debug = false } = settings

    const triggers = [
        FORM_ACTIONS.SET_VALUE,
        FORM_ACTIONS.SET_VALUES,
        FORM_ACTIONS.SET_TESTS,
        FORM_ACTIONS.SET_TOUCHED_FIELD,
        FORM_ACTIONS.SET_TOUCHED,
        FORM_ACTIONS.SET_FIELDS,
        FORM_ACTIONS.SET_VALIDATE,
        FORM_ACTIONS.VALIDATE_FORM,
    ]

    if (!triggers.some((t) => action.type === t) || silent) {
        return
    }

    const state = store.getState()

    const validate = getValidateFunction(action, store)

    const validatedTouched = checkOnlyFilled
        ? state.touched
        : Object.keys(state.fields)

    const validateState = {
        ...state,
        touched: validatedTouched,
    }

    const newErrors: IErrors = validate(validateState, debug)

    store.dispatch({
        type: FORM_ACTIONS.SET_ERRORS,
        payload: { errors: newErrors },
    })
}

const createValidating =
    (settings: IUseIsFormSettings = {}) =>
    (store: IStore<IFormState>) =>
    (next: DispatchFunction) =>
    (action: IAction) => {
        const result = next(action)

        validateEffect(action, store, settings)

        return result
    }

export default createValidating
