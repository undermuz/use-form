import {
    renderHook,
    waitFor,
} from "./test-utils"
import type { RenderHookResult } from "vitest-browser-react"

import {
    useForm,
    type IUseFormSettings,
    type UseFormConfig,
} from "../useForm/useForm"

const isDebug = false

describe("useForm", () => {
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

    const waitForFilled = async (name: string, value: unknown = "") => {
        const { result } = renderHookResults

        await waitFor(() => expect(result.current.values[name]).toBe(value))
        await waitFor(() =>
            expect(result.current.getValues()[name]).toBe(value)
        )
    }

    const waitForErrors = async (errors: Record<string, unknown>) => {
        const { result } = renderHookResults

        await waitFor(() => expect(result.current.errors).toEqual(errors))
        await waitFor(() => expect(result.current.getErrors()).toEqual(errors))
        await waitFor(() =>
            expect(result.current.hasFormErrors(true)).toEqual([
                !!Object.keys(errors).length,
                errors,
            ])
        )
    }

    beforeAll(async () => {
        renderHookResults = await renderHook(
            (config = FORM_CONFIG) => useForm(config),
            {
                initialProps: FORM_CONFIG,
            }
        )
    })

    test("initials values", async () => {
        await waitForFilled("username", "")
        await waitForFilled("password", "")
    })

    test("set values", async () => {
        const { result, act } = renderHookResults

        await act(() => result.current.setValue("username", "some_user_name"))
        await act(() => result.current.setValue("password", "some_password"))

        await waitForFilled("username", "some_user_name")
        await waitForFilled("password", "some_password")
    })

    test("validate values without any error", async () => {
        const { result, act } = renderHookResults

        await act(() => result.current.setTouchedByName("username"))
        await act(() => result.current.setTouchedByName("password"))

        await waitForErrors({})
    })

    test("validate values with errors", async () => {
        const { result, act } = renderHookResults

        await act(() => result.current.setValue("username", ""))
        await act(() => result.current.setValue("password", ""))

        await waitForErrors({
            password: ["Password is required"],
            username: ["Username is required"],
        })
    })

    test("correct errors", async () => {
        const { result, act } = renderHookResults

        await act(() => result.current.setValue("username", "some_user_name_2"))
        await act(() => result.current.setValue("password", "some_password_2"))

        await waitForFilled("username", "some_user_name_2")
        await waitForFilled("password", "some_password_2")

        await waitForErrors({})
    })
})
