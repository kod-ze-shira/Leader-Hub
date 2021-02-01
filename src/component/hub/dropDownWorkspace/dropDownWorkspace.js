import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import './dropDownWorkspace.css'
import { withRouter } from 'react-router-dom';
// import EditWorkspace from '.././editWorkspace/editWorkspace'
// import project_reducer from '../../../../redux/Reducers/project_reducer';

function DropDownWorkspace(props) {
    function routeToWrkspace(e) {
        let r = props.worksapces.filter(x => e.target.value == x._id)
        props.setWorkspace(r)
        // איך מביאים וורקספייס לי 
        // ID
        // לא כמו הנ"ל
        props.history.push("/" + props.user + "/workspace/" + e.target.value)
    }

    return (
        <>
            <select className="form-select textLogo" name="country"
                onChange={(e) => routeToWrkspace(e)}>
                <option default className='textLogo'>
                    {props.nameWorkspace}
                </option>
                {props.worksapces.map(item => (
                    <option value={item._id} >
                        {item.name}
                    </option>
                ))}
            </select>‏
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        worksapces: state.public_reducer.worksapces,
        user: state.public_reducer.userName,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspaces: () => dispatch(actions.getAllWorkspaces()),
        setWorkspace: (w) => dispatch(actions.setWorkspace(w))

    }


}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DropDownWorkspace))
