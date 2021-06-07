import AddMembers from "./addMembers/addMembers";
import ViewMembers from "./veiwMembers/viewMembers";
import React from 'react';

export default function members() {

    return(
        <>
            <div className="container-fluid px-0 members">

                <div className="row divProjectMembers pt-3 px-4">
                    <h3>Project Members</h3>
                </div>

                <AddMembers />
                <ViewMembers/>
            </div>
        </>
    )
}