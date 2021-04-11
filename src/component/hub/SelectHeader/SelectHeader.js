import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import './selectHeader.css'
import Logo from '../logo/logo'
import SelectProject from '../SelectHeader/selectProject/selectProject';
import SelectWorkspace from '../SelectHeader/selectWorkspace/selectWorkspace'
import SelectCards from '../SelectHeader/selectCards/selectCards'
import SelectTask from '../SelectHeader/selectTask/selectTask'
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';


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
    const [value, setValue] = React.useState(0);
    const color = '#00C6EA'

    useEffect(() => {
        if (props.workspaces.length == 0)
            props.getAllWorkspacesFromServer()
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const changeFlag = (value) => {
        props.flag(value)
    }
    const changePresent = (e) => {
        console.log(e)
        props.from(e)
    }

    return (
        <>
            {props.workspaces.length > 0 ?
                <div className="s-header mx-0 mb-3 row align-items-center mt-5">

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

                    <div className={classes.root}>
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
                                <Tab label="Tabs" onClick={(e) => changePresent("tabs")} />
                                <Tab label="List" onClick={(e) => changePresent("list")} />
                                <Tab label="" />
                                <Tab label="" />
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
                </div >
                : null}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        cards: state.public_reducer.cards,
        workspaces: state.public_reducer.workspaces,
        workspace: state.workspace_reducer.workspace,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspacesFromServer: () => dispatch(actions.getAllWorkspacesFromServer())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectHeader)