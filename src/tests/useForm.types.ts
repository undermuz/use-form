/**
 * Compile-time checks for Values inference and field-name typing.
 * Not executed as a Jest suite — validated by `tsc --noEmit`.
 */
import type {
    IConnectToForm,
    IConnectToFormRender,
    IConnectedProps,
} from "../components/connect-to-form"
import type { FieldValidator, IValueTest } from "../useForm/reducer"
import { useForm } from "../useForm/useForm"
import { getFieldError, getFieldErrorMessages } from "../useForm/errorHelpers"
import { minLength, required } from "../useForm/validators"

const inferred = useForm({
    fields: {
        username: {
            label: "Login",
            initialValue: "",
        },
        age: {
            label: "Age",
            initialValue: 0,
        },
        note: "Note",
    },
})

const username: string = inferred.values.username
const age: number = inferred.values.age
const note: unknown = inferred.values.note

inferred.setValue("username", "alice")
inferred.setValue("age", 21)
inferred.setTouchedByName("username")
inferred.setCustomErrorByName("age", ["must be positive"])
inferred.setTouched(["username", "age"])
inferred.setErrors({ username: ["required"] })

const values = inferred.getValues()
const valuesUsername: string = values.username
const usernameErrors = inferred.errors.username

void username
void age
void note
void valuesUsername
void usernameErrors

// @ts-expect-error — wrong value type for age
inferred.setValue("age", "21")

// @ts-expect-error — unknown field name
inferred.setValue("missing", "x")

// @ts-expect-error — unknown field name
inferred.setTouchedByName("missing")

// @ts-expect-error — unknown field name
inferred.setCustomErrorByName("missing", ["x"])

// @ts-expect-error — unknown field name in touched list
inferred.setTouched(["missing"])

// @ts-expect-error — unknown field name in errors map
inferred.setErrors({ missing: ["x"] })

type LoginForm = {
    username: string | null
    age: number
}

const explicit = useForm<LoginForm>({
    fields: {
        username: {
            label: "Login",
            initialValue: null,
        },
        age: {
            label: "Age",
            initialValue: 0,
        },
    },
})

const explicitUsername: string | null = explicit.values.username
explicit.setValue("username", "123")
explicit.setValue("username", null)
explicit.setTouchedByName("username")
explicit.setCustomErrorByName("username", ["required"])

void explicitUsername

// @ts-expect-error — number is not string | null
explicit.setValue("username", 21)

// @ts-expect-error — unknown field name
explicit.setTouchedByName("password")

type ConnectName = IConnectToForm<LoginForm>["name"]
const connectOk: ConnectName = "username"
void connectOk

// @ts-expect-error — unknown ConnectToForm field name
const connectBad: IConnectToForm<LoginForm>["name"] = "password"
void connectBad

type UsernameConnected = IConnectedProps<LoginForm, "username">
const usernameValue: UsernameConnected["value"] = null
const onUsernameChange: UsernameConnected["onChange"] = (v) => {
    const next: string | null = v
    void next
}
void usernameValue
void onUsernameChange

const renderField: IConnectToFormRender<LoginForm, "username"> = {
    name: "username",
    children: (props) => {
        const v: string | null = props.value
        props.onChange("alice")
        props.onChange(null)
        void v
        return null
    },
}
void renderField

// @ts-expect-error — wrong value type for username field
const badConnectedChange: UsernameConnected["onChange"] = (v: number) => {
    void v
}
void badConnectedChange

const narrowed = useForm({
    fields: {
        username: {
            label: "Login",
            initialValue: null as string | null,
        },
        age: {
            label: "Age",
            initialValue: 0,
        },
    },
})

const narrowedUsername: string | null = narrowed.values.username
narrowed.setValue("username", "123")
narrowed.setValue("username", null)

void narrowedUsername

// @ts-expect-error — number is not string | null
narrowed.setValue("username", 21)

const crossField: FieldValidator<LoginForm> = (value, values) =>
    Boolean(value) && values.age >= 0

const validated = useForm<LoginForm>({
    fields: {
        username: {
            label: "Login",
            initialValue: null,
            rules: [[[required, minLength(3), Boolean], "Username is invalid"]],
        },
        age: {
            label: "Age",
            initialValue: 0,
            rules: [[[crossField], "Age is invalid"]],
        },
    },
})

const okTest: IValueTest<LoginForm> = [
    ["username", "age"],
    [required, crossField],
    "invalid",
]
validated.setTests([okTest])

void validated
void crossField

// @ts-expect-error — unknown field name in value test
const badTest: IValueTest<LoginForm> = [["password"], [required], "x"]
void badTest

// @ts-expect-error — validator must return boolean
const badRule: FieldValidator = (value) => value
void badRule

const sendApi = async (values: LoginForm) => {
    return { id: 1 as const, login: values.username }
}

const sendPromise = explicit.send(sendApi)
sendPromise.then((result) => {
    const id: 1 = result.response.id
    const login: string | null = result.values.username
    void id
    void login
})

void sendPromise

// @ts-expect-error — api must accept LoginForm values
explicit.send(async (values: { other: string }) => values)

useForm({
    fields: {
        username: { label: "Login", initialValue: "" },
    },
    options: {
        debug: true,
        afterSendDelay: 100,
        mapServerFields: { user_name: "username" },
    },
})

useForm({
    fields: {
        username: { label: "Login", initialValue: "" },
    },
    options: {
        // @ts-expect-error — unknown option key
        notARealOption: true,
    },
})

const fieldMessages = getFieldError(explicit.errors, "username")
const flatMessages = getFieldErrorMessages(["required", { nested: ["x"] }])
const sendErr: unknown | null = explicit.sendError

void fieldMessages
void flatMessages
void sendErr

// @ts-expect-error — unknown field name for getFieldError
getFieldError(explicit.errors, "password")
