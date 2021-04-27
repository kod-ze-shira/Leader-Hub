import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action'
import GanttDesign from '../gantt/gantt';
import ProjectPlatform from '../projectPlatform/projectPlatform'
import SelectHeader from '../SelectHeader/SelectHeader'
import Tabs from '../tabs/tabs'
import DisplayGantt from '../../Gantt/DisplayGantt/displayGantt'

function CardsPage(props) {
    const [isHasTask, setIsHasTask] = useState(false);
    const [flag, setFlag] = useState();
    const [present, setPresent] = useState("tabs");

    useEffect(() => {

    }, [])
    const changeFlag = (value) => {
        setFlag(value)
    }
    const howToPresent = (value) => {
        setPresent(value)
    }
    function showToast(valueToDelet) {
        props.showToastDelete(valueToDelet)
    }
    const renderSwitch = () => {
        switch (present) {
            case 'tabs':
                return <Tabs showToast={showToast} focusInputCard={props.focusInputCard} />
            case 'list':
                return <ProjectPlatform showToast={showToast} flag={flag} focusInputCard={props.focusInputCard} />
            case 'gantt':
                return <DisplayGantt />
            default:
                // return <Tabs showToast={showToast} projectId={props.project._id} />
                return <ProjectPlatform showToast={showToast} flag={flag} />
        }
    }
    return (
        <div className="mt-3">
            <SelectHeader flag={changeFlag} from={howToPresent} menue={true} />
            {renderSwitch()}

        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.workspaces,
        project: state.project_reducer.project,
        // task: state.task_reducer.task
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardsPage)