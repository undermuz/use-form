import { useEffect, useState } from "react"
import {
    BlocksEditor,
    BlocksView,
    type IBlockResultValue,
} from "@undermuz/react-page-builder"
import { UiContext } from "@undermuz/react-json-form"
import BaseTheme from "@undermuz/react-json-form-theme-base"

import AppChrome from "./components/AppChrome"
import ModeToggle, { type AppMode } from "./components/ModeToggle"
import { library } from "./blocks/library"
import { DEFAULT_PAGE } from "./blocks/defaultPage"
import {
    clearPageValue,
    downloadPageValue,
    loadPageValue,
    savePageValue,
} from "./lib/storage"

const IS_DEV = import.meta.env.DEV

function isPageDirty(value: IBlockResultValue[]): boolean {
    return JSON.stringify(value) !== JSON.stringify(DEFAULT_PAGE)
}

function App() {
    const [mode, setMode] = useState<AppMode>(IS_DEV ? "edit" : "view")
    const [value, setValue] = useState<IBlockResultValue[]>(() =>
        IS_DEV ? loadPageValue(DEFAULT_PAGE) : structuredClone(DEFAULT_PAGE)
    )

    useEffect(() => {
        if (!IS_DEV) return
        savePageValue(value)
    }, [value])

    const onReset = () => {
        clearPageValue()
        setValue(structuredClone(DEFAULT_PAGE))
    }

    const onDownload = () => {
        downloadPageValue(value)
    }

    const showEditor = IS_DEV && mode === "edit"

    return (
        <div data-uf-landing className="flex min-h-screen w-full flex-col">
            <AppChrome
                showEditorControls={IS_DEV}
                modeToggle={<ModeToggle mode={mode} onChange={setMode} />}
                onDownload={onDownload}
                onReset={onReset}
                isDirty={IS_DEV && isPageDirty(value)}
                editBanner={showEditor}
            />

            <main className="flex-1">
                {showEditor ? (
                    <UiContext.Provider value={BaseTheme}>
                        <div className="mx-auto max-w-6xl px-2 py-4 sm:px-4">
                            <BlocksEditor
                                library={library}
                                value={value}
                                onChange={setValue}
                            />
                        </div>
                    </UiContext.Provider>
                ) : (
                    <BlocksView library={library} value={value} />
                )}
            </main>
        </div>
    )
}

export default App
