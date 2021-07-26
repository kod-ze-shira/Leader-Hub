import React from 'react';

function OneMemberToAdd(props) {
    const { clickMembers, member } = props
    return (
        <>
            <div className='row mt-2 cursorPoint' onClick={e => clickMembers(member)} style={{ width: '100%' }}>
                <div className="col-2 d-none d-md-block d-flex align-items-center">
                    <img alt="" referrerPolicy="no-referrer" src={member.thumbnail} className="thumbnail-contact imgMembers" style={{ height: '2vw', width: '2vw' }} />
                </div>
                <div>
                    <div className='col'>
                        <b>{member.name}</b>
                    </div>
                    <div className='col'>
                        <p>{member.email}</p>
                    </div>
                </div>


            </div>
        </>
    )
}
export default OneMemberToAdd;