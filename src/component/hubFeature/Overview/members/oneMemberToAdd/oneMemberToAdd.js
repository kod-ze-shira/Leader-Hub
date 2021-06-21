import React from 'react';

function OneMemberToAdd(props) {
    const { clickMembers, member } = props
    return (
        <>
            <div className='row mt-2 cursorPoint' onClick={e => clickMembers(member)}>
                <div className="col-2 d-flex align-items-center">
                    <img referrerpolicy="no-referrer" src={member.thumbnail} className="thumbnail-contact imgMembers" style={{ height: '2vw', width: '2vw' }} />
                </div>
              
                <div className='col-3'>
                    <b>{member.name}</b>
                </div>
                <div className='col-5 '>
                    <p>{member.email}</p>
                </div>
            </div>
        </>
    )
}
export default OneMemberToAdd;