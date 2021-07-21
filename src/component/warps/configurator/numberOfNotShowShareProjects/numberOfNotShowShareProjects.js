import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './numberOfNotShowShareProjects.css'
import title from '../../../../../src/Data/title.json';
import ReactTooltip from 'react-tooltip';
//component to show num of share projects that user show

function NumberOfNotShowShareProjects(props) {
    const [numOfNotShowShareProjects, setNumOfNotShowShareProjects] = useState()
    useEffect(() => {
        setNumOfNotShowShareProjects(props.sharedProjects.filter(x => x.ifShow === false).length)
    }, [props.sharedProjects])
    return (
        <>
            <p className='ml-1 pl-2 pr-2 p_numOfNotShowShareProjects'>
                {numOfNotShowShareProjects ? numOfNotShowShareProjects : null}
                <ReactTooltip className="tooltip-style" data-tip id="more_a" place="top" effect="solid">
                    {title.title_num_show_share_projects}
                </ReactTooltip></p>
        </>
    )
}

export default connect(
    (state) => {
        return {
            sharedProjects: state.public_reducer.sharedProjects
        }
    },
    (dispatch) => {

    }
)(NumberOfNotShowShareProjects)