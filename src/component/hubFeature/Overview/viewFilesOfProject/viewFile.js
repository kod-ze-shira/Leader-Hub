import React,{useRef} from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action.js';
import './viewFilesOfProject.css'

function ViewFile(props){
   const file=props.file
    const ref=useRef(props.fileRef)

    return(
        <>
          <div className="viewFile col p-2">
           <div  className="fileItem"  onClick={(e)=>props.addOrRemoveFileToArr(e,file,ref)}> 
           {/* <input type="checkbox" className="selectFile" ></input>   */}
           <div className="row-10 wrapImg">
               
               <img src={file.name.endsWith('.pdf')?require('.././../../img/file_pdf.png'):
               file.name.endsWith('.doc')?require('../../../img/word.png'):file.url} className="imgFile"></img> 
            <label
                                    title="check file"
                                    className="selectFile py-2 check-tabs row">
                                    <input type="checkbox" ref={ref}/>
                                    <span
                                        className="checkmarkFile checkmarkFile-tabs"
                                    ></span>
          </label>
           </div>
           <div className="row-2 wrapLink"><a href={file.url} target="_blank" className="fileName">{file.name.length>10?file.name.slice(0,10)+"...":file.name}</a></div>
                 </div>
            </div>
        </>
    )
}


const mapStateToProps=(state)=>{
    return{

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        downloadFile: (file) => dispatch(actions.downloadFile(file)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewFile)