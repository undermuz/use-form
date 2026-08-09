import type { ComponentMeta } from "@storybook/react"
import { type FC } from "react"
import ControlledExample from "./scenario/controlled"
import ApiExample from "./scenario/api"

export { ControlledExample, ApiExample }

const Scenarios: FC = () => {
    return null
}

export default {
    title: "Scenarios",
    component: Scenarios,
} as ComponentMeta<typeof Scenarios>
