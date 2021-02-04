import React from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action'
import './dropDownWorkspace.css'
import { withRouter } from 'react-router-dom';
// import EditWorkspace from '.././editWorkspace/editWorkspace'
// import project_reducer from '../../../../redux/Reducers/project_reducer';

function DropDownWorkspace(props) {
    function routeToWrkspace(e) {

        let index = props.worksapces.findIndex(x => e.target.value == x._id)
        props.setWorkspace(props.worksapces[index])
        props.history.push("/" + props.user + "/workspace/" + e.target.value)
    }

    return (
        <>
            <select className="form-select textLogo" name="country"
                onChange={(e) => routeToWrkspace(e)}>
                <option default className='textLogo'>
                    {props.nameWorkspace}
                </option>
                {props.worksapces.map(item => (item.name != props.nameWorkspace ?
                    <option className='textLogo' value={item._id} >
                        {item.name}
                    </option> : null
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