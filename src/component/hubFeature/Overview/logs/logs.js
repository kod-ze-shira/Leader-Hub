import React from 'react';
import {connect} from 'react-redux';

function Logs(props) {
    // const { members } = props.members
    let logs=['yosi','moyshi','avreimy','moty','yeuda','david']
    return (
        <>
            <div className="container backgroundWhiteAndBorderRadius">
                <div className="row">
                    {logs.length ?
                        logs.map(l => {
                           return <div className="viewMembers col-4 ">{l}</div>
                        })
                        : null
                    }
                </div>
            </div>
        </>

    )

}
const mapDispatchToProps = (dispatch) => {
}

const mapStateToProps = (state) => {
    return {
        // members: state.members
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logs);