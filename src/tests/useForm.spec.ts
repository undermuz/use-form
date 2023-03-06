import "@testing-library/jest-dom"

import {
    act,
    renderHook,
    waitFor,
    type RenderHookResult,
} from "@testing-library/react/pure"

import useForm, {
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

    beforeAll(() => {
        renderHookResults = renderHook((config) => useForm(config), {
            initialProps: FORM_CONFIG,
        })
    })

    test("initials values", async () => {
        const { result } = renderHookResults

        await waitFor(() => expect(result.current.values.username).toBe(""))
        await waitFor(() => expect(result.current.values.password).toBe(""))
    })

    test("set values", async () => {
        const { result } = renderHookResults

        act(() => result.current.setValue("username", "some_user_name"))
        act(() => result.current.setValue("password", "some_password"))

        await waitFor(() =>
            expect(result.current.values.username).toBe("some_user_name")
        )
        await waitFor(() =>
            expect(result.current.values.password).toBe("some_password")
        )
    })

    test("validate values without any error", async () => {
        const { result } = renderHookResults

        act(() => result.current.setTouchedByName("username"))
        act(() => result.current.setTouchedByName("password"))

        await waitFor(() => expect(result.current.errors).toEqual({}))
    })

    test("validate values with errors", async () => {
        const { result } = renderHookResults

        act(() => result.current.setValue("username", ""))
        act(() => result.current.setValue("password", ""))

        await waitFor(() =>
            expect(result.current.errors).toEqual({
                password: ["Password is required"],
                username: ["Username is required"],
            })
        )
    })

    test("correct errors", async () => {
        const { result } = renderHookResults

        act(() => result.current.setValue("username", "some_user_name_2"))
        act(() => result.current.setValue("password", "some_password_2"))

        await waitFor(() =>
            expect(result.current.values.username).toBe("some_user_name_2")
        )
        await waitFor(() =>
            expect(result.current.values.password).toBe("some_password_2")
        )

        await waitFor(() => expect(result.current.errors).toEqual({}))
    })
})
