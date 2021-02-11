import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import './selectHeader.css'
import ProjectsList from '../projectPlatform/projectsList/projectsList'
import Logo from '../logo/logo'
import SelectProject from '../SelectHeader/selectProject/selectProject';
import SelectWorkspace from '../SelectHeader/selectWorkspace/selectWorkspace'
import SelectCards from '../SelectHeader/selectCards/selectCards'
import SelectTask from '../SelectHeader/selectTask/selectTask'
function SelectHeader(props) {
    useEffect(() => {

    })
    return (
        <div className="s-header mx-0 mb-3 row align-items-center ">

            <div className="col-2">
                <SelectWorkspace />
            </div>
            <div className="col-2">
                <SelectProject />
            </div>
            <div className="col-2">
                <SelectCards />
            </div>
            <div className="col-2">
                <SelectTask />
            </div>



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
export default connect(mapStateToProps, mapDispatchToProps)(SelectHeader)