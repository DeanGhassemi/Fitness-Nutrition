import { useState, useEffect } from "react";


export const useRightClickMenu = () => {
    const [x, setx] = useState(0)
    const [y, sety] = useState(0)
    const [showMenu, setShowMenu] = useState(false)

    const handleContextMenu = (e) => {
        e.preventDefault()
        setx(e.pageX)
        sety(e.pageY)
        setShowMenu(true)
    }

    const handleClick = () => {
        showMenu && setShowMenu(false)
    }

    useEffect(() => {
        document.addEventListener('click', handleClick)
        document.addEventListener('contextMenu', handleContextMenu)
        return () => {
            document.removeEventListener('click', handleClick)
            document.removeEventListener('contextMenu', handleContextMenu)
        }
    })

    return {x, y, showMenu}
}