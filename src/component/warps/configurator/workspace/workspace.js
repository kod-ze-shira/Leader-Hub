import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from 'jquery';
import { ViewWorkspaceName } from '../viewWorkspaceName/viewWorkspaceName'
import './workspace.css';



export function workspace(props) {
    const showInPlatform = () => {
        props.getAllWorkspaces();
        // history.push('/workspacePlatform')

    }
    // const [flag, setflag] = useState(false)

    // const showInPlatform = () => {
    //     setflag(!flag);
    //     props.getAllWorkspaces();
    // }
    $(document).ready(function () {
        let flag = false;


        $(".workspaces").click(function () {
            // $(".workspaces").css("border", "none");
            flag = !flag;
            debugger;
            if (flag == false) {
                $(".workspace-list").hide();
                $(".show").hide();
                $(".arrow-down").css("transform", "rotate(1800deg)")

            }
            else {

                $(".show").show();
                $(".workspace-list").show();
                // $(".workspace-list").css("border", "0.5px solid #979797");
                $(".arrow-down").css("transform", "rotate(90deg)")
                // flag = !flag;
            }
            // flag = !flag;
        });
    });
    const renderedWorkspacesName = props.workspaces.map(todo => {
        return <ViewWorkspaceName key={todo._id} workspace={todo} />
    })


    return (
        <>
            {/* <button onClick={() => props.getAllWorkspaces()} className="workspaces col-8 mt-5 btn btn-outline-secondary ">Workspace<div className="mt-1 arrow-down"></div></button> */}

            <button onClick={showInPlatform} className="workspaces col-8 mt-5 btn btn-outline-secondary ">Workspace<div className="mt-1 arrow-down"></div></button>
            {/* {flag ? */}
            <div className="workspace-list  mt-2 col-8">
                <div className="" >{renderedWorkspacesName}</div>
            </div>
            {/* : null } */}

        </>
    );
}
const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.worksapces

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(workspace)