import $ from 'jquery'
import { actions } from '../actions/action'

export const uploadFiles = ({ dispatch, getState }) => next => action => {
    // let files = getState().files_reducer.files
    if (action.type === 'UPLOAD_FILES') {

        let files = action.payload.files
        if (action.type === 'UPLOAD_FILES') {
            var formData = new FormData()
            // var myFiles = Object.values(files)
            if (files.length < 1) { console.log("ooops... not files to upload") }
            else {
                files.forEach((file, index) => {
                    formData.append("file" + index, file.file)
                })
            }
            console.log(formData)
            let jwtFromCookie = getState().public_reducer.tokenFromCookies;
            if (!!formData.entries().next().value == true) {
                $.ajax({
                    url: `https://files.codes/api/${getState().public_reducer.userName}/uploadMultipleFiles`,
                    method: 'post',
                    contentType: false,
                    processData: false,
                    headers: { "authorization": jwtFromCookie },
                    data: formData,
                    success: (data) => {

                        var myData = { "files": data.filesData }
                        dispatch(actions.setNewFilesInTask(data.filesData))
                        console.log("finish first ajax  " + JSON.stringify(myData));
                        setTimeout(() => {
                            $.ajax({
                                // url: `https://files.codes/api/renana-il/savedMultiFilesDB`,
                                url: `https://files.codes/api/${getState().public_reducer.userName}/savedMultiFilesDB`,
                                method: 'POST',
                                headers: { "authorization": jwtFromCookie },
                                data: myData,
                                success: (data) => {
                                    let cards = getState().public_reducer.cards;
                                    let indexCurrentCard = getState().public_reducer.indexCurrentCard
                                    let indexCurrentTask = getState().public_reducer.indexCurrentTask
                                    dispatch(actions.editTask(cards[indexCurrentCard].tasks[indexCurrentTask]))

                                }
                            })
                        }, 2000);
                    },
                    error: function (err) {

                        console.log(err)
                    }
                })
            }
        }
    }
    return next(action);

}


export const getFiles = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_FILES') {
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            type: "GET",
            url: `https://files.codes/api/${getState().public_reducer.userName}`,
            headers: { Authorization: jwtFromCookie },
            success: (data) => {
                console.log(data)
            },
            error: function (err) {

                console.log(err)
            }
        })
    }
    return next(action);
}

export const downloadFile = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DOWNLOAD_FILE') {

        let file = action.payload
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        $.ajax({
            type: "GET",
            url: `https://files.codes/api/${getState().public_reducer.userName}/download/${file}`,
            headers: { Authentication: jwtFromCookie },
            success: function (data) {
                // console.log()
            },
            error: function (err) {
                // alert(err);
            },
        });
    }
    return next(action);

}

export const removeFile = ({ dispatch, getState }) => next => action => {

    if (action.type === 'REMOVE_FILE') {
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        let fileUrlArr = action.payload

        $.ajax({
            type: "POST",
            url: `https://files.codes/api/${getState().public_reducer.userName}/removeMultipleFiles`,
            headers: { Authorization: jwtFromCookie },
            data: { 'urls': fileUrlArr },

            success: function (data) {
                console.log('succes delete files!!')
                // dispatch(actions.deleteFilesInTask(data.urls))

            },
            error: function (err) {
                alert(err);
            },
        });

    }
    return next(action);
}

// function App() {
//     async function handleImageUpload(event) {
//         const imageFile = event.target.files[0];

//         const options = {
//             maxSizeMB: 1,
//             maxWidthOrHeight: 1920,
//             useWebWorker: true,
//         };
//         try {

//             const compressedFile = await imageCompression(imageFile, options);

//             const formData = new FormData();
//             formData.append("File", compressedFile);

//             await fetch("http://localhost:7000/upload", {
//                 method: "POST",
//                 body: formData,
//                 headers: {
//                     name: compressedFile.name,
//                 },
//             })
//                 .then((result) => {
//                     console.log("Success:", result);
//                 })
//                 .catch((error) => {
//                     console.error("Error:", error);
//                 });
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }  