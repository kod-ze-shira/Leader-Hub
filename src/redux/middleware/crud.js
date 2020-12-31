// import $ from 'jquery'

export const setWorkspaCrud = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SET_WORKSPACE_CRUD') {
        debugger
        // return new Promise((resolve, reject) => {
        //     let userIdW = action.payload
        // console.log("userIdW", userIdW)
        // let userIdW = "J7l2FaEaOdTY3flzXN6jXszNoIE2"
        // let urlData = "https://time.leader.codes/getAllWorkspaces"

        //             let urlData = ""
        //             $.ajax({
        //                 url: urlData,
        //                 type: 'GET',
        //                 withCradentials: true,
        //                 async: false,
        //                 contentType: "application/json; charset=utf-8",
        //                 // data: userIdW,
        //                 // data: JSON.stringify({
        //                 //   userId
        //                 // }),
        //                 dataType: 'json',
        //                 success: function (data) {

        //                     console.log("success")
        //                     console.log(data);
        //                     dispatch({ type: 'SET_DATA_W', payload: data })
        //                 },
        //             });
        //         })
    }
    return next(action);
}