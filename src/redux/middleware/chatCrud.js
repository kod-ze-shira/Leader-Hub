
import $ from 'jquery'
import { actions } from '../actions/action'
export const newChat = ({ dispatch, getState }) => next => action => {

    if (action.type === 'NEW_CHAT') {
        let urlData = 'https://chat.leader.codes/api/:renana-il/newHangout'
        let data = {
            hangout: {
                name: "hangoutName",
                source: "hub",			// application name
                owner: "",			 //user id, - optional
                profileGroup: "",		// url of image - optional
                descrioption: "" ,		// optional

            },
            tabName: "hub",
            Color: "red",				//default color- optional
            contacts: [] 				//list of contacts to hangout - optional
        }

        $.ajax({
            url: urlData,
            method: 'POST',
            contentType: "application/json; charset=utf-8",
            data: data,
            success: function (data) {
                console.log("success")
                console.log(data);
                
            },
            error: function (err) {
                //בדיקה אם חוזר 401 זאת אומרת שצריך לזרוק אותו ללוגין
                console.log("error")
                console.log(err)
            }
        });
    }
    return next(action);
}