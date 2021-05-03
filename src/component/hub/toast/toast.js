import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import './toast.css'
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
                    delay={5000} autohide>
                    <div className="border-top-gradient"></div>
                    <Toast.Header className="toast_header row justify-content-center" closeButton={false}>
                        <div className=" "></div>
                        <span className="px-4 ">Task completed</span>
                        <div className="div_btn_undo  ">
                           
                        </div>
                        
                    </Toast.Header>
                </Toast>
            </animated.div>
        </>
    )
}