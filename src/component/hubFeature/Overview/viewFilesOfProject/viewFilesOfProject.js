import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../redux/actions/action.js';
import './viewFilesOfProject.css'
import bin from '../../../img/bin.png'
import title from '../../../../Data/title.json'
import download from '../../../img/download.png'
import ReactTooltip from 'react-tooltip'
import ViewFile from './viewFile'

function FilesOfProject(props) {


    useEffect(() => {

        console.log('useeffect');
        props.getFilesForProject(props.indexCurrentProject)

    }, [props.indexCurrentProject])

    const filesForDownloadOrDelete = []

function addOrRemoveFileToArr(e,file,ref){
        let index=0
        filesForDownloadOrDelete.forEach(f=>f._id==file._id?index=f._id:null)
        // for(let i=0;i<filesForDownloadOrDelete.length-1;i++){
        //     if(filesForDownloadOrDelete[i]._id==file._id)
        //         index=i
        // }
        if(index==0) {
            ref.current.checked=true
            // e.currentTarget.children[0].children[1].children[0].checked=true
            filesForDownloadOrDelete.push(file)

        }
        else {
            ref.current.checked=false
            e.currentTarget.children[0].children[1].children[0].checked=false   
            filesForDownloadOrDelete.splice(index,1)
        }
    }
    function downloadFile(e) {
        //     const link = document.createElement('a');
        // link.href = "https://files.codes/uploads/renana-il/img/1622614462003__‏‏צילום מסך (4).png";
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        // console.log(filesForDownloadOrDelete.length);
        filesForDownloadOrDelete.forEach(f => props.downloadFile({ "file": f }))

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
                    <div className="add iconControl" onClick={downloadFile} data-tip data-for="download" >
                        <img class='imageIcon' src={download} ></img>
                        <ReactTooltip data-tip id="download" place="top" effect="solid">
                            {title.title_downLoad}
                        </ReactTooltip>

                        </div>
                    </div>
                </div>
                <hr></hr>

                {props.FilesOfProject.length ?

                    //
                    <div className="container" >
                        <div class="row row-cols-4 row-cols-lg-6 g-2">
                            {props.FilesOfProject.map((file) => <div className="viewFile col p-2">
                                <div className="fileItem" onClick={(e) => addOrRemoveFileToArr(e, file)}>
                                    {/* <input type="checkbox" className="selectFile" ></input>   */}

                                    <div className="row-10 wrapImg" >
                                        <img src={file.url} className="imgFile"></img>
                                        <label
                                            title="check file"
                                            className="selectFile py-2 check-tabs row">
                                            <input type="checkbox"
                                            // name="complete"
                                            // checked={doneStatus}
                                            // value={props.task.complete}
                                            // onChange={(e) => changeFiledInTask(e)}
                                            // onClick={(e) => e.stopPropagation()
                                            // }
                                            />
                                            <span
                                                className="checkmarkFile checkmarkFile-tabs"
                                            // onClick={(e) => addChalalit(e)}
                                            ></span>
                                        </label>
                                    </div>
                                    <div className="row-2 wrapLink"><a href={file.url} target="_blank">{file.name?.length > 12 ? file.name.slice(0, 12) + "..." : file.name}</a></div>
                                </div>
                            </div>)}</div></div> : "there arent files"}
                {/* <input type="file"></input> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(FilesOfProject)