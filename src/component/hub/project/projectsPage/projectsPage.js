import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
// import { actions } from '../../../redux/actions/action'
import SelectHeader from '../../SelectHeader/SelectHeader'
import ProjectsByWorkspace from '../projectsByWorkspace/projectsByWorkspace'

function ProjectsPage(props) {
    const [isHasTask, setIsHasTask] = useState(false);
    const [flag, setFlag] = useState(true);

    useEffect(() => {

    })
    const changeFlag = (value) => {
        setFlag(value)
    }
    const from = (value) => {
        console.log(value)
        // setFlag(value)
    }
    return (
        <div >
<<<<<<< HEAD
            <SelectHeader flag={changeFlag} from={from} menue={false} />
            <ProjectsByWorkspace ></ProjectsByWorkspace>
=======
            <SelectHeader flag={changeFlag} from={from} />
            <ProjectsByWorkspace
                showToast={(object) => props.showToastDelete(object)}
            />
>>>>>>> newDev

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