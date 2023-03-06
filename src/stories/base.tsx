import {
    type FC,
    type PropsWithChildren,
    type ReactNode,
    useEffect,
    Fragment,
} from "react"

import { Box, ChakraProvider, HStack, useColorMode } from "@chakra-ui/react"
import { useDarkMode } from "storybook-dark-mode"

type BaseStoryLayoutProps = PropsWithChildren<{
    left?: ReactNode
    isChakra?: boolean
}>

const DarkMode: FC = () => {
    const dark = useDarkMode()

    const { setColorMode } = useColorMode()

    useEffect(() => {
        setColorMode(dark ? "dark" : "light")
    }, [dark])

    return null
}

const BaseStoryLayout: FC<BaseStoryLayoutProps> = ({
    left,
    children,
    isChakra = false,
}) => {
    const Wrapper = isChakra ? ChakraProvider : Fragment

    return (
        <Wrapper>
            {isChakra && <DarkMode />}
            <HStack alignItems={"flex-start"}>
                <Box w="40%" p={"md"}>
                    {left}
                </Box>

                <Box w="60%">{children}</Box>
            </HStack>
        </Wrapper>
    )
}

export default BaseStoryLayout
