import "@testing-library/jest-dom"

import {
    act,
    renderHook,
    type Renderer,
    type RenderHookResult,
} from "@testing-library/react-hooks/pure"

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
            debug: isDebug
        }
    }

    let renderHookResults: RenderHookResult<
        IUseFormSettings,
        UseFormConfig,
        Renderer<IUseFormSettings>
    >

    beforeAll(() => {
        renderHookResults = renderHook((config) => useForm(config), {
            initialProps: FORM_CONFIG,
        })
    })

    test("initials values", () => {
        const { result } = renderHookResults

        expect(result.current.values.username).toBe("")
        expect(result.current.values.password).toBe("")
    })

    test("set values", () => {
        const { result } = renderHookResults

        act(() => result.current.setValue("username", "some_user_name"))
        act(() => result.current.setValue("password", "some_password"))

        expect(result.current.values.username).toBe("some_user_name")
        expect(result.current.values.password).toBe("some_password")
    })

    test("validate values without any error", () => {
        const { result } = renderHookResults

        act(() => result.current.setTouchedByName("username"))
        act(() => result.current.setTouchedByName("password"))

        expect(result.current.errors).toEqual({})
    })

    test("validate values with errors", () => {
        const { result } = renderHookResults

        act(() => result.current.setValue("username", ""))
        act(() => result.current.setValue("password", ""))

        expect(result.current.errors).toEqual({
            password: ["Password is required"],
            username: ["Username is required"],
        })
    })

    test("correct errors", () => {
        const { result } = renderHookResults

        act(() => result.current.setValue("username", "some_user_name_2"))
        act(() => result.current.setValue("password", "some_password_2"))

        expect(result.current.values.username).toBe("some_user_name_2")
        expect(result.current.values.password).toBe("some_password_2")

        expect(result.current.errors).toEqual({})
    })
})
