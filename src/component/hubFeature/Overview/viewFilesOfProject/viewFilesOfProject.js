import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action.js';
import './viewFilesOfProject.css'
import bin from '../../../img/bin.png'
import title from '../../../../Data/title.json'
import download from '../../../img/download.png'
import ReactTooltip from 'react-tooltip'
import ViewFile from './viewFile'
import {withRouter} from 'react-router-dom'

function FilesOfProject(props) {


    // useEffect(() => {

    //     console.log('useeffect');
    //     props.getFilesForProject(props.indexCurrentProject)

    // }, [props.indexCurrentProject])

    const filesForDownload = []
    const downloadRef=useRef()

function addOrRemoveFileToArr(e,file,ref){

        let index=0
        filesForDownload.forEach(f=>f._id==file._id?index=f._id:null)
        // for(let i=0;i<filesForDownload.length-1;i++){
        //     if(filesForDownload[i]._id==file._id)
        //         index=i
        // }
        if(index==0) {          
            ref.current.checked=true
            // e.currentTarget.children[0].children[1].children[0].checked=true
            filesForDownload.push(file)
             downloadRef.current.disabled=false
        }
        else {
            ref.current.checked=false
            e.currentTarget.children[0].children[1].children[0].checked=false   
            filesForDownload.splice(index,1)
            if(filesForDownload.length===0)
                downloadRef.current.disabled=true
        }
    }
    function downloadFile(e) {
        //     const link = document.createElement('a');
        // link.href = "https://files.codes/uploads/renana-il/img/1622614462003__‏‏צילום מסך (4).png";
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        // console.log(filesForDownload.length);

        alert('download')

        // filesForDownload.forEach(f => props.downloadFile({ "file": f }))

    }
    function deleteFile() {

    }

    return (
        <>
        <div className="filesForProject backgroundWhiteAndBorderRadius">
            <div className="row">
           <h3 className="col-9" id="title">Project Files</h3>
            <div className="col-3 row iconsList" >
                    {/* <div className=" delete iconControl"
                        onClick={deleteFile}
                        data-tip data-for="delete"
                    >
                        <img class='imageIcon' src={bin} ></img>
                        <ReactTooltip data-tip id="delete" place="top" effect="solid">
                            {title.title_delete}
                        </ReactTooltip>
                    </div>
                    <div className="stripe stripeToSavePlace" >|</div> */}
                    <div className="add iconControl" ref={downloadRef} disabled="true" onClick={downloadFile} data-tip data-for="download" >
                        <img class='imageIcon' src={download} ></img>
                        <ReactTooltip data-tip id="download" place="top" effect="solid">
                            {title.title_downLoad}
                        </ReactTooltip>

                        </div>
                    </div>
                </div>
                <hr></hr>

                {props.location.state.files.length?

                    //
                    <div className="container" >
                        <div class="row row-cols-4 row-cols-lg-6 g-2">
                            {props.location.state.files.map((file,index) => 
                            <ViewFile>
                                file={file},
                                addOrRemoveFileToArr={addOrRemoveFileToArr},
                                fileRef={'ref'+index}
                            </ViewFile>)}</div></div> : "there arent files"}
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        FilesOfProject: state.public_reducer.filesForProjectArr,
        indexCurrentProject: state.public_reducer.indexCurrentProject
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        getFilesForProject:(p)=>dispatch(actions.getFilesForProject(p)),
        downloadFile: (file) => dispatch(actions.downloadFile(file)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FilesOfProject))