import $ from 'jquery'
import { actions } from '../actions/action'

export const getCardsByProjectId = ({ dispatch, getState }) => next => action => {
    if (action.type === 'GET_CARDS_BY_PROJECT_ID') {
        var projectId = action.payload;
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/` + projectId + "/getCardsByProjectId"
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
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/newCard`
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
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/editCard`
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
        // let workspace = getState().workspace_reducer.workspace;
        let urlData = `https://reacthub.dev.leader.codes/api/${getState().public_reducer.userName}/${action.payload}/removeCardById`
        $.ajax({
            url: urlData,
            type: 'POST',
            headers: {
                Authorization: getState().public_reducer.tokenFromCookies
            },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                dispatch(actions.deletCard(data))
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

//this func to check the headers jwt and username, if them not good its throw to login
function checkPermission(result) {
    return new Promise((resolve, reject) => {
        if (result.status == "401") {
            result.routes ?
                window.location.assign(`https://dev.leader.codes/login?des=${result.des}'&routes='${result.routes}`) :
                window.location.assign(`https://dev.leader.codes/login?des=${result.des}`)
            reject(false)

        }
        resolve(true)

    })
}