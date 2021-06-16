import React from 'react';
import { connect } from 'react-redux';
import './viewLogs.css'

function ViewLogs(props) {
    const { schemaName, icon, user } = props;
    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-2 ml-3">
                        <img className="logicon" src={icon}></img>
                    </div>
                    <div className="col-10 logSchemaName">
                        {schemaName}
                    </div>
                </div>
                <div className="row">
                    <div className="col ml-5 logUser">
                        {user}
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
}

const mapStateToProps = (state) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewLogs);


