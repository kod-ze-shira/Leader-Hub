import React, { useState } from 'react';
import { useSpring, animated } from "react-spring";
import { connect } from 'react-redux';
import EditProject from '../project/editProject/editProject';
import NewProject from '../project/newProject/newProject';
import ShareProject from '../project/shareProject/shareProject';
import AddTask from '../task/addTask/addTask';
import TaskDetails from '../task/taskDetails/taskDetails';
import TaskNotBelongDetails from '../task/taskNotBelongCardForUser/taskNotBelongDetails/taskNotBelongDetails';
import AddWorkspace from '../workspace/addWorkspace/addWorkspace';
import EditWorkspace from '../workspace/editWorkspace/editWorkspace';
import './viewDetails.css';

const mapStateToProps = (state) => {
    return {
        indexOfWorkspace: state.public_reducer.indexOfWorkspace
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(


    function ViewDetails(props) {
        const [key, setKey] = useState(1);

        const scrolling = useSpring({
            from: { transform: "translate(100%,0)" },
            to: { transform: "translate(50%,0)" },
            config: { duration: 600 },//מהירות
            // reset: true,
            //reverse: key % 2=== 0,
            onRest: () => {
                setKey(key + 1);
            }
        });

        const [oldObject, setOldObject] = useState()
        const { from } = props//to know from which component its come


        function showToast(val) {
            props.showToast(val)
        }

        const renderSwitch = () => {
            switch (from) {
                case 'viewTaskByCard':
                    return <TaskDetails
                        showToast={showToast}
                        task={props.task}
                        objectBeforeChanges={(e) => setOldObject(e)}
                        closeViewDetails={props.closeViewDetails}
                        setDownloadFile={(e) => props.setDownloadFile(e)}
                        viewToastMassege={props.viewToastMassege}
                    />
                case 'editWorkspace'://on click edit button of workspace
                    return <EditWorkspace closeViewDetails={props.closeViewDetails}
                        showToast={(e) => showToast(e)}
                        workspace={props.workspace}
                        objectBeforeChanges={(e) => setOldObject(e)}
                    />
                case 'taskNotBelongDetails':
                    return <TaskNotBelongDetails task={props.task}
                        objectBeforeChanges={(e) => setOldObject(e)}
                        closeViewDetails={props.closeViewDetails}
                        viewToastMassege={props.viewToastMassege}
                        showToast={showToast}
                        setDownloadFile={(e) =>
                            props.setDownloadFile(e)
                        }
                    />
                case 'newProject':
                    return <NewProject fromAllproject={props.fromAllproject} closeViewDetails={props.closeViewDetails} workspaceId={props.workspaceId} />
                case 'editProject':
                    return <EditProject closeViewDetails={props.closeViewDetails}
                        showToast={(e) => showToast(e)} objectBeforeChanges={(e) => setOldObject(e)} />
                case 'shareProject':
                    return <ShareProject closeViewDetails={props.closeViewDetails} viewToastMassege={props.viewToastMassege} />
                case 'addTask':
                    return <AddTask cardId={props.cardId} />
                case 'addWorkspace':
                    return <AddWorkspace closeViewDetails={props.closeViewDetails} colorWorkspace={props.colorWorkspace} />
                default:
                    return null;

            }
        }

        return (
            <>
                {/* <animated.div style={scrolling}> */}
                <div className="row ">
                    <div className="view-details  col-5">
                        {/* <div className="close mt-2 mr-2" onClick={(e) => closeEndRefreshViewDetails()} >x</div> */}
                        {renderSwitch()}
                    </div>
                </div>
                {/* </animated.div> */}
            </>
        )
    })




