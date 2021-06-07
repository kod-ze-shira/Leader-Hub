import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import './toastDelete.css'
import { useSpring, animated } from "react-spring";

export default function ToastDelete1(props) {
    const [key, setKey] = useState(1);

    const scrolling = useSpring({
        from: { transform: "translate(-60%,0)" },
        to: { transform: "translate(-5%,0)" },
        config: { duration: 600 },//מהירות
        // reset: true,
        //reverse: key % 2 == 0,
        onRest: () => {
            setKey(key + 1);
        }
    });

    return (
        <>
            <animated.div style={scrolling}>
                <Toast className="toast_delete"
                    onClose={props.toOnClose}
                    delay={6000} autohide>
                    <div className="border-top-gradient"></div>
                    <Toast.Header className="toast_header row justify-content-center" closeButton={false}>
                        <div className="object_name pt-1 ">{props.name}</div>
                        <span className="px-4 ">was deleted</span>
                        <div className="div_btn_undo  ">
                            <button className="btn_undo "
                                onClick={(e) => {
                                    props.toSetShowToastDelete();
                                    e.stopPropagation()
                                    //  props.toSetDeleted() 
                                }}>Undo</button>
                        </div>
                        <button onClick={(e) => {
                            props.toOnClose()
                            e.stopPropagation()
                        }} className="pl-2 button_close">X</button>
                    </Toast.Header>
                </Toast>
            </animated.div>
        </>
    )
}