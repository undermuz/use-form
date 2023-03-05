import { type FC, type PropsWithChildren, type ReactNode, useEffect } from "react"

import { Box, ChakraProvider, HStack, useColorMode } from "@chakra-ui/react"
import { useDarkMode } from "storybook-dark-mode"

type BaseStoryLayoutProps = PropsWithChildren<{
    left?: ReactNode
}>

const DarkMode: FC = () => {
    const dark = useDarkMode()

    const { setColorMode } = useColorMode()

    useEffect(() => {
        setColorMode(dark ? "dark" : "light")
    }, [dark])

    return null
}

const BaseStoryLayout: FC<BaseStoryLayoutProps> = ({ left, children }) => {
    return (
        <ChakraProvider>
            <DarkMode />
            <HStack alignItems={"flex-start"}>
                <Box w="40%" p={"md"}>
                    {left}
                </Box>

                <Box w="60%">{children}</Box>
            </HStack>
        </ChakraProvider>
    )
}

export default BaseStoryLayout
