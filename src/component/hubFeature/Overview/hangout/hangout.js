import React, { useState } from "react";
import { connect } from 'react-redux';
import { actions } from "../../../../redux/actions/action";
import './hangout.css'
function Hangout(props) {
    const { userName } = props;
    const chatId = props.workspaces[props.workspaceIndex]?.projects[props.projectIndex]?.chatId;
    const { jwtFromCookie } = props;
    const [showChat, setShowChat] = useState(false)
    const [src, setSrc] = useState(null)

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
        if (showChat) {
            setShowChat(false)
            setSrc(null)
        }
        else {
            setShowChat(true)
            setSrc(`https://chat.leader.codes/${userName}/hangout/${chatId}?jwt=${jwtFromCookie}`)
        }
        // showChat ? setShowChat(false) : setShowChat(true)
        // showChat ? setSrc(null) : setSrc(`https://chat.leader.codes/${userName}/hangout/${chatId}?jwt=${jwtFromCookie}`)
    }
    // document.getElementById("iframe").contentDocument.close();
    return (
        <>
            <button className='btn-show-chat'
             onClick={() => { showChat ? setShowChat(false) : setShowChat(true) }}>
                {/* <img 
                    src={require('../../../img/btn-chat.svg')}>
                </img> */}
            </button>
            <iframe id="iframe" className={showChat ? "iframeHangout" : 'd-none'}
                src={src}

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