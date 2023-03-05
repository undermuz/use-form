import type { ComponentMeta } from "@storybook/react"
import { type FC } from "react"
import LoginForm from "./form-examples/login-form"

export { LoginForm }

const FormExamples: FC = () => {
    return null
}

export default {
    title: "Form examples",
    component: FormExamples,
} as ComponentMeta<typeof FormExamples>
