
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './file.css'
import { actions } from '../../../../redux/actions/action'

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
        // e.stopPropagation()
        props.downloadFile({ 'file': props.file, 'e': e })
        // props.showViewDetails(true)
    }
    return (
        <>
            <div className=' fileInTask  mb-3 row' id={props.file.url ? props.file.url : props.file.name}>
                <div className='col-4 displayInlineBlock imgFileInTask'>
                    {props.file.url != 'new' ?
                        <a href={props.file.url} target="_blank">
                            {props.file.name.endsWith(".pdf") ?
                                <FontAwesomeIcon className='fontAwesomeIconFile'
                                    icon={['fas', 'file-pdf']}
                                ></FontAwesomeIcon>
                                :
                                <img src={props.file.url}></img>
                            }
                        </a> :
                        <img src={file}></img>}

‏

                </div>
                <div className='col-8 displayInlineBlock nameFileAndAction'>
                    <span className='nameFileInTask'>
                        {props.file.url != 'new' ?
                            <a href={props.file.url} target="_blank" style={{ 'color': '#358A8D' }}>{props.file.name}</a>
                            : <span> {props.file.name}</span>}

                    </span>
                    {/* <div> */}
                    <span className='sizeFile' >{(props.file.size / 1024).toFixed(2)}Mb</span>
                    {props.file.url != 'new' ?
                        <img onClick={(e) => downloadFile(e)} style={{ float: 'right' }}
                            className='downloadFileInTask mt-4'
                            src={require('../../../img/download.svg')}></img>
                        : null}
                    <img onClick={(e) => downloadFile(e)} onClick={() => deleteFile()} className='mr-1 ml-1 mt-4' style={{ float: 'right' }}
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
            deleteFilesInTask: (filesArr) => dispatch(actions.deleteFilesInTask(filesArr)),
        }
    }
)(File)