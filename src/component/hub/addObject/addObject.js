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
        // document.getElementsByClassName('addNewP').style.display = 'inline-block';

        document.getElementById('plus').style.display = 'none';
        // document.getElementsByClassName('add_new_btn').style.backgroundColor = 'white';
        // document.getElementsByClassName('add_new_btn').style.color = 'var(--light-light-blue)';
    }
    function mouseOutButtonAdd1(e) {
        e.stopPropagation();

    }
    function mouseOutButtonAdd(e) {
        document.getElementById('close').style.display = 'none'
        document.getElementById('plus').style.display = 'inline-block'
        $('.addNewP').css({ 'display': 'none' })
        // document.getElementsByClassName('add_new_btn').style.backgroundColor = 'white';
        // document.getElementsByClassName('add_new_btn').style.color = 'var(--light-light-blue)';
    }
    function openViewDitails(type) {


        switch (type) {
            case 'Workspace':
                alert('WORKSPACE')
                break;
            case 'Project':
                if (window.location.href.indexOf('workspace') != -1 ||
                    window.location.href.indexOf('allProjects') != -1) {

                    alert('Project')
                }
                break;
            case 'Card':
                alert('Card')

                break;
            case 'Task':
                alert('Task')

                break;

            default:
                break;
        }
    }
    return (
        <>
            <div className='addNewObject'
            // onMouseOut={(e) => mouseOutButtonAdd(e)}
            >
                <div className='add_new_btn' onMouseOver={(e) => overButtonAdd(e)}
                    onMouseOut={(e) => mouseOutButtonAdd1(e)}
                >
                    <span id='plus'>+</span>
                    <FontAwesomeIcon id='close' icon={["fas", "times"]} />

                </div>
                <div id='addNewP2'
                    onMouseOut={(e) => mouseOutButtonAdd1(e)}
                >
                    <p className='addNewP' onClick={(e) => openViewDitails('Workspace')}>New Workspace</p>
                    <p className='addNewP' onClick={(e) => openViewDitails('Project')}>New Project</p>
                    <p className='addNewP' onClick={(e) => openViewDitails('Card')}>New Card</p>
                    <p className='addNewP' onClick={(e) => openViewDitails('Task')}>New Task</p>
                </div>
            </div >
        </>
    )
}
export default connect(
    (state) => {
        return {
            // workspaceToEdit: state.workspace_reducer.workspace,
            // workspaces: state.workspace_reducer.workspaces,


        }
    },
    (dispatch) => {
        return {

        }
    }
)(AddObject)