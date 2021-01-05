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
            // withCradentials: true,
            // async: false,
            headers:{"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJIZXNJaFlXaVU2Z1A3M1NkMHRXaDJZVzA4ZFkyIiwiZW1haWwiOiJyZW5hbmFAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjA5NjY4Mjc3fQ.W7RfgZLb8q6ew51Xwyef-PDVI0qkzcHHbOUdkm4n1U0"},
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
            error: function (err) {
                //בדיקה אם חוזר 401 זאת אומרת שצריך לזרוק אותו ללוגין
                checkPermission(err).then((ifOk)=>{
                    
                })
            }
        });
        // })
        debugger
    }
    return next(action);
}
//this func to check the headers jwt and username, if them not good its throw to login
function checkPermission(result) {
    return new Promise((resolve, reject) => {
        if(result.status=="401")
        {
            result.routes?
             window.location.assign(`https://dev.leader.codes/login?des=${result.des}'&routes='${result.routes}`):
            window.location.assign(`https://dev.leader.codes/login?des=${result.des}`)
            reject(false)
    
        }
        resolve(true)
    
    })
      }
export const editWorkpaceFromServer = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_QUOTE') {
        var W = getState().workpace;;
        console.log(quote);
        ;
        $.ajax({
        // return fetch("https://reacthub.dev.leader.codes/api/renana-il/editWorkspace " , {
            url: "https://reacthub.dev.leader.codes/api/renana-il/editWorkspace",
            method: 'POST',
            headers: { "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJIZXNJaFlXaVU2Z1A3M1NkMHRXaDJZVzA4ZFkyIiwiZW1haWwiOiJyZW5hbmFAbGVhZGVyLmNvZGVzIiwiaWF0IjoxNjA5NjY4Mjc3fQ.W7RfgZLb8q6ew51Xwyef-PDVI0qkzcHHbOUdkm4n1U0" },
            data: JSON.stringify(),
            success: function (response) {
                ;
                console.log(resJson);
                //  console.log(resJson[0].CustomerType);
                if (resJson)
                    dispatch({ type: "SET_QUOTE", payload: resJson });
            // dispatch({ type: 'GET_QUOTE' });

            //    this.setState({dataSource:JSON.parse(this.state.dataSource)})

        },
            error: function (err) {
                alert('please try again later');
                console.log(err)
            },

        });

    }
    return next(action);
}





