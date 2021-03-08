import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import './toastDelete.css'
import { useSpring, animated } from "react-spring";

export default function ToastDelete1(props) {
    const [key, setKey] = useState(1);

    const scrolling = useSpring({
      from: { transform: "translate(-60%,0)" },
      to: { transform: "translate(10%,0)" },
      config: { duration: 500 },//מהירות
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
                delay={4000} autohide>

                <Toast.Header className="toast_header" closeButton={false}>
                    <div className="row">
                        <div className="col-4">
                            <div className="pr-2">{props.name}</div>
                        </div>
                        <div className="col-4">
                            <span className="pr-2">was deleted</span>
                        </div>
                        <div className="col-4 div_btn_undo pr-2">
                            <button className="btn_undo"
                                onClick={() => {
                                    props.toSetShowToastDelete();
                                    //  props.toSetDeleted() 
                                }}>Undo</button>
                        </div>
                    </div>
                </Toast.Header>
            </Toast>
            </animated.div>
        </>
    )
}