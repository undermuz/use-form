import { renderHook, waitFor } from "./test-utils"
import type { RenderHookResult } from "vitest-browser-react"

import {
    useForm,
    type IUseFormSettings,
    type UseFormConfig,
} from "../useForm/useForm"

const isDebug = false

describe("useFormOnError", () => {
    const mockOnError = vi.fn()

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

        await waitFor(() => expect(mockOnError.mock.calls.length).toBe(0))
        await waitFor(() => expect(getForm().errors).toEqual({}))
    })

    test("validate values with errors", async () => {
        const { act } = renderHookResults

        await act(() => getForm().setValue("username", ""))
        await act(() => getForm().setValue("password", ""))

        await waitFor(() => expect(mockOnError.mock.calls.length).toBe(2))

        await waitFor(() =>
            expect(mockOnError.mock.calls[1][0]).toEqual({
                password: ["Password is required"],
                username: ["Username is required"],
            })
        )

        await waitFor(() =>
            expect(getForm().errors).toEqual({
                password: ["Password is required"],
                username: ["Username is required"],
            })
        )
    })

    test("custom errors", async () => {
        const { act } = renderHookResults

        await act(() =>
            getForm().setCustomErrorByName("username", [
                "custom error",
                {
                    security: ["0.5"],
                },
            ])
        )

        await waitFor(() => expect(mockOnError.mock.calls.length).toBe(3))

        await waitFor(() =>
            expect(mockOnError.mock.calls[2][0]).toEqual({
                password: ["Password is required"],
                username: [
                    "Username is required",
                    "custom error",
                    {
                        security: ["0.5"],
                    },
                ],
            })
        )

        await waitFor(() =>
            expect(getForm().errors).toEqual({
                password: ["Password is required"],
                username: [
                    "Username is required",
                    "custom error",
                    {
                        security: ["0.5"],
                    },
                ],
            })
        )

        await waitFor(() =>
            expect(getForm().customErrors).toEqual({
                username: [
                    "custom error",
                    {
                        security: ["0.5"],
                    },
                ],
            })
        )

        await act(() => getForm().setValue("username", "some_user_name_2"))
        await waitFor(() =>
            expect(getForm().values.username).toBe("some_user_name_2")
        )

        await waitFor(() => expect(mockOnError.mock.calls.length).toBe(4))

        await waitFor(() =>
            expect(mockOnError.mock.calls[3][0]).toEqual({
                password: ["Password is required"],
                username: [
                    "custom error",
                    {
                        security: ["0.5"],
                    },
                ],
            })
        )

        await waitFor(() =>
            expect(getForm().errors).toEqual({
                password: ["Password is required"],
                username: [
                    "custom error",
                    {
                        security: ["0.5"],
                    },
                ],
            })
        )

        await waitFor(() =>
            expect(getForm().customErrors).toEqual({
                username: [
                    "custom error",
                    {
                        security: ["0.5"],
                    },
                ],
            })
        )
    })

    test("correct errors", async () => {
        const { act } = renderHookResults

        await act(() => getForm().setCustomErrorByName("username", []))
        await act(() => getForm().setValue("password", "some_password_2"))

        await waitFor(() =>
            expect(getForm().values.password).toBe("some_password_2")
        )

        await waitFor(() => expect(mockOnError.mock.calls.length).toBe(6))
        await waitFor(() => expect(mockOnError.mock.calls[5][0]).toEqual({}))
        await waitFor(() => expect(getForm().errors).toEqual({}))
        await waitFor(() =>
            expect(getForm().customErrors).toEqual({
                username: [],
            })
        )
    })
})
