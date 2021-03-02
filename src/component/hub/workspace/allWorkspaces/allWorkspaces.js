import React, { useEffect, useState } from 'react'
import './allWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewWorkspaceList from '../viewWorkspace/viewWorkspacelist/viewWorkspacelist'
import ViewWorkspaceGrid from '../viewWorkspace/viewWorkspaceGrid/viewWorkspaceGrid'

// let workspace;


function AllWorkspaces(props, getAllWorkspaces) {

    useEffect(() => {
        props.getAllWorkspaces()

    }, []);



    const renderedListWorkspaces = props.workspaces.map(todo => {
        return <ViewWorkspaceList key={todo._id} workspace={todo} />
    })
    const renderedGridWorkspaces = props.workspaces.map(todo => {
        return <ViewWorkspaceGrid key={todo._id} workspace={todo} />
    })

    const [list, setlist] = useState(false);
    const [grid, setgrid] = useState(true)
    const [workspace, setWorkspace] = useState({
        name: "ceck add",
        userId: "5fa79b45f8acce4894181b81",
        description: "",
        projet: [],
        team: []
    })
    // "603ce1181ee2aa42a43e8f80"
    function chenge_list1() {
        setlist(true);
        setgrid(false)

    }
    function chenge_grid() {
        setlist(false);
        setgrid(true);
    }
    function addNewWorkspace() {
        console.log(workspace)
        props.setWorkspaCrud(workspace)
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setWorkspace(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (

        <>
            <div className="row mt-5"></div>
            <div className="col-12">
                <div className="row borderBottom mx-5">
                    <div className="MyWorkspace">My Workspace</div>
                    <div className="row">
                        {
                            grid ?
                                <>
                                    <div className="col-1 grid" onClick={chenge_grid}><img src={require('../../../img/Group 19506.png')}></img></div>
                                    <div className="col-1 list" onClick={chenge_list1}><img src={require('../../../img/list1.png')}></img></div>
                                </>
                                :
                                <>
                                    <div className="col-1 grid" onClick={chenge_grid}><img src={require('../../../img/Group 19507.png')}></img></div>
                                    <div className="col-1 list" onClick={chenge_list1}><img src={require('../../../img/list.png')}></img></div>
                                </>
                        }
                    </div>
                </div>

                <div className="row mt-4 ml-5 ">
                    {list ?
                        renderedListWorkspaces
                        :
                        renderedGridWorkspaces
                    }
                    <input type="text" name="name" class="form-control mr-5 mt-2" id="workspace-name" placeholder="Enter workspace name"
                        onChange={handleChange} />
                    <button onClick={addNewWorkspace}>add workspace</button>
                </div>
            </div>
        </>

    )
}

const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.worksapces,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setWorkspaCrud: (props) => dispatch(actions.setWorkspaceCrud(props)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),

    }


}

export default connect(mapStateToProps, mapDispatchToProps)(AllWorkspaces)