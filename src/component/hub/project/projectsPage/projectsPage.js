import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
// import { actions } from '../../../redux/actions/action'
import SelectHeader from '../../SelectHeader/SelectHeader'
import ProjectsByWorkspace from '../projectsByWorkspace/projectsByWorkspace'
function ProjectsPage() {
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
            <SelectHeader flag={changeFlag} from={from} />
            <ProjectsByWorkspace ></ProjectsByWorkspace>

        </div>

    )
}
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage)