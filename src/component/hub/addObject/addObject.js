import React, { useEffect, useState } from 'react'
import './addObject.css'
import { connect } from 'react-redux'
import $ from 'jquery'

// import { actions } from '../../../../redux/actions/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
function AddObject(props) {

    function overButtonAdd(e) {
        document.getElementById('close').style.display = 'inline-block';
        $('.addNewP').css({ 'display': 'block' })
        document.getElementById('plus').style.display = 'none';
        // document.getElementById('add_new_btn').style.backgroundColor = 'white';
        // document.getElementById('add_new_btn').style.color = 'var(--light-light-blue)';
        document.getElementById("add_new_btn").classList.add("borderClose");

    }

    function mouseOutButtonAdd(e) {
        document.getElementById('close').style.display = 'none'
        document.getElementById('plus').style.display = 'inline-block'
        $('.addNewP').css({ 'display': 'none' })
        document.getElementById("add_new_btn").classList.remove("borderClose");

    }

    function openViewDitails(type) {

        switch (type) {
            case 'Workspace':
                props.setShowViewDitails('addWorkspace')
                break;
            case 'Project':
                if (window.location.href.indexOf('workspace') != -1)
                    props.setShowViewDitails('newProject')
                break;
            case 'Card':
                console.log('Card')
                break;
            case 'Task':
                console.log('Task')
                break;
            default:
                break;
        }
    }

    function startComponentAddObject() {

        // if (window.location.href.indexOf('workspace') != -1) {
        //     document.getElementById("newProjectInComponentAddObject").style.cursor = "pointer";
        // } else 

        if (window.location.href.indexOf('workspace') == -1 && window.location.href.indexOf('projectPlatform') == -1) {
            document.getElementById("newProjectInComponentAddObject").style.cursor = "no-drop";

        }
        else {
            document.getElementById("newProjectInComponentAddObject").style.cursor = "pointer";

        }
        document.getElementById("newCardInComponentAddObject").style.cursor = "no-drop";
        document.getElementById("newTaskInComponentAddObject").style.cursor = "no-drop";
        // }
        // else
        //     if (window.location.href.indexOf('projectPlatform') == -1) {
        //         document.getElementById("newCardInComponentAddObject").style.cursor = "no-drop";
        //         document.getElementById("newTaskInComponentAddObject").style.cursor = "no-drop";
        //         document.getElementById("newProjectInComponentAddObject").style.cursor = "no-drop";
        //     }
    }
    return (
        <>
            <div className='addNewObject'
                onMouseLeave={(e) => mouseOutButtonAdd(e)}
            >
                <div className='add_new_btn' id='add_new_btn'
                    onMouseOver={(e) => overButtonAdd(e)} >
                    <span id='plus'>+</span>
                    <FontAwesomeIcon id='close' icon={["fas", "times"]} />

                </div>
                <div id='addNewP2'

                >
                    <p className='addNewP' onClick={(e) => openViewDitails('Workspace')}>New workspace</p>
                    <p className='addNewP' id='newProjectInComponentAddObject'
                        onMouseOver={() => startComponentAddObject()}
                        onClick={(e) => openViewDitails('Project')}>New project</p>
                    <p className='addNewP' id='newCardInComponentAddObject'
                        onMouseOver={() => startComponentAddObject()}
                        onClick={(e) => openViewDitails('Card')}>New card</p>
                    <p className='addNewP' id='newTaskInComponentAddObject'
                        onMouseOver={() => startComponentAddObject()}
                        onClick={(e) => openViewDitails('Task')}>New task</p>
                </div>
            </div >
        </>
    )
}
export default connect(
    (state) => {
        return {
            // workspaceToEdit: state.workspace_reducer.workspace,


        }
    },
    (dispatch) => {
        return {

        }
    }
)(AddObject)