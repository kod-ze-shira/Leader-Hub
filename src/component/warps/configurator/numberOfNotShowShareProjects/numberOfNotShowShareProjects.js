import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

//component to show num of share projects that user show

function NumberOfNotShowShareProjects(props){
    const [numOfNotShowShareProjects,setNumOfNotShowShareProjects]=useState()
        useEffect(()=>{
            setNumOfNotShowShareProjects(props.sharedProjects.filter(x=>x.ifShow==false).length)
        })
    return(
        <>
        {numOfNotShowShareProjects?numOfNotShowShareProjects:null}
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