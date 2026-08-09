import { useCallback } from "react"
import type { RenderHookResult } from "vitest-browser-react"

import { renderHook, waitFor } from "./test-utils"

import {
    useForm,
    useFormCoreParams,
    type IUseFormField,
    type IUseFormSettings,
    type UseFormConfig,
} from "../useForm/useForm"

import { FORM_ACTIONS, type IValues } from "../useForm/reducer"
import { useFormCore } from "../useForm/useFormCore"

const isDebug = false

type UseControlledForm = [IValues, (v: IValues) => void, UseFormConfig]

const useCustomForm = (formSettings: IUseFormSettings): UseControlledForm => {
    const [formConfig, formState] = useFormCoreParams(formSettings)

    const form = useFormCore(formConfig, formState)

    const onChange = useCallback((v: unknown) => {
        if (isDebug) console.log("[useCustomForm][setValue]", v)

        formState.dispatch({
            type: FORM_ACTIONS.SET_VALUES,
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

    let renderHookResults: RenderHookResult<UseFormConfig, IUseFormSettings>

    const getForm = () => renderHookResults.result.current

    beforeAll(async () => {
        renderHookResults = await renderHook(
            (config = FORM_CONFIG) => useForm(config),
            {
                initialProps: FORM_CONFIG,
            }
        )
    })

    test("initials values", async () => {
        await waitFor(() => expect(getForm().values.username).toBe(""))
        await waitFor(() => expect(getForm().values.password).toBe(""))
    })

    test("set values", async () => {
        const { act } = renderHookResults

        await act(() => getForm().setValue("username", "some_user_name"))
        await act(() => getForm().setValue("password", "some_password"))

        await waitFor(() =>
            expect(getForm().values.username).toBe("some_user_name")
        )
        await waitFor(() =>
            expect(getForm().values.password).toBe("some_password")
        )
    })

    test("validate values without any error", async () => {
        const { act } = renderHookResults

        await act(() => getForm().setTouchedByName("username"))
        await act(() => getForm().setTouchedByName("password"))

        await waitFor(() => expect(getForm().errors).toEqual({}))
    })

    test("validate values with errors", async () => {
        const { act } = renderHookResults

        await act(() => getForm().setValue("username", ""))
        await act(() => getForm().setValue("password", ""))

        await waitFor(() =>
            expect(getForm().errors).toEqual({
                password: ["Password is required"],
                username: ["Username is required"],
            })
        )
    })

    test("correct errors", async () => {
        const { act } = renderHookResults

        await act(() => getForm().setValue("username", "some_user_name_2"))
        await act(() => getForm().setValue("password", "some_password_2"))

        await waitFor(() =>
            expect(getForm().values.username).toBe("some_user_name_2")
        )
        await waitFor(() =>
            expect(getForm().values.password).toBe("some_password_2")
        )
        await waitFor(() => expect(getForm().errors).toEqual({}))
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
        UseControlledForm,
        IUseFormSettings
    >

    const getForm = () => renderHookResults.result.current

    beforeAll(async () => {
        const username = FORM_CONFIG.fields.username as IUseFormField
        const password = FORM_CONFIG.fields.password as IUseFormField

        username.initialValue = "123"
        password.initialValue = "321"

        renderHookResults = await renderHook(
            (config = FORM_CONFIG) => useCustomForm(config),
            {
                initialProps: FORM_CONFIG,
            }
        )
    })

    test("initials values", async () => {
        await waitFor(() => expect(getForm()[2].values.username).toBe("123"))
        await waitFor(() => expect(getForm()[2].values.password).toBe("321"))
    })

    test("set values by external state", async () => {
        const { act } = renderHookResults

        await act(() =>
            getForm()[1]({
                username: "some_user_name",
                password: "some_password",
            })
        )

        await waitFor(() =>
            expect(getForm()[2].values.username).toBe("some_user_name")
        )
        await waitFor(() =>
            expect(getForm()[2].values.password).toBe("some_password")
        )
    })

    test("set values by internal methods", async () => {
        const { act } = renderHookResults

        await act(() => getForm()[2].setValue("username", "some_user_name_2"))
        await act(() => getForm()[2].setValue("password", "some_password_2"))

        await waitFor(() =>
            expect(getForm()[2].values.username).toBe("some_user_name_2")
        )
        await waitFor(() =>
            expect(getForm()[2].values.password).toBe("some_password_2")
        )
        await waitFor(() =>
            expect(getForm()[0].username).toBe("some_user_name_2")
        )
        await waitFor(() =>
            expect(getForm()[0].password).toBe("some_password_2")
        )
    })

    test("validate values without any error", async () => {
        const { act } = renderHookResults

        await act(() => getForm()[2].setTouchedByName("username"))
        await act(() => getForm()[2].setTouchedByName("password"))

        expect(getForm()[2].errors).toEqual({})
    })

    test("validate values with errors", async () => {
        const { act } = renderHookResults

        await act(() =>
            getForm()[1]({
                username: "",
                password: "",
            })
        )

        await waitFor(() =>
            expect(getForm()[2].errors).toEqual({
                password: ["Password is required"],
                username: ["Username is required"],
            })
        )
    })

    test("correct errors", async () => {
        const { act } = renderHookResults

        await act(() =>
            getForm()[1]({
                username: "some_user_name_3",
                password: "some_password_3",
            })
        )

        await waitFor(() =>
            expect(getForm()[2].values.username).toBe("some_user_name_3")
        )
        await waitFor(() =>
            expect(getForm()[2].values.password).toBe("some_password_3")
        )
        await waitFor(() => expect(getForm()[2].errors).toEqual({}))
    })

    test("send form error", async () => {
        const { act } = renderHookResults
        const mockOnSend = vi.fn(async (_values: IValues) => {
            return Promise.reject(new Error("Mock api error"))
        })

        await act(async () => {
            await expect(getForm()[2].send(mockOnSend)).rejects.toThrow(
                "Request has failed"
            )
        })

        await waitFor(() => expect(mockOnSend.mock.calls.length).toBe(1))
        await waitFor(() =>
            expect(mockOnSend.mock.calls[0]?.[0]).toEqual({
                username: "some_user_name_3",
                password: "some_password_3",
            })
        )
        await waitFor(() =>
            expect(getForm()[2].values.username).toBe("some_user_name_3")
        )
        await waitFor(() =>
            expect(getForm()[2].values.password).toBe("some_password_3")
        )
        await waitFor(() => expect(getForm()[2].errors).toEqual({}))
    })

    test("send form success", async () => {
        const { act } = renderHookResults
        const mockOnSend = vi.fn(async (_values: IValues) => {
            return Promise.resolve()
        })

        await act(async () => {
            await getForm()[2].send(mockOnSend)
        })

        await waitFor(() => expect(mockOnSend.mock.calls.length).toBe(1))
        await waitFor(() =>
            expect(mockOnSend.mock.calls[0]?.[0]).toEqual({
                username: "some_user_name_3",
                password: "some_password_3",
            })
        )
        await waitFor(() =>
            expect(getForm()[2].values.username).toBe("some_user_name_3")
        )
        await waitFor(() =>
            expect(getForm()[2].values.password).toBe("some_password_3")
        )
        await waitFor(() => expect(getForm()[2].errors).toEqual({}))
    })
})
