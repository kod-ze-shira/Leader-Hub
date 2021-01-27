import React, { useEffect, useState } from 'react'
import './allWorkspace.css'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action'
import ViewWorkspaceList from '../viewWorkspace/ViewWorkspace/ViewWorkspacelist/viewWorkspacelist'
import ViewWorkspaceGrid from '../viewWorkspace/ViewWorkspace/ViewWorkspaceGrid/ViewWorkspaceGrid'



// let workspace;


function AllWorkspaces(props, getAllWorkspaces) {

    useEffect(() => {
        { props.getAllWorkspaces() };

    }, []);



    const renderedListWorkspaces = props.workspaces.map(todo => {
        return <ViewWorkspaceList key={todo._id} workspace={todo} />
    })
    const renderedGridWorkspaces = props.workspaces.map(todo => {
        return <ViewWorkspaceGrid key={todo._id} workspace={todo} />
    })

    const [list, setlist] = useState(false);

    function chenge_list1() {
        setlist(false);
    }
    function chenge_grid() {
        setlist(true);
    }




    return (


        list ?
            <>
                <div className="row mt-5"></div>
                <div className="row mt-5"></div>
                <div className="row mt-5">
                    <div className="col-1"></div>
                    <div className="col-6 MyWorkspace">My Workspace</div>
                    <div className="col-2"></div>
                    <div className="col-0.5 LIST" onClick={chenge_list1}>LIST</div>
                    <div className="col-2 GRID" onClick={chenge_grid}>GRID</div>
                    <div className="row mt-4">

                        <div className="renderedListWorkspaces" ></div>
                        {renderedListWorkspaces}

                    </div>



                    {/* <button onClick={() => props.getAllWorkspaces()}>get all worksapaces</button> */}

                </div>
            </>

            :
            <>

                <div className="row mt-5"></div>
                <div className="row mt-5"></div>
                <div className="row mt-5">
                    <div className="col-1"></div>
                    <div className="col-6 MyWorkspace">My Workspace</div>
                    <div className="col-2"></div>
                    <div className="col-0.5 LIST1" onClick={chenge_list1}>LIST</div>
                    <div className="col-2 GRID1" onClick={chenge_grid}>GRID</div>
                    <div className="row mt-2">
                        <div className="col-1"></div>
                        <div className="col-4"><hr></hr></div>

                    </div>
                    <div className="row mt-5">
                        <div className="col-1" ></div>
                        {/* <button onClick={() => props.getAllWorkspaces()}>get all worksapaces</button> */}
                        <div className="col-1">  {renderedGridWorkspaces}</div>
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
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),

    }


}

export default connect(mapStateToProps, mapDispatchToProps)(AllWorkspaces)
