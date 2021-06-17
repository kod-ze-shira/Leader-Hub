
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './file.css'
// import { actions } from '../../../../redux/actions/action'
function File(props) {

    const [file, setFile] = useState()
    useEffect(() => {

        if (props.file.url == 'new' && props.file) {
            setFile(URL.createObjectURL(props.file.file))
        }

    }, [props.file])
    function deleteFile() {
        props.removeFileInRedux({ 'name': props.file.name, 'url': props.file.url })
    }
    function downloadFile(e) {
        props.setDownloadFile(true)
        props.downloadFile({ 'file': props.file, 'e': e })
        // props.showViewDetails(true)
    }
    return (
        <>
            <div className='fileInTask  mb-3 row'
                id={props.file.url ? props.file.url : props.file.name}>
                <div className={props.file && (props.file.name.endsWith(".pdf") || props.file.name.endsWith(".docx")) ?
                    'col-4  imgFileInTask ' : 'col-4  imgFileInTask pr-0'}
                // {props.file.url ? 'mt-5' : null}
                >
                    {props.file.url != 'new' ?
                        <a href={props.file.url} target="_blank">
                            {props.file.name.endsWith(".pdf") ?
                                <FontAwesomeIcon className='fontAwesomeIconFile pdfFile'
                                    icon={['fas', 'file-pdf']}
                                ></FontAwesomeIcon> :
                                props.file.name.endsWith(".docx")
                                    ? <FontAwesomeIcon className='fontAwesomeIconFile'
                                        icon={['fas', 'file-word']}
                                    ></FontAwesomeIcon> :
                                    <img src={props.file.url}></img>
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
                        {props.file.url != 'new' ?
                            <a href={props.file.url} target="_blank" style={{ 'color': '#358A8D' }}>{props.file.name}</a>
                            : <span> {props.file.name}</span>}

                    </span>
                    {/* <div> */}
                    <span className='sizeFile' >{(props.file.size / 1024).toFixed(2)}Mb</span>
                    {props.file.url != 'new' ?
                        <img onClick={(e) => {
                            downloadFile(e)
                        }} style={{ float: 'right' }}
                            className='downloadFileInTask mt-4 imgActionFile'
                            src={require('../../../img/download.svg')}></img>
                        : null}
                    <img onClick={() => deleteFile()} className='mr-1 ml-1 mt-4 imgActionFile' style={{ float: 'right' }}
                        src={require('../../../img/Group 21592.svg')}></img>
                    {/* <FontAwesomeIcon onClick={() => deleteFile()} className='mr-1 ml-1' style={{ float: 'right' }}
                        icon={['fas', 'trash-alt']}
                    ></FontAwesomeIcon> */}


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

        }
    }
)(File)