import "@testing-library/jest-dom"

import {
    act,
    renderHook,
    waitFor,
    type RenderHookResult,
} from "@testing-library/react/pure"

import { useCallback, useMemo, useState } from "react"

import {
    useForm,
    type FormSettingsTypeFields,
    type IUseFormField,
    type IUseFormSettings,
    type UseFormConfig,
} from "../useForm/useForm"

import { type IValues } from "../useForm/reducer"

type UseControlledForm = [IValues, (v: IValues) => void, UseFormConfig]

const isDebug = false

const useControlledForm = (props: IUseFormSettings): UseControlledForm => {
    const [value, setValue] = useState<IValues>(() => {
        return Object.keys(props.fields).reduce<FormSettingsTypeFields>(
            (acc, name) => {
                acc[name] = (props.fields[name] as IUseFormField)
                    .initialValue as string

                return acc
            },
            {}
        )
    })

    const onChange = useCallback((v: any) => {
        if (isDebug) console.log("setValue", v)
        setValue(v)
    }, [])

    const formConfig = useMemo<IUseFormSettings>(() => {
        return {
            ...props,
            value,
            onChange: (v: IValues) => onChange(v),
        }
    }, [value])

    const form = useForm(formConfig)

    if (isDebug) console.log("[useControlledForm]", form.values)

    return [value, onChange, form]
}

describe("useControlledForm", () => {
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

    let renderHookResults: RenderHookResult<UseControlledForm, IUseFormSettings>

    beforeAll(() => {
        const username = FORM_CONFIG.fields.username as IUseFormField
        const password = FORM_CONFIG.fields.password as IUseFormField

        username.initialValue = "123"
        password.initialValue = "321"

        renderHookResults = renderHook((config) => useControlledForm(config), {
            initialProps: FORM_CONFIG,
        })
    })

    test("initials values", async () => {
        const { result } = renderHookResults

        await waitFor(() =>
            expect(result.current[2].values.username).toBe("123")
        )
        await waitFor(() =>
            expect(result.current[2].values.password).toBe("321")
        )
    })

    test("set values by external state", async () => {
        const { result, rerender } = renderHookResults

        act(() =>
            result.current[1]({
                username: "some_user_name",
                password: "some_password",
            })
        )

        rerender(FORM_CONFIG)

        await waitFor(() =>
            expect(result.current[2].values.username).toBe("some_user_name")
        )
        await waitFor(() =>
            expect(result.current[2].values.password).toBe("some_password")
        )
    })

    test("set values by internal methods", async () => {
        const { result } = renderHookResults

        act(() => result.current[2].setValue("username", "some_user_name_2"))
        act(() => result.current[2].setValue("password", "some_password_2"))

        await waitFor(() =>
            expect(result.current[2].values.username).toBe("some_user_name_2")
        )
        await waitFor(() =>
            expect(result.current[2].values.password).toBe("some_password_2")
        )

        await waitFor(() =>
            expect(result.current[0].username).toBe("some_user_name_2")
        )
        await waitFor(() =>
            expect(result.current[0].password).toBe("some_password_2")
        )
    })

    test("validate values without any error", async () => {
        const { result } = renderHookResults

        act(() => result.current[2].setTouchedByName("username"))
        act(() => result.current[2].setTouchedByName("password"))

        await waitFor(() => expect(result.current[2].errors).toEqual({}))
    })

    test("validate values with errors", async () => {
        const { result } = renderHookResults

        act(() =>
            result.current[1]({
                username: "",
                password: "",
            })
        )

        await waitFor(() =>
            expect(result.current[2].errors).toEqual({
                password: ["Password is required"],
                username: ["Username is required"],
            })
        )
    })

    test("correct errors", async () => {
        const { result } = renderHookResults

        act(() =>
            result.current[1]({
                username: "some_user_name_3",
                password: "some_password_3",
            })
        )

        await waitFor(() =>
            expect(result.current[2].values.username).toBe("some_user_name_3")
        )
        await waitFor(() =>
            expect(result.current[2].values.password).toBe("some_password_3")
        )

        await waitFor(() => expect(result.current[2].errors).toEqual({}))
    })

    test("send form error", async () => {
        const { result } = renderHookResults

        const mockOnSend = jest.fn(() => Promise.reject())

        await act(async () => {
            await expect(
                result.current[2].send(mockOnSend)
            ).rejects.toThrowError("Request has failed")
        })

        await waitFor(() => expect(mockOnSend.mock.calls.length).toBe(1))

        await waitFor(() =>
            //@ts-ignore
            expect(mockOnSend.mock.calls[0][0]).toEqual({
                username: "some_user_name_3",
                password: "some_password_3",
            })
        )

        await waitFor(() =>
            expect(result.current[2].values.username).toBe("some_user_name_3")
        )
        await waitFor(() =>
            expect(result.current[2].values.password).toBe("some_password_3")
        )

        await waitFor(() => expect(result.current[2].errors).toEqual({}))
    })

    test("send form success", async () => {
        const { result } = renderHookResults

        const mockOnSend = jest.fn(() => Promise.resolve())

        await act(async () => {
            await result.current[2].send(mockOnSend)
        })

        await waitFor(() => expect(mockOnSend.mock.calls.length).toBe(1))

        await waitFor(() =>
            //@ts-ignore
            expect(mockOnSend.mock.calls[0][0]).toEqual({
                username: "some_user_name_3",
                password: "some_password_3",
            })
        )

        await waitFor(() =>
            expect(result.current[2].values.username).toBe("some_user_name_3")
        )
        await waitFor(() =>
            expect(result.current[2].values.password).toBe("some_password_3")
        )

        await waitFor(() => expect(result.current[2].errors).toEqual({}))
    })
})
