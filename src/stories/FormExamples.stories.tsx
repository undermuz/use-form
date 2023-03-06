import type { ComponentMeta } from "@storybook/react"
import { type FC } from "react"
import ChakraUiExample from "./form-examples/chakra-ui"
import BrowserInputsExample from "./form-examples/browser-inputs"
import DatePickerExample from "./form-examples/date-picker"

export { ChakraUiExample, BrowserInputsExample, DatePickerExample }

const FormExamples: FC = () => {
    return null
}

export default {
    title: "Form examples",
    component: FormExamples,
} as ComponentMeta<typeof FormExamples>
