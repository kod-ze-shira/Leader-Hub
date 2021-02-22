import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { actions } from '../../../redux/actions/action'
import ViewWorkspaceName from '../../warps/configurator/viewWorkspaceName/viewWorkspaceName'
import './viewDetails.css'
import EditWorkspace from '../workspace/editWorkspace/editWorkspace'
import TaskDetails from '../task/taskDetails/taskDetails'
import EditTask from '../task/editTask/editTask'


const mapStateToProps = (state) => {
    return {

        close: state.public_reducer.close,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setclose: () => dispatch(actions.setclose()),


    }
}



export default connect(mapStateToProps, mapDispatchToProps)(




    function ViewDetails(props) {

        const { from } = props//to know from which component its come

        const renderSwitch = () => {
            switch (from) {
                case 'editWorkspace'://on click edit button of workspace
                    return <EditWorkspace />
                case 'viewTaskByCard':
                    return <TaskDetails task={props.task} />
                case 'editTaskToCard':
                    return <EditTask cardId={props.cardId} />
                default:
                    return null;
            }
        }



        return (
            <>


                {
                    props.close ?
                        <>
                            <div className="container-fluid">
                                <div className="row ">

                                    <div className="view-details col-5">
                                        <div className="close"
                                        //  onClick={props.setclose}
                                        onClick={props.setViewDetailsToClose}
                                          >x</div>
                                        {renderSwitch()}
                                    </div>
                                </div>
                            </div >

                        </>
                        : null



                }
            </>


        )
    })




