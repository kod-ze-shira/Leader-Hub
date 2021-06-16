import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/actions/action'
import './listMembers.css'



function ListMembers(props) {
     const {contactsList,addMembers,getContacts,shareObject}=props

    const [search, setSearch] = useState('');
    const [contacts, setContacts] = useState(contactsList);


    useEffect(() => {
        if (contactsList?.length !== 0)
            getContacts()
            setContacts(contactsList)
    }, [])
    console.log('mina',contacts);
    function searchContacts(e) {
        let help=[]
        contactsList.map(cm => {
            let name = cm.name.search(e.target.value)
            let email=cm.email.search(e.target.value)
            if(name===0||email===0)
              help.push(cm)
        })
        setContacts(help)
    }
    function clickMember(contact){
        shareObject({membersEmails:[{contact,permission:'viewer'}]})
    }

    return (
        <>
            <div className='container'>
                <input className='row' type='text' placeholder='enter name or email' onChange={(e) => {
                    setSearch(e);
                    searchContacts(e)
                }} />
                {contacts.length !== 0 ? contacts.map(cl =>
                    <div className='row mt-2' onClick={e=>clickMember(cl)}>
                        <div className="col-2 d-flex align-items-center">
                            <img referrerpolicy="no-referrer" src={cl.thumbnail} className="thumbnail-contact imgMembers" />
                        </div>
                        <div className='col-6'>
                            <b>{cl.name}</b>
                            <p>{cl.email}</p>
                        </div>
                    </div>
                ) : <p>No Members</p>}
                <div>
                    <button className='btnAddmembers'>+ Add Members</button>
                </div>
            </div>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        getContacts: () => dispatch(actions.getContactsForUser()),
        addMembers:(contact)=>dispatch(actions.addMembers(contact)),
        shareObject:(contact)=>dispatch(actions.shareObject(contact))
    }
}
const mapStateToProps = (state) => {
    return {
        contactsList: state.share_reducer.contactsUser,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListMembers)