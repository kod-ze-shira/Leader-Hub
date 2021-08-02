import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actions } from '../../../redux/actions/action';
import DisplayGantt from '../../Gantt/DisplayGantt/displayGantt';
import Overview from '../../hubFeature/Overview/Overview';
import ProjectPlatform from '../projectPlatform/projectPlatform';
import SelectHeader from '../SelectHeader/SelectHeader';
import Tabs from '../tabs/tabs';
// import Hangout from "../../hubFeature/Overview/hangout/hangout";

function CardsPage(props) {

    const [flag, setFlag] = useState();
    const [present, setPresent] = useState("tabs");
    const [number, setNumber] = useState()
    const { idProject } = useParams();


    useEffect(() => {
        if (props.cards.length < 1) {
            props.getCardsByProjectId(idProject)
        }
        if (props.contactsUser.length === 0)
            props.getContactsForUser()

        if ((window.location.href.indexOf('list') !== -1)) {
            setPresent("list")
            setNumber(1)
        }
        else
            if ((window.location.href.indexOf('tabs') !== -1)) {
                setPresent("tabs")
                setNumber(0)
            }
            else
                if ((window.location.href.indexOf('gantt') !== -1)) {
                    setPresent("gantt")
                    setNumber(3)
                }
                else
                    if ((window.location.href.indexOf('Overview') !== -1)) {
                        setPresent("Overview")
                        setNumber(2)
                    }
        if (!props.statuses) {
            props.getAllStatusesTaskForWorkspace()
        }
    }, [])

    useEffect(() => {
        for (let i = 0; i < props.workspaces.length; i++) {
            let projectIndex = props.workspaces[i].projects.findIndex((p) => p._id === idProject)
            if (projectIndex >= 0) {
                props.setIndexOfWorkspace(i)
                props.setCurrentIndexProject(projectIndex)

            }
        }

    }, [props.workspaces, props.cards])

    const changeFlag = (value) => {
        setFlag(value)
    }
    const howToPresent = (value) => {
        setPresent(value)
    }
    function showToast(valueToDelet) {
        props.showToastDelete(valueToDelet)
    }
    const renderSwitch = () => {
        switch (present) {
            case 'tabs':
                return <Tabs showToast={showToast}
                    closeCalendarOrContact={props.closeCalendarOrContact}
                    showRocketShip={props.showRocketShip}
                    focusInputCard={props.focusInputCard}
                    viewToastMassege={props.viewToastMassege}
                    viewContactList={props.viewContactList} />
            case 'list':
                return <ProjectPlatform
                    closeCalendarOrContact={props.closeCalendarOrContact}
                    viewToastMassege={props.viewToastMassege}
                    showRocketShip={props.showRocketShip}
                    showToast={showToast} flag={flag}
                    focusInputCard={props.focusInputCard}
                    viewContactList={props.viewContactList} />
            case 'gantt':
                return <DisplayGantt />
            case 'Overview':
                return <Overview />
            default:
                return <ProjectPlatform
                    closeCalendarOrContact={props.closeCalendarOrContact}
                    showRocketShip={props.showRocketShip}
                    viewToastMassege={props.viewToastMassege}
                    showToast={showToast} flag={flag} />
        }
    }
    return (
        <>
            <div className="">
                <SelectHeader number={number} flag={changeFlag} from={howToPresent} menue={true} type='cards' />
                {renderSwitch()}
                {/* <Hangout></Hangout> */}

            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.workspaces,
        cards: state.public_reducer.cards,
        statuses: state.status_reducer.statuses,
        contactsUser: state.share_reducer.contactsUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
        getContactsForUser: () => dispatch(actions.getContactsForUser()),
        getAllStatusesTaskForWorkspace: () => dispatch(actions.getAllStatusesTaskForWorkspace()),
        setIndexOfWorkspace: (index) => dispatch(actions.indexOfWorkspace(index)),
        setCurrentIndexProject: (index) => dispatch(actions.setCurrentIndexProject(index)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardsPage)