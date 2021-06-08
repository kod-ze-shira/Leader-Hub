import React, { useState } from "react";
import { connect } from 'react-redux';
import { actions } from "../../../../redux/actions/action";
import img from "../../../img/btn-chat.svg";
import imgHover from "../../../img/btn-chat-hover.svg";
import imgClick from "../../../img/btn-chat-close.svg";

import './hangout.css'

function Hangout(props) {
    const { userName } = props;
    const { jwtFromCookie } = props;
    const [showChat, setShowChat] = useState(false)
    const chatId = props.workspaces[props.workspaceIndex]?.projects[props.projectIndex]?.chatId;
    const handleOver = (e) => {
        if (showChat === false) {
            e.target.style.background = `url(${imgHover})`
        }
    }

    const handleLeave = (e) => {
        if (showChat === false) {
            e.target.style.background = `url(${img})`
        }
    }

    const handleClick = (e) => {
        e.target.style.background = `url(${imgClick})`
        showChat ? setShowChat(false) : setShowChat(true)
    }
    // document.getElementById("iframe").contentDocument.close();
    return (
        <>
            <button className='btn-show-chat'
                style={{ background: `url(${img})` }}
                onMouseOver={(e) => handleOver(e)}
                onMouseLeave={(e) => handleLeave(e)}
                onClick={(e) => handleClick(e)}>

            </button>
            <iframe id="iframe" className={showChat ? "iframeHangout" : 'd-none'}
                src={`https://chat.leader.codes/${userName}/hangout/${chatId}?jwt=${jwtFromCookie}`}

                // src={`https://chat.leader.codes/${userName}/hangout/609d014e5cad310a76d861a8`}
                title="hangout">
            </iframe>
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