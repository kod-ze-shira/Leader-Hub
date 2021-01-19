import React from 'react'
import { connect } from 'react-redux';
import './new_configurator.css'
// import { actions } from '../../../../redux/actions/action'
import DropDownList from '../dropDawnList/dropDownList'
import ConfiguratorTop from '../configuratorTop/configuratorTop'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function NewTasck(props) {
    return (
        <>
            <div className="right_nav ">
                <ConfiguratorTop />
                <DropDownList />
            </div>
        </>
    )
})




