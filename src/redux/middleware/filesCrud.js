import $ from 'jquery'
import { actions } from '../actions/action'

export const uploadFiles = ({ dispatch, getState }) => next => action => {
    if (action.type === 'UPLOAD_FILES') {
        let files = action.payload.files
        var formData = new FormData()
        if (files.length < 1) { console.log("ooops... not files to upload") }
        else {
            files.forEach((file, index) => {
                formData.append("file" + index, file, file.name)
            })
        }
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        if (!!formData.entries().next().value === true) {
            $.ajax({
                url: `https://files.codes/api/${getState().public_reducer.userName}/uploadMultipleFiles`,
                method: 'post',
                contentType: false,
                processData: false,
                headers: { "authorization": jwtFromCookie },
                data: formData,
                success: (data) => {
                    let myData = { "files": data.filesData }
                    if (action.payload.type === 'taskNotBelong')
                        dispatch(actions.setNewFilesInTaskNotBelong({
                            'file': data.filesData,
                            'id': action.payload.task[0]._id
                        }))
                    else
                        dispatch(actions.setNewFilesInTask(data.filesData))
                    console.log("finish first ajax  " + JSON.stringify(myData));
                    setTimeout(() => {
                        $.ajax({
                            url: `https://files.codes/api/${getState().public_reducer.userName}/savedMultiFilesDB`,
                            method: 'POST',
                            headers: { "authorization": jwtFromCookie },
                            data: myData,
                            success: (data) => {
                            },
                            error: function (err) {
                                checkPermission(err).then((ifOk) => {
                                })
                            }
                        })
                    }, 2000);
                },
                error: function (err) {
                    checkPermission(err).then((ifOk) => {
                    })
                }
            })
        }
    }
    return next(action);

}


//this func to check the headers jwt and username, if them not good its throw to login
function checkPermission(result) {
    return new Promise((resolve, reject) => {
        if (result.status == "401") {
            result.responseJSON.routes ?//in ajax has responseJSON but in in fetch has routes
                window.location.assign(`https://dev.accounts.codes/hub/login?routes=hub/${result.responseJSON.routes}`) :
                result.routes ?
                    window.location.assign(`https://dev.accounts.codes/hub/login?routes=hub/${result.routes}`) :
                    window.location.assign(`https://dev.accounts.codes/hub/login`)

            reject(false)

        }
        resolve(true)

    })
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

                checkPermission(err).then((ifOk) => {
                })
            }
        })
    }
    return next(action);
}


export const downloadFile = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DOWNLOAD_FILE') {
        let file = action.payload.file
        let jwtFromCookie = getState().public_reducer.tokenFromCookies
        fetch(
            "https://files.codes/api/" +
            getState().public_reducer.userName +
            "/download/" +
            file.url,
            {
                method: "GET",
                headers: {
                    Authorization: jwtFromCookie,
                },
            }
        )
            .then((resp) =>

                resp.blob()
            )
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = file.name;
                document.body.appendChild(a);
                // action.payload.e.stopPropagation()
                a.click();
                window.URL.revokeObjectURL(url);

            })
            .catch(() => console.log("oh no!"));
    }

    return next(action);

}

export const downloadFiles = ({ dispatch, getState }) => next => action => {
    if (action.type === 'DOWNLOAD_FILE') {
        let file = action.payload.file
        let jwtFromCookie = getState().public_reducer.tokenFromCookies
        fetch(
            "https://files.codes/api/" +
            getState().public_reducer.userName +
            "/download/" +
            file.url,
            {
                method: "GET",
                headers: {
                    Authorization: jwtFromCookie,
                },
            }
        )
            .then((resp) =>

                resp.blob()
            )
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = file.name;
                document.body.appendChild(a);
                // action.payload.e.stopPropagation()
                a.click();
                window.URL.revokeObjectURL(url);

            })
            .catch(() => console.log("oh no!"));
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
                if (window.location.href.indexOf('projectPlatform') != -1)
                    dispatch(actions.deleteFilesInTask(fileUrlArr))

            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {
                })
            }
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