import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../../redux/actions/action.js';
import './viewFile.css'

function ViewFile(props) {
    const file = props.file
    const ref = useRef(props.fileRef)

    return (
        <>
            <div className="viewFile col p-2">

                {/* <input type="checkbox" className="selectFile" ></input>   */}
                <a href={file.url} target="_blank" className="fileName">
                    <div className="fileItem">
                        {/* <div> */}
                        <div className="row-10 wrapImg">

                            <img alt="Responsive image" src={file.name.endsWith('.pdf') ? require('../../.././../../assets/img/file_pdf.png') :
                                file.name.endsWith('.doc') ? require('../../../../../assets/img/word.png') : file.url} className="imgFile img-fluid"></img>
                            <label
                                title="check file"
                                className="selectFile py-2 check-tabs row">
                                <input type="checkbox" ref={ref} onChange={(e) => props.addOrRemoveFileToArr(e, file, ref)} />
                                <span
                                    className="checkmarkFile checkmarkFile-tabs"
                                ></span>
                            </label>
                        </div>
                        <div className="row-2 wrapLink">
                            <p>{file.name.length > 10 ? file.name.slice(0, 10) + "..." : file.name}</p>
                        </div>
                        {/* </div> */}
                    </div>
                </a>

            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        downloadFile: (file) => dispatch(actions.downloadFile(file)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFile)