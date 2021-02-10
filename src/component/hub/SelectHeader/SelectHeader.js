import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import './selectHeader.css'
import ProjectsList from '../projectPlatform/projectsList/projectsList'
import Logo from '../logo/logo'
import SelectProject from '../SelectHeader/selectProject/selectProject';
import SelectWorkspace from '../SelectHeader/selectWorkspace/selectWorkspace'
function SelectHeader(props) {
    useEffect(() => {

    })
    return (
        <div className="s-header mx-0 mb-3 row align-items-center ">

            {/* <Logo className="logo-workspace" nameWorkspace={"myWorkspace.name"} /> */}
            <div className="col-3">
                <SelectWorkspace />
            </div>
            <div className="col-3">
                <SelectProject />
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