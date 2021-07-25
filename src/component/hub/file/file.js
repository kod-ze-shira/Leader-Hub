
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './file.css'
import { actions } from '../../../redux/actions/action';


import $ from 'jquery'

function File(props) {
    const [progressFile, setProgressFile] = useState(10)
    const [file, setFile] = useState()
    // if (progressFile < 99) {
    //     setTimeout(() => {
    //         setProgressFile(40)
    //     }, 300);
    //     setTimeout(() => {
    //         setProgressFile(70)
    //     }, 300);

    // }
    useEffect(() => {

        if (props.file.src == 'new' && props.file) {
            setFile(URL.createObjectURL(props.file.file))
            setTimeout(() => {
                setProgressFile(30)
            }, 200);
            setTimeout(() => {
                setProgressFile(60)
            }, 400);
            setTimeout(() => {
                setProgressFile(80)
            }, 600);
        } else {
            setProgressFile(99)
            setTimeout(() => {
                setProgressFile(100)
            }, 400);

        }

    }, [props.file])
    function deleteFile(e) {
        props.removeFileInRedux({ 'name': props.file.name, 'src': props.file.src })
        props.removeFileInTaskAndServerFiles({
            'name': props.file.name,
            'src': props.file.src,
            'taskId': props.taskId
        })
        // let r = document.getElementById(e.currentTarget.id)
        // $(`#file_${e.currentTarget.id}`).remove();

    }
    function downloadFile(e) {
        props.setDownloadFile(true)
        props.downloadFile({ 'file': props.file, 'e': e })
        // props.showViewDetails(true)
    }
    function showFiles(url) {
        props.src(url)
        props.shoewModalFiles(true)
    }
    return (
        <>
            <div className='fileInTask  mb-3 row' id={`file_${props.file.name}`}
                id={props.file.src ? props.file.src : props.file.name}>
                <div className={props.file && (props.file.name.endsWith(".pdf") || props.file.name.endsWith(".docx")) ?
                    'col-4  imgFileInTask ' : 'col-4  imgFileInTask pr-0'}
                // {props.file.src ? 'mt-5' : null}
                >
                    {props.file.src != 'new' ?
                        <a href={props.file.src} target="_blank">
                            {props.file.name.endsWith(".pdf") ?
                                <FontAwesomeIcon className='fontAwesomeIconFile pdfFile'
                                    icon={['fas', 'file-pdf']}
                                ></FontAwesomeIcon> :
                                props.file.name.endsWith(".docx")
                                    ? <FontAwesomeIcon className='fontAwesomeIconFile'
                                        icon={['fas', 'file-word']}
                                    ></FontAwesomeIcon> :
                                    <img src={props.file.src}></img>
                            }
                        </a> :
                        props.file.name.endsWith(".pdf") ?
                            <FontAwesomeIcon className='fontAwesomeIconFile pdfFile'
                                icon={['fas', 'file-pdf']}
                            ></FontAwesomeIcon> :
                            props.file.name.endsWith(".docx") ?
                                <FontAwesomeIcon style={{ color: 'rgb(0, 123, 255)' }} className='fontAwesomeIconFile'
                                    icon={['fas', 'file-word']}
                                ></FontAwesomeIcon> :
                                <img src={file}></img>}

                    ‏

                </div>
                <div className='col-8  nameFileAndAction'>
                    <span className='nameFileInTask'>
                        {props.file.src != 'new' ?
                            <a href={props.file.src} target="_blank"
                                // <a href='#'
                                // onClick={() => showFiles(props.file.src)}
                                style={{ 'color': '#358A8D' }}
                            >{props.file.name}
                            </a>
                            : <span> {props.file.name}</span>}

                    </span>
                    {/* <div> */}
                    <span className='sizeFile' >{(props.file.size / 1024).toFixed(2)}Kb</span>
                    {(progressFile != 100 && props.file.src == 'new') ?
                        <div className="progressFile"
                            // ref={refToProject}
                            style={{ backgroundColor: '#e9ecef' }}
                        >


                            <div role="progressbar" className="progressProject-bar "
                                style={{ "width": progressFile + "%", background: 'rgb(53, 138, 141)' }}
                                aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                data-tip data-for="percentage" >

                            </div>

                        </div>
                        : null
                    }

                    {props.file.src != 'new' ?
                        <img onClick={(e) => {
                            downloadFile(e)
                        }} style={{ float: 'right' }}
                            className='downloadFileInTask mt-4 imgActionFile'
                            src={require('../../../assets/img/download.svg')}></img>
                        : null}
                    {props.file.src != 'new' &&
                        <img onClick={(e) => deleteFile(e)} id={props.file.name} className='mr-1 ml-1 mt-4 imgActionFile' style={{ float: 'right' }}
                            src={require('../../../assets/img/Group 21592.svg')}></img>
                    }




                </div>

            </div>



        </>
    )
}

export default connect(
    (state) => {
        return {
            files: state.files_reducer.files
        }
    },
    (dispatch) => {
        return {
            downloadFile: (file) => dispatch(actions.downloadFile(file)),
            removeFileInRedux: (filesArr) => dispatch(actions.removeFileInRedux(filesArr)),
            removeFileInTaskAndServerFiles: (file) => dispatch(actions.removeFileInTaskAndServerFiles(file))
        }
    }
)(File)