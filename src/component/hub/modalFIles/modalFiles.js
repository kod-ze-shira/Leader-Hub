
import React, { useState, useCallback } from "react";
import ReactDOM from 'react-dom'
import Carousel, { Modal, ModalGateway } from "react-images";
import { actions } from "../../../redux/actions/action";
import { photos } from "./photos";
// import { actions } from '../../../redux/actions/action';
import { connect } from 'react-redux'

function ModalFiles(props) {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((index) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    // props.arrFilesOfTask.map((file) => {
    //             return <p>{file.url}</p>
    //         })

    return (
        <div>
            {/* <Gallery photos={photos} onClick={openLightbox} /> */}
            <img src={photos[0].url} onClick={() => openLightbox(1)}
            // photos={photos}
            ></img>
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map(x => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}
export default connect(
    (state) => {
        return {
            arrFilesOfTask: state.public_reducer.arrFilesOfTask
        }
    },
    (dispatch) => {
        return {
            downloadFile: (file) => dispatch(actions.downloadFile(file)),
            removeFileInRedux: (filesArr) => dispatch(actions.removeFileInRedux(filesArr)),
            removeFileInTaskAndServerFiles: (file) => dispatch(actions.removeFileInTaskAndServerFiles(file))
        }
    }
)(ModalFiles)