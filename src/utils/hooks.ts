import { useEffect, useRef } from "react"

export const useOnInit = (initialCallBack: () => void) => {
    const hasRun = useRef(false)

    useEffect(() => {
        if (!hasRun.current) {
            initialCallBack()
            hasRun.current = true
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}