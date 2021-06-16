import React, { useEffect } from "react"
import { useState } from "react"


export default function (props) {

    const [ifAdmin, setIfAdmin] = useState(false)

    useEffect(() => {
        if (window.location.href.includes("admin"))
            setIfAdmin(true)
        else
            setIfAdmin(false)
    }, [])

    return (
        <>
            {ifAdmin ?
               <input value={props.text}></input>
                :
                props.elementType
            }
        </>
    )
}