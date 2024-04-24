import {useCallback, useEffect, useState} from "react";

/**
 * Хук для добавления зума и перетаскивания элементу
 * @param zoomedElement
 */
export function useZoomWithDragging(zoomedElement: HTMLElement | null) {
    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({x: 0, y: 0})

    useEffect(() => {
        let isDragging = false
        let prevPosition = {x: 0, y: 0};

        const handleMouseDown = (ev: MouseEvent) => {
            isDragging = true
            prevPosition = {x: ev.clientX, y: ev.clientY}
        }

        const handleMouseMove = (event: MouseEvent) => {
            if (!isDragging || scale <= 1 || zoomedElement === null) {
                return
            }

            const maxPositionX = (zoomedElement.clientWidth - 10) * (scale - 1) / 2
            const maxPositionY = (zoomedElement.clientHeight - 10) * (scale - 1) / 2
            const deltaX = event.clientX - prevPosition.x
            const deltaY = event.clientY - prevPosition.y

            prevPosition = {x: event.clientX, y: event.clientY};
            setPosition(position => ({
                x: position.x + deltaX > 0 ?
                    Math.min(position.x + deltaX, maxPositionX) :
                    Math.max(position.x + deltaX, -maxPositionX),
                y: position.y + deltaY > 0 ?
                    Math.min(position.y + deltaY, maxPositionY) :
                    Math.max(position.y + deltaY, -maxPositionY),
            }))
        }

        const handleMouseUp = () => {
            isDragging = false
        }

        zoomedElement?.addEventListener('mousedown', handleMouseDown)
        zoomedElement?.addEventListener('mousemove', handleMouseMove)
        document?.addEventListener('mouseup', handleMouseUp)

        return () => {
            zoomedElement?.removeEventListener('mousedown', handleMouseDown)
            zoomedElement?.removeEventListener('mousemove', handleMouseMove)
            document?.removeEventListener('mouseup', handleMouseUp)
        }
    }, [scale]);

    const onScaleUp = useCallback(() => {
        setScale(scale => scale + 0.1)
    }, [scale])

    const onScaleDown = useCallback(() => {
        if (scale <= 1) {
            return
        }
        setScale(scale => scale - 0.1)
    }, [scale])

    return {
        scale,
        onScaleDown,
        onScaleUp,
        position,
    }
}
