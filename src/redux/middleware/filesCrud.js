import $ from 'jquery'
import { actions } from '../actions/action'
import keys from '../../config/env/keys'
import jsZip from 'jszip'
// import FileSaver from 'file-saver'
import configData from '../../ProtectedRoute/configData.json'
// import f from 'js-file-download'


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
                url: `${keys.API_URL_FILES}/api/${getState().public_reducer.userName}/uploadMultipleFiles`,
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
                            url: `${keys.API_URL_FILES}/api/${getState().public_reducer.userName}/savedMultiFilesDB`,
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
                window.location.assign(`${keys.API_URL_LOGIN}?routes=hub/${result.responseJSON.routes}`) :
                result.routes ?
                    window.location.assign(`${keys.API_URL_LOGIN}?routes=hub/${result.routes}`) :
                    window.location.assign(`${keys.API_URL_LOGIN}`)

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
            url: `${keys.API_URL_FILES}/api/${getState().public_reducer.userName}`,
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
        console.log(file);
        let jwtFromCookie = getState().public_reducer.tokenFromCookies

        fetch(
            keys.API_URL_FILES + "/api/" +
            getState().public_reducer.userName +
            "/download/" +
            file.url,
            {
                method: "GET",
                headers: {
                    Authorization: jwtFromCookie
                },
            }
        )
            .then((resp) => {
                console.log('')
                resp.blob()
            }
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



export const downloadFolder = ({ dispatch, getState }) => next => action => {


    if (action.type === 'DOWNLOAD_FILES') {

        let folder = action.payload.folder

        console.log("folder " + JSON.stringify({ folder }));
        let jwtFromCookie = getState().public_reducer.tokenFromCookies
        // folder.files.forEach(file => {
        fetch(
            `${configData.SERVER_URL}/${getState().public_reducer.userName}/downloadFiles`,
            {
                method: "POST",
                headers: {
                    Authorization: jwtFromCookie,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ folder }),
                responseType: 'arraybuffer'
            }
        ).then(async response => {
            console.log("got al files in api ");
            let blob = await response.blob()
            // let blob = await new Blob([response], { type: 'application/zip' })
            // f(blob, folder.cardName)
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = folder.cardName;
            document.body.appendChild(a);
            a.click();
            // document.body.removeChild(a)
            // a.remove()
            // window.URL.revokeObjectURL(url);

        }).catch((err) => {
            checkPermission(err).then((ifOk) => {
                console.log(err)
            })

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
            url: `${keys.API_URL_FILES}/api/${getState().public_reducer.userName}/removeMultipleFiles`,
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
// var JSZip = require("jszip");
// ddd()

// function ddd() {


//     // Basic manipulations
//     // The first step is to create an instance of JSZip :

//     var zip = new JSZip();
//     // On this instance, we can add (and update) files and folders with .file(name, content) and .folder(name). They return the current JSZip instance so you can chain the calls.

//     // create a file
//     zip.file("hello.txt", "Hello[p my)6cxsw2q");
//     // oops, cat on keyboard. Fixing !
//     zip.file("hello.txt", "Hello World\n");

//     // create a file and a folder
//     zip.file("nested/hello.txt", "Hello World\n");
//     // same as
//     zip.folder("nested").file("hello.txt", "Hello World\n");

//     var photoZip = zip.folder("photos");
//     // this call will create photos/README
//     photoZip.file("README", "a folder with photos");
//     // You can access the file content with .file(name) and its getters :

//     zip.file("hello.txt").async("string").then(function (data) {
//         // data is "Hello World\n"
//     });

//     if (JSZip.support.uint8array) {
//         zip.file("hello.txt").async("uint8array").then(function (data) {
//             // data is Uint8Array { 0=72, 1=101, 2=108, more...}
//         });
//     }
// }

