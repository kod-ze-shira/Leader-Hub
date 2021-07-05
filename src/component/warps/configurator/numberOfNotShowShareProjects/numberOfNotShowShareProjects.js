import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
function NumberOfNotShowShareProjects(props){
    const [numOfNotShowShareProjects,setNumOfNotShowShareProjects]=useState()
        useEffect(()=>{
            setNumOfNotShowShareProjects(props.sharedProjects.filter(x=>x.ifShow==false).length)
        })
    return(
        <>
        {numOfNotShowShareProjects}
        </>
    )
}

export default connect(
    (state)=>{
        return{
            sharedProjects:state.public_reducer.sharedProjects
        }    
    },
    (dispatch)=>{

    }
)(NumberOfNotShowShareProjects)