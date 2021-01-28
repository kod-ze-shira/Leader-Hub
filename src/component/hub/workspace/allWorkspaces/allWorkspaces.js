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
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-11">
                        <div className="row mt-5 d-flex">

                            <div className="col-6 MyWorkspace"><b>My Workspace</b></div>
                            <div className="col-3 ml-5"></div>

                            <div className="col-0.5 grid" onClick={chenge_grid}><img src={require('../../../img/Group (2).png')}></img></div>
                            <div className="col-2 list" onClick={chenge_list1}><img src={require('../../../img/list.png')}></img></div>
                        </div>
                        <div className="row">

                            <div className="col-4"><hr></hr></div>

                        </div>

                        <div className="row mt-2 my-4">

                            {renderedListWorkspaces}
                        </div>
                    </div>
                </div>



            </>
            :
            <>

                <div className="row mt-5"></div>
                <div className="row mt-5"></div>
                <div className="row mt-5">
                    <div className="col-1"></div>
                    <div className="col-6 MyWorkspace"><b>My Workspace</b></div>
                    <div className="col-2 ml-5"></div>

                    <div className="col-0.5 grid" onClick={chenge_grid}><img src={require('../../../img/Group.png')}></img></div>
                    <div className="col-2 list" onClick={chenge_list1}><img src={require('../../../img/list1.png')}></img></div>
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-4"><hr></hr></div>

                    </div>
                    <div className="row ">
                        <div className="col-3" ></div>

                        {/* <button onClick={() => props.getAllWorkspaces()}>get all worksapaces</button> */}
                        <div className="col-9 allWorkspace">  {renderedGridWorkspaces}</div>
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
