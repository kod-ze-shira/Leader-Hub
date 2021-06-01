import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../redux/actions/action.js';
import './viewFilesOfProject.css'
import bin from '../../img/bin.png'
import title from '../../../Data/title.json'
import download from '../../img/download.png'
import ReactTooltip from 'react-tooltip'

function FilesOfProject(props){


    useEffect(()=>{
    
       console.log('useeffect');
        props.getFilesForProject(props.indexCurrentProject)
        // props.setFilesOfProject(props.indexCurrentProject)

    },[props.indexCurrentProject])
//props.indexOfCurrentProject



function downloadFile(){

}
function deleteFile(){

}

    return(
        <>
        <div className="filesForProject">
           <h3>Project Files</h3>
            <div className="row iconsList" >
                    <div className=" delete iconControl"
                        onClick={deleteFile}
                        data-tip data-for="delete"
                    >
                        <img class='imageIcon' src={bin} ></img>
                        <ReactTooltip data-tip id="delete" place="top" effect="solid">
                            {title.title_delete}
                        </ReactTooltip>
                    </div>
                    <div className="stripe stripeToSavePlace" >|</div>
                    <div className="add iconControl" onClick={downloadFile} data-tip data-for="download" >
                        <img class='imageIcon' src={download} ></img>
                        <ReactTooltip data-tip id="download" place="top" effect="solid">
                            {title.title_downLoad}
                        </ReactTooltip>

                    </div>
                </div>
                <br/>
                
                <hr></hr>
           
        {props.FilesOfProject.length?
        // <ul>{props.FilesOfProject.map((file)=><li><a href={file.url} target="_blank">{file.name}</a></li>)}</ul>:"there arent files"}
      <div className="container">  <div class="row row-cols-4 g-2">{props.FilesOfProject.map((file)=><div className="viewFile col p-2">
           <div className="fileItem"> 
           <div className="row-10 wrapImg"><img src={file.url} className="imgFile"></img> </div>
           <div className="row-2 wrapLink"><a href={file.url} target="_blank">{file.name}</a></div>        </div>
            </div>)}</div></div>:"there arent files"}
        {/* <input type="file"></input> */}
        </div>
        </>
    )
}

const mapStateToProps=(state)=>{
    return {
        FilesOfProject:state.public_reducer.filesForProjectArr,
        indexCurrentProject:state.public_reducer.indexCurrentProject
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        setFilesOfProject:(f)=>dispatch(actions.setFilesOfProject(f)),
        getFilesForProject:(p)=>dispatch(actions.getFilesForProject(p)),
    
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FilesOfProject)