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

describe("useFormOnError", () => {
    const mockOnError = jest.fn()

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
        onError: mockOnError,
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

        expect(mockOnError.mock.calls.length).toBe(0)

        expect(getForm().errors).toEqual({})
    })

    test("validate values with errors", () => {
        act(() => getForm().setValue("username", ""))
        act(() => getForm().setValue("password", ""))

        expect(mockOnError.mock.calls.length).toBe(2)

        //@ts-ignore
        expect(mockOnError.mock.calls[1][0]).toEqual({
            password: ["Password is required"],
            username: ["Username is required"],
        })

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

        expect(mockOnError.mock.calls.length).toBe(4)

        //@ts-ignore
        expect(mockOnError.mock.calls[3][0]).toEqual({})

        expect(getForm().errors).toEqual({})
    })
})
