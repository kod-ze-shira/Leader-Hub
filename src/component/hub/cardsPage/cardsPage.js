import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action'
import ProjectPlatform from '../projectPlatform/projectPlatform'
import SelectHeader from '../SelectHeader/SelectHeader'

function CardsPage() {
    const [isHasTask, setIsHasTask] = useState(false);
    const [flag, setFlag] = useState(true);

    useEffect(() => {

    })
    const changeFlag = (value) => {
        setFlag(value)
    }
    return (
        <div >
            <SelectHeader flag={changeFlag} />
            <ProjectPlatform flag={flag}/>
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