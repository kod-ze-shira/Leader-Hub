import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './viewLogs.css'
import ReactTooltip from 'react-tooltip';


function ViewLogs(props) {

    const { schemaName, icon, user, date, _id,cardName } = props;

    // date in  words
    let day = date.slice(8, 10)
    let monthNumber = date.split("-")[1];
    let month = Number(monthNumber)
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = monthNames[month - 1];
    let dateInString = monthName + " " + day


    return (
        <>
            <div data-tip data-for="projectName" className="container logsContainer" >
                <h1>{cardName}</h1>
                <div className="row logRowOne  mt-4">
                    <div className="col-2 logColIcon">
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
                    <div className="col logUser">
                        {user}
                    </div>
                </div>
                <div className="row">
                    <div className="col logUser">
                        {_id}
                    </div>
                </div>
                {!schemaName.includes("Project Created") ?
                    <div className="row">
                        <div className="logsDashed "></div>
                    </div>
                    : null
                }
            </div>
            <ReactTooltip data-tip id="projectName" place="top" effect="solid">
                {_id}
            </ReactTooltip>

        </>
    )
}

const mapDispatchToProps = (dispatch) => {
}

const mapStateToProps = (state) => {
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewLogs);


