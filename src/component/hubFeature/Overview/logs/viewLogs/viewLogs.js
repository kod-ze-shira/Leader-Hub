import React from 'react';
import { connect } from 'react-redux';
import './viewLogs.css'

function ViewLogs(props) {
    const { schemaName, icon, user, date } = props;

    // date in  words
    let day = date.slice(8, 10)
    let monthNumber = date.split("-")[1];
    let month = Number(monthNumber)
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = monthNames[month - 1];
    let dateInString = monthName + " " + day

    return (
        <>
            <div className="container logsContainer ">
                <div className="row logRowOne  mt-4">
                    <div className="col-2">
                        <img className="logicon" src={icon}></img>
                    </div>
                    <div className="col-6 logSchemaName">
                        {schemaName}
                    </div>
                    <div className="col-3 logDate">
                        {dateInString}
                    </div>
                </div>
                <div className="row">
                    <div className="col ml-5 logUser">
                        {user}
                    </div>
                </div>
                {!schemaName.includes("Project Created") ?
                    <div className="row">
                        <div className="logsDashed "></div>
                    </div>
                    : null
                }

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


