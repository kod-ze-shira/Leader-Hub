import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { actions } from '../../../redux/actions/action'
import SelectHeader from '../../SelectHeader/SelectHeader';
import ProjectsByWorkspace from '../projectsByWorkspace/projectsByWorkspace';

function ProjectsPage(props) {
    const [isHasTask, setIsHasTask] = useState(false);
    const [flag, setFlag] = useState(true);
    const [projectName, setProjectName] = useState("")
    const [addProject, setAddProject] = useState()
    const [valueSearchProject, setValueSearchProject] = useState()
    useEffect(() => {

    })
    const changeFlag = (value) => {
        setFlag(value)
    }
    const from = (value) => {
        console.log(value)
        // setFlag(value)
    }
    const selectProject = (value) => {
        setProjectName(value)
    }
    return (
        <div className="" >
            <SelectHeader selectProject={selectProject} flag={changeFlag}
                openViewDitailsAddProject={(e) => setAddProject(e)}
                valueSearchProject={(e) => setValueSearchProject(e)}
                from={from} menue={false} type='projects' />
            <ProjectsByWorkspace
                showToast={(object) => props.showToastDelete(object)}
                valueSearchProject={valueSearchProject}
                viewToastMassege={props.viewToastMassege}
                projectName={projectName}
                showViewDitailsProject={addProject}
            />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.workspaces,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage)