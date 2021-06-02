import $ from 'jquery'
import { actions } from '../actions/action'
import configData from '../../ProtectedRoute/configData.json'

export const getCardsByProjectId = ({ dispatch, getState }) => next => action => {

    if (action.type === 'GET_CARDS_BY_PROJECT_ID') {
        debugger
        var projectId = action.payload;
        let urlData;
        if (window.location.href.includes('share'))//get carrds for user that share
            urlData = `${configData.SERVER_URL}/share/${projectId}/${window.location.href.split('/')[6]}/${window.location.href.split('/')[7]}/getCardsByProjectId`

        else
            urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/` + projectId + "/getCardsByProjectId"

        // let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/`+ projectId + "/getSortCardsProjectByIndex"
        $.ajax({
            url: urlData,
            type: 'GET',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",

            success: function (data) {
                dispatch(actions.setCards(data.cards))
                console.log("success")
                console.log("data", data);

            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {

                })
            }
        });

    }
    return next(action);
}

export const newCard = ({ dispatch, getState }) => next => action => {

    if (action.type === 'NEW_CARD') {
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/newCard`
        let card = action.payload;
        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ card }),
            success: function (data) {
                console.log("success")
                console.log(data);
                dispatch(actions.addCardToCardsWhenAddCardToServer(data.card));
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

export const editCard = ({ dispatch, getState }) => next => action => {

    if (action.type === 'EDIT_CARD') {
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/editCard`
        let card = action.payload;
        // let taskId = task._id
        console.log("a" + card.name)

        $.ajax({
            url: urlData,
            method: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ card }),
            success: function (data) {
                console.log("success")
                console.log(data.result);
                dispatch(actions.setCardNameInput(data.result))
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

export const removeCardById = ({ dispatch, getState }) => next => action => {

    if (action.type === 'REMOVE_CARD_BY_ID') {
        // let workspace = getState().workspace_reducer;
        let urlData = `${configData.SERVER_URL}/${getState().public_reducer.userName}/${action.payload}/removeCardById`
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                dispatch(actions.deleteCard(data))

            },
            error: function (err) {

                checkPermission(err).then((ifOk) => {
                })
            }
        });

    }
    return next(action);
}

//this func to check the headers jwt and username, if them not good its throw to login
function checkPermission(result) {
    return new Promise((resolve, reject) => {
        if (result.status == "401") {
            result.routes ?
                window.location.assign(`https://accounts.codes/hub/login?routes=${result.routes}`) :
                window.location.assign(`https://accounts.codes/hub/login`)

            reject(false)

        }
        resolve(true)

    })
}
