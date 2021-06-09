import React from 'react';
import {connect} from 'react-redux';

function Logs(props) {
    // const { members } = props.members
    return (
        <>
            <div className="container backgroundWhiteAndBorderRadius">
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