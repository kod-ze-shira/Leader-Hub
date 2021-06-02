import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actions } from '../../../redux/actions/action';
import DisplayGantt from '../../Gantt/DisplayGantt/displayGantt';
import Overview from '../../hubFeature/Overview/Overview';
import ProjectPlatform from '../projectPlatform/projectPlatform';
import SelectHeader from '../SelectHeader/SelectHeader';
import Tabs from '../tabs/tabs';



function CardsPage(props) {

    const [flag, setFlag] = useState();
    const [present, setPresent] = useState("tabs");
    const [number, setNumber] = useState()
    const { idProject } = useParams();


    useEffect(() => {
        if (props.cards.length < 1)
            props.getCardsByProjectId(idProject)
        if ((window.location.href.indexOf('list') != -1)) {
            setPresent("list")
            setNumber(1)
        }
        else
            if ((window.location.href.indexOf('tabs') != -1)) {
                setPresent("tabs")
                setNumber(0)
            }
            else
                if ((window.location.href.indexOf('gantt') != -1)) {
                    setPresent("gantt")
                    setNumber(3)
                }
                else
                    if ((window.location.href.indexOf('Overview') != -1)) {
                        setPresent("Overview")
                        setNumber(2)
                    }

    }, [])

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
                    focusInputCard={props.focusInputCard}
                    viewToastComplete={props.viewToastComplete}
                    viewContactList={props.viewContactList} />
            case 'list':
                return <ProjectPlatform
                    viewToastComplete={props.viewToastComplete}
                    showToast={showToast} flag={flag} focusInputCard={props.focusInputCard}
                    viewContactList={props.viewContactList} />
            case 'gantt':
                return <DisplayGantt />
            case 'Overview':
                return <Overview />
            default:
                // return <Tabs showToast={showToast} projectId={props.project._id} />
                return <ProjectPlatform
                    viewToastComplete={props.viewToastComplete}
                    showToast={showToast} flag={flag} />
        }
    }
    return (
        <div className="">
            <SelectHeader number={number} flag={changeFlag} from={howToPresent} menue={true} type='cards' />
            {renderSwitch()}

        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        workspaces: state.public_reducer.workspaces,
        project: state.project_reducer.project,
        cards: state.public_reducer.cards,
        statuses: state.status_reducer.statuses

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCardsByProjectId: (projectId) => dispatch(actions.getCardsByProjectId(projectId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardsPage)