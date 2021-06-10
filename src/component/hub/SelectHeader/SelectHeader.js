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
    const [value, setValue] = useState(0);

    const color = '#00C6EA'
    const { idProject } = useParams();

    useEffect(() => {
        if (props.workspaces.length == 0)
        if(!window.location.href.includes('share'))
            props.getAllWorkspaces()
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

    return (
        <>

            <div className="s-header mx-0  row align-items-center">
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
                    <Tabs className="tabs-in-header offset-md-4 w-sm-15 opacity"><Tab label="List" className="tab" /><Tab label="Calender" className="tab" /><Tab label="Gant" className="tab" />
                        <Tab label="Tabs" className="tab" /></Tabs>}

                {window.location.href.indexOf('allProjects') != -1 ||
                    window.location.href.indexOf('workspace') != -1 ?
                    <div className='row' id='tabsAndList' style={{
                        'height': '50px',
                        'margin-right': '9px',
                        'margin-top': '9px'
                    }}>


                        {window.location.href.indexOf('workspace') != -1 ?
                            <>
                                <div class="input-group inputSearchProject col-8">
                                    <input type="text" class="" placeholder="Search project..."
                                        onChange={(e) => props.valueSearchProject(e.target.value)}
                                        aria-label="Username" aria-describedby="basic-addon1" />

                                    <div class="input-group-prepend">
                                        <FontAwesomeIcon icon={["fas", "search"]} />
                                    </div>
                                </div>
                                <button className='buttonNewProject col-4' data-tip data-for="add_p"
                                    onClick={(e) => props.openViewDitailsAddProject({ 'e': e, 'show': true })}
                                >+ New Project</button>
                            </>
                            :
                            <div class="input-group inputSearchProject col-12">
                                <input type="text" class="" placeholder="Search project..."
                                    onChange={(e) => props.valueSearchProject(e.target.value)}
                                    aria-label="Username" aria-describedby="basic-addon1" />

                                <div class="input-group-prepend">
                                    <FontAwesomeIcon icon={["fas", "search"]} />
                                </div>
                            </div>}

                    </div>
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
                                <Tab label="Tabs" className='tabsInSelect' onClick={(e) => changePresent("tabs")} />
                                <Tab label="List" className='listInSelect' onClick={(e) => changePresent("list")} />
                                <Tab label="Overview" className='tabsInSelect' onClick={(e) => changePresent("Overview")} />
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



                {/* {props.type == 'projects' ?
                    <span>ff</span> : null} */}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspacesFromServer()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectHeader))