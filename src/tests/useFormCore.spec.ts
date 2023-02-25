import "@testing-library/jest-dom"

import {
    act,
    renderHook,
    type Renderer,
    type RenderHookResult,
} from "@testing-library/react-hooks/pure"

import { useCallback } from "react"

import useForm, {
    useFormCoreParams,
    type IUseFormField,
    type IUseFormSettings,
    type UseFormConfig,
} from "../useForm/useForm"

import { SET_VALUES, type IValues } from "../useForm/reducer"
import useFormCore from "../useForm/useFormCore"

const isDebug = false

type UseControlledForm = [IValues, (v: IValues) => void, UseFormConfig]

const useCustomForm = (formSettings: IUseFormSettings): UseControlledForm => {
    const [formConfig, formState] = useFormCoreParams(formSettings)

    const form = useFormCore(formConfig, formState)

    const onChange = useCallback((v: any) => {
        if (isDebug) console.log("[useCustomForm][setValue]", v)
        // form.setValues(v)

        formState.dispatch({
            type: SET_VALUES,
            payload: { values: v },
        })
    }, [])

    if (isDebug) console.log("[useCustomForm]", form.values)

    return [form.values, onChange, form]
}

describe("useFormCore", () => {
    const FORM_CONFIG: IUseFormSettings = {
        fields: {
            username: {
                label: "Login",
                rules: [[[Boolean], "Username is required"]],
                initialValue: "",
            },
            password: {
                label: "Password",
                rules: [[[Boolean], "Password is required"]],
                initialValue: "",
            },
        },
        options: {
            debug: isDebug,
        },
    }

    let renderHookResults: RenderHookResult<
        IUseFormSettings,
        UseFormConfig,
        Renderer<IUseFormSettings>
    >

    const getForm = () => {
        const { result } = renderHookResults

        return result.current
    }

    beforeAll(() => {
        renderHookResults = renderHook((config) => useForm(config), {
            initialProps: FORM_CONFIG,
        })
    })

    test("initials values", () => {
        expect(getForm().values.username).toBe("")
        expect(getForm().values.password).toBe("")
    })

    test("set values", () => {
        act(() => getForm().setValue("username", "some_user_name"))
        act(() => getForm().setValue("password", "some_password"))

        expect(getForm().values.username).toBe("some_user_name")
        expect(getForm().values.password).toBe("some_password")
    })

    test("validate values without any error", () => {
        act(() => getForm().setTouchedByName("username"))
        act(() => getForm().setTouchedByName("password"))

        expect(getForm().errors).toEqual({})
    })

    test("validate values with errors", () => {
        act(() => getForm().setValue("username", ""))
        act(() => getForm().setValue("password", ""))

        expect(getForm().errors).toEqual({
            password: ["Password is required"],
            username: ["Username is required"],
        })
    })

    test("correct errors", () => {
        act(() => getForm().setValue("username", "some_user_name_2"))
        act(() => getForm().setValue("password", "some_password_2"))

        expect(getForm().values.username).toBe("some_user_name_2")
        expect(getForm().values.password).toBe("some_password_2")

        expect(getForm().errors).toEqual({})
    })
})

describe("useFormCore/external", () => {
    const FORM_CONFIG: IUseFormSettings = {
        fields: {
            username: {
                label: "Login",
                rules: [[[Boolean], "Username is required"]],
                initialValue: "",
            },
            password: {
                label: "Password",
                rules: [[[Boolean], "Password is required"]],
                initialValue: "",
            },
        },
        options: {
            debug: false,
        },
    }

    let renderHookResults: RenderHookResult<
        IUseFormSettings,
        UseControlledForm,
        Renderer<IUseFormSettings>
    >

    const getForm = () => {
        const { result } = renderHookResults

        return result.current
    }

    beforeAll(() => {
        const username = FORM_CONFIG.fields.username as IUseFormField
        const password = FORM_CONFIG.fields.password as IUseFormField

        username.initialValue = "123"
        password.initialValue = "321"

        renderHookResults = renderHook((config) => useCustomForm(config), {
            initialProps: FORM_CONFIG,
        })
    })

    test("initials values", () => {
        expect(getForm()[2].values.username).toBe("123")
        expect(getForm()[2].values.password).toBe("321")
    })

    test("set values by external state", async () => {
        act(() =>
            getForm()[1]({
                username: "some_user_name",
                password: "some_password",
            })
        )

        expect(getForm()[2].values.username).toBe("some_user_name")
        expect(getForm()[2].values.password).toBe("some_password")
    })

    test("set values by internal methods", async () => {
        act(() => getForm()[2].setValue("username", "some_user_name_2"))
        act(() => getForm()[2].setValue("password", "some_password_2"))

        expect(getForm()[2].values.username).toBe("some_user_name_2")
        expect(getForm()[2].values.password).toBe("some_password_2")

        expect(getForm()[0].username).toBe("some_user_name_2")
        expect(getForm()[0].password).toBe("some_password_2")
    })

    test("validate values without any error", () => {
        act(() => getForm()[2].setTouchedByName("username"))
        act(() => getForm()[2].setTouchedByName("password"))

        expect(getForm()[2].errors).toEqual({})
    })

    test("validate values with errors", async () => {
        act(() =>
            getForm()[1]({
                username: "",
                password: "",
            })
        )

        expect(getForm()[2].errors).toEqual({
            password: ["Password is required"],
            username: ["Username is required"],
        })
    })

    test("correct errors", async () => {
        act(() =>
            getForm()[1]({
                username: "some_user_name_3",
                password: "some_password_3",
            })
        )

        expect(getForm()[2].values.username).toBe("some_user_name_3")
        expect(getForm()[2].values.password).toBe("some_password_3")

        expect(getForm()[2].errors).toEqual({})
    })

    test("send form error", async () => {
        const mockOnSend = jest.fn(() =>
            Promise.reject(new Error("Mock api error"))
        )

        await act(async () => {
            await expect(getForm()[2].send(mockOnSend)).rejects.toThrowError(
                "Request has failed"
            )
        })

        expect(mockOnSend.mock.calls.length).toBe(1)

        //@ts-ignore
        expect(mockOnSend.mock.calls[0][0]).toEqual({
            username: "some_user_name_3",
            password: "some_password_3",
        })

        expect(getForm()[2].values.username).toBe("some_user_name_3")
        expect(getForm()[2].values.password).toBe("some_password_3")

        expect(getForm()[2].errors).toEqual({})
    })

    test("send form success", async () => {
        const mockOnSend = jest.fn(() => Promise.resolve())

        await act(async () => {
            await getForm()[2].send(mockOnSend)
        })

        expect(mockOnSend.mock.calls.length).toBe(1)

        //@ts-ignore
        expect(mockOnSend.mock.calls[0][0]).toEqual({
            username: "some_user_name_3",
            password: "some_password_3",
        })

        expect(getForm()[2].values.username).toBe("some_user_name_3")
        expect(getForm()[2].values.password).toBe("some_password_3")

        expect(getForm()[2].errors).toEqual({})
    })
})
