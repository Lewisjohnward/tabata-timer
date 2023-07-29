import {ReactNode, useEffect} from "react"
import {createPortal} from "react-dom"

type Props = {
    children: ReactNode
}


const Modal = ({children} : Props) => {

    useEffect(() => {
        document.body.style.overflow = "hidden"
    //document.body.style.overflow = "hidden";
    }, [])

    return createPortal(children, document.body)
}

export default Modal
