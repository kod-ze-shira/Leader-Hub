import React, { useState, useRef ,useEffect} from "react";
import { connect } from 'react-redux';
import { actions } from "../../../../redux/actions/action";
import img from "../../../../assets/img/btn-chat.svg";
import imgHover from '../../../../assets/img/btn-chat-hover.svg';
import imgClick from "../../../../assets/img/btn-chat-close.svg";
import Iframe from "./iframe";
import $ from 'jquery'

import './hangout.css'

function Hangout(props) {
    const { userName } = props;
    const chatId = props.workspaces[props.workspaceIndex]?.projects[props.projectIndex]?.chatId;
    const { jwtFromCookie } = props;
    useEffect(() => {
    },[])
    // const [showChat, setShowChat] = useState(true)
    // const [src, setSrc] = useState(null)
    // const [backImg, setBackImg] = useState(imgClick)


    // const handleOver = (e) => {
    //     if (showChat === false) {
    //         setBackImg(imgHover)
    //         // e.target.style.background = `url(${imgHover})`
    //     }
    // }

    // const handleLeave = (e) => {
    //     if (showChat === false) {
    //         setBackImg(img)
    //         // e.target.style.background = `url(${img})`
    //     }
    // }

    // const handleClick = (e) => {
    //     setBackImg(imgClick)
    //     // e.target.style.background = `url(${imgClick})`
    //     if (showChat) {
    //         setShowChat(false)
    //         setSrc(null)
    //     }
    //     else {
    //         setShowChat(true)
    //         setSrc(`https://chat.leader.codes/${userName}/hangout/${chatId}?jwt=${jwtFromCookie}`)
    //     }
    //     // showChat ? setShowChat(false) : setShowChat(true)
    //     // showChat ? setSrc(null) : setSrc(`https://chat.leader.codes/${userName}/hangout/${chatId}?jwt=${jwtFromCookie}`)
    // }

    // // document.getElementById("iframe").contentDocument.close();
    // const show = () => {

    //         setShowChat(true)

    // }
   
    
 
    return (
        <>
            {/* <button className='btn-show-chat'
                // style={{ background: `url(${backImg})` }}
                // onMouseOver={(e) => handleOver(e)}
                // onMouseLeave={(e) => handleLeave(e)}
                // onClick={(e) => handleClick(e)}>
>
            </button> */}
            {/* <div className="wrap-iframe">
            <iframe id="iframe"
                sandbox
                // className={showChat ? "iframeHangout d-block" : 'd-none iframeHangout'}
                className="iframeHangout"
                // onload={() => { window.parent.scrollTo(0, 0) }}
                // scrolling="no"
                // ref={iframeRef}
                src={`https://chat.leader.codes/${userName}/hangout/${chatId}?jwt=${jwtFromCookie}`}
                // src={src}
                // nojump
                // src={`https://chat.leader.codes/${userName}/hangout/609d014e5cad310a76d861a8`}
                title="hangout">
            </iframe>
            </div> */}
             <Iframe  source={`https://chat.leader.codes/${userName}/hangout/${chatId}?jwt=${jwtFromCookie}`} />
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.workspaces,
        workspaceIndex: state.public_reducer.indexOfWorkspace,
        projectIndex: state.public_reducer.indexCurrentProject,
        userName: state.public_reducer.userName,
        jwtFromCookie: state.public_reducer.tokenFromCookies
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // newChat: () => dispatch(actions.newChat()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Hangout)