import React, { useState } from 'react'
import CardsByProject from '../../Cards/cardsByProject/cardsByProject'
// import DetailsProject from '../detailsProject/detailsProject'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import './viewCards.css'

function ViewCards(props) {

    // function detailsProject() {
    //     set_getProjectById(false);
    // }
    
    // const [getProjectById, set_getProjectById] = useState(true);
    const [ViewCards, setViewCards] = useState(false)
    return(
        <>
        <div className="container aa" >
        <h1>ViewCards</h1>
            <div className="row" onClick={()=>setViewCards(!ViewCards)}>
                <div className="col">
                    <div>name:{props.project.name}</div>
                    <div>description:{props.project.description}</div>
                </div>
            </div>
            <div>
          {ViewCards ? <CardsByProject projectId={props.project._id} /> : null}

                    <button onClick={() => { props.getCardsByprojectId()}}>getCardsByprojectId</button>
     
                    </div>
                    </div>
    
    
        </>
    )
}
const mapStateToProps = (state) => {
   
    return {
        project: state.project_reducer.project
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCardsByprojectId: () => dispatch(actions.getCardsByprojectId()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewCards)
