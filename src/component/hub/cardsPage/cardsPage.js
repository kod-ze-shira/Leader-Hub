import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action'
import ProjectPlatform from '../projectPlatform/projectPlatform'
import SelectHeader from '../SelectHeader/SelectHeader'

function CardsPage() {
    const [isHasTask, setIsHasTask] = useState(false);
    useEffect(() => {

    })
    return (
        <div >
            <SelectHeader/>
            <ProjectPlatform />
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