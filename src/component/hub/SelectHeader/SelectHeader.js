import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import './selectHeader.css'
import SelectProject from '../SelectHeader/selectProject/selectProject';
import SelectWorkspace from '../SelectHeader/selectWorkspace/selectWorkspace'
import SelectCards from '../SelectHeader/selectCards/selectCards'
import SelectTask from '../SelectHeader/selectTask/selectTask'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useParams, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import history from "../../history"



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // width: '%',
        // backgroundColor: theme.palette.background.cyan,
        color: '#778CA2',
    },
    label: {
        color: '#FFF000'
    },
    indicator: {
        backgroundColor: '#00C6EA'
    }
}));

function SelectHeader(props) {
    const classes = useStyles();

    // const [value, setValue] = useState(props.number);
    const [value, setValue] = useState(1);

    const color = '#00C6EA'
    const { idProject } = useParams();

    useEffect(() => {
        if (props.workspaces.length == 0)
            props.getAllWorkspaces()
        // if (history.location.pathname.indexOf('list') != -1)
        //     setValue(1)
        // else
        //     if (history.location.pathname.indexOf('Overview') != -1)
        //         setValue(2)
        //     else
        //         if (history.location.pathname.indexOf('gantt') != -1)
        //             setValue(3)

    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const changeFlag = (value) => {
        props.flag(value)
    }
    const changePresent = (e) => {

        props.from(e)

        props.history.push("/" + props.user + "/hub/projectPlatform/" + idProject + '/' + e)
    }
    function backToPage() {

        if (window.location.href.indexOf('workspace') != -1 || window.location.href.indexOf('allProjects') != -1)
            props.history.push("/" + props.user + "/hub/")
        else
            if (window.location.href.indexOf('projectPlatform') != -1)
                props.history.push("/" + props.user + "/hub/workspace/" + props.workspaces[props.indexOfWorkspace]._id)
    }

    return (
        <>
            <div className="s-header mx-0  row align-items-center">
                <FontAwesomeIcon className="ml-3 back-header"
                    onClick={backToPage} id='close' icon={["fas", "chevron-left"]} />
                {props.workspaces.length > 0 ?
                    <>
                        <div className="col-md col-sm-2 pr-0">
                            <SelectWorkspace workspaces={props.workspaces} projectPage={props.menue ? false : true} />
                        </div>
                        <div className="col-md col-sm-2 pr-0">
                            <SelectProject selectProject={props.selectProject} workspaces={props.workspaces} />
                        </div>

                        <div className="col-md col-sm-2 pr-0">
                            <SelectCards flag={changeFlag} />
                        </div>
                        <div className="col-md col-sm-2 pr-0">
                            <SelectTask />
                        </div>
                    </> :
                    <Tabs className="tabs-in-header offset-md-4 w-sm-15 opacity">
                        <Tab label="List" className="tab" />
                        <Tab label="Calender" className="tab" />
                        <Tab label="Gant" className="tab" />
                        <Tab label="Tabs" className="tab" />
                    </Tabs>}

                {window.location.href.indexOf('allProjects') != -1 ||
                    window.location.href.indexOf('workspace') != -1 ?

                    <>
                        {window.location.href.indexOf('workspace') != -1 ?
                            <div className='row col-5' id='tabsAndList' >

                                <div class="input-group inputSearchProject col-9 row mt-0 pr-0" >
                                    <div class="input-group-prepend">
                                        {/* <FontAwesomeIcon icon={["fas", "search"]} /> */}
                                        <img src={require('../../img/onic-ios-search.png')} />

                                    </div>

                                    <input type="text" class="col-10" placeholder="Search project..."
                                        onChange={(e) => props.valueSearchProject(e.target.value)}
                                        aria-label="Username" aria-describedby="basic-addon1" />

                                </div>
                                <button className='buttonNewProject col-3' data-tip data-for="add_p"
                                    onClick={(e) => props.openViewDitailsAddProject({ 'e': e, 'show': true })}
                                >+ New Project</button>
                            </div>
                            :
                            <div className='row col-4 pr-0' id='tabsAndList' >

                                <div class="input-group inputSearchProject col-12 row pr-0">
                                    <div class="input-group-prepend">
                                        {/* <FontAwesomeIcon icon={["fas", "search"]} /> */}
                                        <img src={require('../../img/onic-ios-search.png')} />

                                    </div>
                                    <input type="text" class="col-10" placeholder="Search project..."
                                        onChange={(e) => props.valueSearchProject(e.target.value)}
                                        aria-label="Username" aria-describedby="basic-addon1" />


                                </div>
                            </div>
                        }
                    </>

                    :
                    <div className={classes.root} id='tabsAndList '>
                        {props.menue ?
                            <Tabs
                                className="tabs-in-header offset-md-4 w-sm-15"
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="off"
                                TabIndicatorProps={{ style: { backgroundColor: '#44D7B6' } }}
                                aria-label="scrollable prevent tabs example"

                                
                            >
                                <Tab label="Overview" className='tabsInSelect' onClick={(e) => changePresent("Overview")} />
                                <Tab label="Tabs" className='tabsInSelect' onClick={(e) => changePresent("tabs")} />
                                <Tab label="List" className='listInSelect' onClick={(e) => changePresent("list")} />
                                <Tab label="Gant" className='tabsInSelect' onClick={(e) => changePresent("gantt")} />

                            </Tabs>
                            :
                            <Tabs
                                className="tabs-in-header offset-md-4 w-sm-15 opacity">
                                <Tab label="List" className="tab" />
                                <Tab label="Calender" className="tab" />
                                <Tab label="Gant" className="tab" />
                                <Tab label="Tabs" className="tab" />
                            </Tabs>
                        }
                    </div>

                }
            </div>

        </>
    )
}
const mapStateToProps = (state) => {
    return {
        cards: state.public_reducer.cards,
        workspaces: state.public_reducer.workspaces,
        workspace: state.workspace_reducer.workspace,
        user: state.public_reducer.userName,
        indexOfWorkspace: state.public_reducer.indexOfWorkspace,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // indexOfWorkspace: (index) => dispatch(actions.indexOfWorkspace(index)),
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectHeader))