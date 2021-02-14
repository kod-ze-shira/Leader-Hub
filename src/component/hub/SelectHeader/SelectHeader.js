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

    // demo:focus {
    //     border: 0,
    //     color:'#00C6EA' ,
    //     // indicatorColor:'#00C6EA'
    // }
    // '&:focus': {
    //     color: '#00C6EA',
    // },

}));

function SelectHeader(props) {
    // const [value, setValue] = React.useState(2);

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const color = '#00C6EA'

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className="s-header mx-0 mb-3 row align-items-center ">

            <div className="col pr-0">
                <SelectWorkspace />
            </div>
            <div className="col pr-0">
                <SelectProject />
            </div>
            <div className="col pr-0">
                <SelectCards />
            </div>
            <div className="col pr-0">
                <SelectTask />
            </div>
            <div className="col pr-0"></div>
            {/* <div className="col-6 ">
                <a className="offset-5 a" href="#">List</a>
                <a className="ml-5 " href="#">Calender</a>
                <a className="ml-5" href="#">Gant</a>
                <a className="ml-5" href="#">Tabs</a>
            </div> */}
            <div className={classes.root}>
                <Tabs
                    className="offset-3"
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="off"
                    indicatorColor={classes.indicator}
            
                    textColor='4FC3F7'
                    aria-label="scrollable prevent tabs example"
                >
                    {/* <div className={classes.demo}> */}
                    <Tab
                        label="List" />
                    <Tab label="Calender" />
                    <Tab label="Gant" />
                    <Tab label="Tabs" />
                    {/* </div> */}
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