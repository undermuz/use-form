import type { IBlockResultValue } from "@undermuz/react-page-builder"
import HeroBlock from "./hero"
import HighlightsBlock from "./highlights"
import InstallBlock from "./install"
import UsageBlock from "./usage"
import LiveDemoBlock from "./live-demo"
import ValidatorsBlock from "./validators"
import EcosystemBlock from "./ecosystem"

function instance(
    id: number,
    block: { id: string; value: IBlockResultValue["value"] }
): IBlockResultValue {
    return {
        id,
        blockId: block.id,
        value: structuredClone(block.value),
    }
}

/** Seed layout for the use-form landing page. */
export const DEFAULT_PAGE: IBlockResultValue[] = [
    instance(101, HeroBlock),
    instance(102, HighlightsBlock),
    instance(103, InstallBlock),
    instance(104, UsageBlock),
    instance(105, LiveDemoBlock),
    instance(106, ValidatorsBlock),
    instance(107, EcosystemBlock),
]
