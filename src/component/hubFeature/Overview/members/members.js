import AddMembers from "./addMembers/addMembers";
import ViewMembers from "./veiwMembers/viewMembers";
import React from 'react';

export default function members() {

    return(
        <>
            <div className="container-fluid px-0 backgroundWhiteAndBorderRadius">

                <div className="row divProjectMembers pt-3 ml-2">
                    <h3>Project Members</h3>
                </div>

                <AddMembers />
                <ViewMembers/>
            </div>
        </>
    )
}