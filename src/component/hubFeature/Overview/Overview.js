import React from 'react'
import { connect } from 'react-redux'
import MyChart from '../chart/chart'

function Overview(props) {
    
    return (
        <>
            <div className=" body container-fluid">
              <MyChart/>
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