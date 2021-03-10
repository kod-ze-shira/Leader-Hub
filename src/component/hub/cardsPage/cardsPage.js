import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action'
import ProjectPlatform from '../projectPlatform/projectPlatform'
import SelectHeader from '../SelectHeader/SelectHeader'
import Tabs from '../tabs/tabs'
function CardsPage() {
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
    const renderSwitch = () => {
        switch (present) {
            case 'tabs':
                return <Tabs />
            case 'list':
                return <ProjectPlatform flag={flag} />
            default:
                return <ProjectPlatform flag={flag} />

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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardsPage)