import $ from 'jquery'

export const setWorkspaCrud = ({ dispatch, getState }) => next => action => {

    if (action.type === 'SET_WORKSPACE_CRUD') {
        debugger
        // return new Promise((resolve, reject) => {
        //     let userIdW = action.payload
        // console.log("userIdW", userIdW)
        // let userIdW = "J7l2FaEaOdTY3flzXN6jXszNoIE2"
        let user_name = "renana-il"
        let urlData = "https://reacthub.dev.leader.codes/api/" + user_name + "/newWorkspace "
        let name = action.payload;

        $.ajax({
            url: urlData,
            type: 'POST',
            withCradentials: true,
            async: false,
            contentType: "application/json; charset=utf-8",
            // data: userIdW,
            data: JSON.stringify({
                name,
            }),
            dataType: 'json',
            success: function (data) {
                console.log("success")
                console.log(data);
                // dispatch({ type: '', payload: data })
            },
        });
        // })
        debugger
    }
    return next(action);
}