import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from 'jquery';

import { ViewWorkspaceName } from '../viewWorkspaceName/viewWorkspaceName'
import './workspace.css';


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
export default connect(mapStateToProps, mapDispatchToProps)(function workspace(props) {

    $(document).ready(function () {
        let flag = false;


        $(".workspaces").click(function () {
            // $(".workspaces").css("border", "none");
            flag = !flag;

            if (flag == false) {
                $(".workspace-list").hide();
                $(".show").hide();
                $(".arrow-down").css("transform", "rotate(1800deg)")

            }
            else {

                $(".show").show();
                $(".workspace-list").show();
                $(".workspace-list").css("border", "0.5px solid #979797");
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

            <button onClick={() => props.getAllWorkspaces()} className="workspaces col-8 mt-5 btn btn-outline-secondary ">Workspace<div className="mt-1 arrow-down"></div></button>
            <div className="workspace-list  mt-2 col-8">
                <input className="show col-10 mt-2" type="" id="search" name="search" placeholder="search"
                >
                </input>
                <FontAwesomeIcon className="icon show"
                    icon={['fas', 'search']}
                ></FontAwesomeIcon>
                <div className="" >{renderedWorkspacesName}</div>
            </div>

        </>
    );
}
)