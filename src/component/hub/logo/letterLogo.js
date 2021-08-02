
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actions } from '../../../redux/actions/action';
import "./letterLogo.css";

function LetterLogo(props) {
    let { idWorkspace, idProject } = useParams();
    useEffect(() => {
        if (props.workspaces) {
            if (window.location.href.indexOf('workspace') !== -1) {
                let w
                // props.getProjectsByWorkspaceId(idWorkspace)
                // w = props.workspaces.find(w => w._id === idWorkspace)
                // props.setWorkspace(w)
                w = props.workspaces.findIndex(w => w._id === idWorkspace)
                props.setIndexWorkspace(w)

            }
            else
                if (window.location.href.indexOf('allProjects') !== -1) {
                    props.setIndexWorkspace(0)
                }
                else
                    if (window.location.href.indexOf('projectPlatform') !== -1) {

                        for (let index = 0; index < props.workspaces.length; index++) {
                            for (let j = 0; j < props.workspaces[index].projects.length; j++) {
                                if (idProject === props.workspaces[index].projects[j]._id) {
                                    props.setIndexWorkspace(index)

                                    // props.setWorkspace(props.workspaces[index])
                                    // props.setProject(props.workspaces[index].projects[j])

                                    // props.getCardsByProjectId(props.workspaces[index].projects[j]._id)
                                }
                            }
                        }
                    }
        }
    // check when does the use effect run
    }, [props.indexOfWorkspace])

    return (
        <>

            {props.workspaces[props.indexOfWorkspace] ?

                <span className='logoW' style={{ "backgroundColor": props.workspaces[props.indexOfWorkspace].color }} >
                    {props.workspaces[props.indexOfWorkspace].name ?
                        props.workspaces[props.indexOfWorkspace].name[0].toUpperCase() : null}
                    {
                        props.workspaces[props.indexOfWorkspace].name && props.workspaces[props.indexOfWorkspace].name.indexOf(" ") && props.workspaces[props.indexOfWorkspace].name.indexOf(" ") + 1 ?
                            props.workspaces[props.indexOfWorkspace].name[props.workspaces[props.indexOfWorkspace].name.indexOf(" ") + 1].toUpperCase() : null
                    }
                </span>
                : null}
        </>)

}


const mapStateToProps = (state) => {

    return {
        workspaces: state.public_reducer.workspaces,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
        setIndexWorkspace: (index) => dispatch(actions.saveIndexOfWorkspaceInRedux(index)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LetterLogo)
