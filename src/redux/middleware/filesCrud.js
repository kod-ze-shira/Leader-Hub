import $ from 'jquery'
import { actions } from '../actions/action'

export const uploadFiles = ({ dispatch, getState }) => next => action => {

    if (action.type === 'UPLOAD_FILES') {
        debugger
        var formData = new FormData()
        var files = action.payload
        // var myFiles = Object.values(files)
        if (files.length < 1) { console.log("ooops... not files to upload") }
        else {
            files.forEach((file, index) => {
                formData.append("file" + index, file)
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
                    console.log("finish first ajax  " + JSON.stringify(myData));
                    setTimeout(() => {
                        $.ajax({
                            url: `https://files.codes/api/${getState().public_reducer.userName}/savedMultiFilesDB`,
                            method: 'POST',
                            headers: { "authorization": jwtFromCookie },
                            data: myData,
                            success: (data) => {
                                alert("upload success");
                                console.log("upload success", data)


                            }
                        })
                    }, 2000);
                }
            })
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
            }
        })
    }
    return next(action);
}

export const removeFile = ({ dispatch, getState }) => next => action => {

    if (action.type === 'REMOVE_FILE') {
        let jwtFromCookie = getState().public_reducer.tokenFromCookies;
        let file = action.payload

        $.ajax({
            type: "GET",
            url: `https://files.codes/api/${getState().public_reducer.userName}/remove/${file.url}`,
            headers: { Authentication: jwtFromCookie },
            success: function (data) {
                console.log(data)
            },
            error: function (err) {
                alert(err);
            },
        });

    }
    return next(action);
}
