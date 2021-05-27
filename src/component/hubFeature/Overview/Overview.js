import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import Hangout from './hangout/hangout'
// import { actions } from '../../hub'
function Overview(props) {
    
    return (
        <>
            <div className=" body container-fluid">
              <Hangout></Hangout>
            </div>
        </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Overview)