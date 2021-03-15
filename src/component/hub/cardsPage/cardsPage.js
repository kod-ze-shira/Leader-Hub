import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action'
import GanttDesign from '../gantt/gantt';
import ProjectPlatform from '../projectPlatform/projectPlatform'
import SelectHeader from '../SelectHeader/SelectHeader'
import Tabs from '../tabs/tabs'

function CardsPage(props) {
    const [isHasTask, setIsHasTask] = useState(false);
    const [flag, setFlag] = useState();
    const [present, setPresent] = useState("list");


    useEffect(() => {

    })
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
                return <Tabs showToast={showToast} />
            case 'list':
                return <ProjectPlatform showToast={showToast} flag={flag} />
            case 'gantt':
                return <GanttDesign />
            default:
                return <ProjectPlatform showToast={showToast} flag={flag} />
        }
    }
    return (
        <div >
            <SelectHeader flag={changeFlag} from={howToPresent} menue={true} />
            {renderSwitch()}

        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.workspaces
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardsPage)