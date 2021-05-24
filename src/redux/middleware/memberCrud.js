export const getAllMembers = ({ dispatch, getState }) => next => action => {
    urlData = ``
    fatch(urlData).then(response => response.json())
        .then(data => dispatch())
    return next(action);
}
