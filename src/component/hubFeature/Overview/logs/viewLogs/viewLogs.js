import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './viewLogs.css'
import ReactTooltip from 'react-tooltip';
import useWindowsWidth from "../../hookResize"



function ViewLogs(props) {
    const { schemaName, icon, user, date, projectOrTaskName } = props;

    // date in  words
    let day = date.slice(8, 10)
    let monthNumber = date.split("-")[1];
    let month = Number(monthNumber)
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = monthNames[month - 1];
    let dateInString = monthName + " " + day

    const onSmallScreen = useWindowsWidth();

    let taskNameLength = () => {

        if (onSmallScreen > 991 && projectOrTaskName.length > 15) {

            return projectOrTaskName.slice(0, 15) + "...";
        }
        else
            return projectOrTaskName;
    }

    return (
        <>
            <div data-tip={projectOrTaskName} data-for='logsToolTip' data-place='top'>
                <div data-for="projectName" className=" container logsContainer " >
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
                        <div className="col logTaskName">
                            {taskNameLength()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col logUser">
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
            </div>
            <ReactTooltip id="logsToolTip" />
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
}

const mapStateToProps = (state) => {
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewLogs);


