"use client"

import { useCallback, useMemo, useState } from "react"

/* ---------------------------------- Types --------------------------------- */

export type TranscriptWord = {
    start: number
    end: number
    text: string
}

export type TranscriptSegment = {
    id: string
    start: number
    end: number
    text: string
    words?: TranscriptWord[]
}

export type SegmentComposer = (
    segments: TranscriptSegment[]
) => TranscriptSegment[]

export type UseTranscriptViewerResult = {
    segments: TranscriptSegment[]
    activeSegmentIndex: number
    setActiveSegmentIndex: (index: number) => void
}

/* ---------------------------------- Hook ---------------------------------- */

export function useTranscriptViewer(
    initialSegments: TranscriptSegment[],
    composeSegments?: SegmentComposer
): UseTranscriptViewerResult {
    const [activeSegmentIndex, setActiveSegmentIndex] = useState(0)

    const segments = useMemo(() => {
        if (!initialSegments) return []
        return composeSegments
            ? composeSegments(initialSegments)
            : initialSegments
    }, [initialSegments, composeSegments])

    const setActive = useCallback((index: number) => {
        setActiveSegmentIndex(index)
    }, [])

    return {
        segments,
        activeSegmentIndex,
        setActiveSegmentIndex: setActive,
    }
}
