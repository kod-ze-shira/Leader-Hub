import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import './selectHeader.css'
import ProjectsList from '../projectPlatform/projectsList/projectsList'
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
    const [flag, setFlag] = useState(true);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const color = '#00C6EA'

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const changeFlag = (value) => {
        setFlag(value)
        props.flag(flag)
    }

    return (
        <div className="s-header mx-0 mb-3 row align-items-center ">

            <div className="col pr-0">
                <SelectWorkspace />
            </div>
            <div className="col pr-0">
                <SelectProject />
            </div>
            <div className="col pr-0">
                <SelectCards flag={changeFlag} />
            </div>
            <div className="col pr-0">
                <SelectTask />
            </div>
        
            <div className={classes.root}>
                <Tabs
                    className="tabs-in-header offset-3"
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="off"
                    TabIndicatorProps={{ style: { backgroundColor: '#6DD41F' } }}
                    aria-label="scrollable prevent tabs example"
                >
                    <Tab
                        label="List" />
                    <Tab label="Calender" />
                    <Tab label="Gant" />
                    <Tab label="Tabs" />
                </Tabs>
            </div>
        </div >

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
export default connect(mapStateToProps, mapDispatchToProps)(SelectHeader)