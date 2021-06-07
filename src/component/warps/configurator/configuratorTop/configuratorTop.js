import React from 'react'
import { connect } from 'react-redux';
import './configuratorTop.css'
// import { actions } from '../../../../redux/actions/action'
import DropDownList from '../dropDownList/dropDownList'
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
            <div className="row justify-content-around mt-5">
                <div className="col-1 mr-4">
                    <img src={require('../../../img/sun.png')}></img>
                </div>
                <div className="col-1 ml-4">
                    <img src={require('../../../img/adjust-solid.png')}></img>
                </div>

            </div>
            <div className="row justify-content-center mt-4">
                <p className="col-10">What would you want to do?</p>
            </div>
        </>
    )
})




