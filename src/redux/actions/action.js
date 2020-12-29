// export function setName(name) {
//     return { type: "SET_NAME", payload: name }
// }
// export function setlastname(lastName) {
//     return { type: "SET_LAST_NAME", payload: lastName }
// }

function convertActionToType(actionName) {
    return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}
export const actions = new Proxy(
    {},
    {
        get: function (target, prop) {
            if (target[prop] === undefined)
                return function (args, args2) {
                    return {
                        type: convertActionToType(prop),
                        payload: args,
                        // value:args2//עבור שינו אינפוט
                    };
                };
            else return target[prop];
        }
    }
);