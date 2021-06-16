import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/actions/action'
import './listMembers.css'



function ListMembers(props) {
    const { contactsList, getContacts, shareObject, setMembersList } = props
    const [flagAdd, setFlagAdd] = useState(false)
    const [contacts, setContacts] = useState(contactsList);
    const [search, setSearch] = useState('')
    const [add, setAdd] = useState('')


    useEffect(() => {
        if (contactsList?.length !== 0)
            getContacts()
        setContacts(contactsList)
    }, [])
    function ValidateEmail(mail) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
            return true
        return false
    }

    function searchContacts(e) {
        setSearch(e.target.value)
        let help = []
        contactsList.map(cm => {
            let name = cm.name.search(e.target.value)
            let email = cm.email.search(e.target.value)
            if (name === 0 || email === 0)
                help.push(cm)
        })
        setContacts(help)
    }
    function clickMembers(contact) {
        shareObject({ shareDetails: [{ member: contact, permission: 'viewer' }] })
        setMembersList(false)

    }

    function clickAddMember() {
        if (ValidateEmail(add)) {
            shareObject({ shareDetails: [{ member: add, permission: 'viewer' }] })
            setMembersList(false)
        }

    }

    return (
        <>
            <div className='container membersToAdd'>
                <input className='row' type='text' placeholder='enter name or email' onChange={(e) => {
                    searchContacts(e)
                }} />
                {contacts.length !== 0 ? contacts.map(cl =>
                    <div className='row mt-2' onClick={e => clickMembers(cl)}>
                        <div className="col-2 d-flex align-items-center">
                            <img referrerpolicy="no-referrer" src={cl.thumbnail} className="thumbnail-contact imgMembers" />
                        </div>
                        <div className='col-6'>
                            <b>{cl.name}</b>
                            <p>{cl.email}</p>
                        </div>
                    </div>
                ) : <p>No Members</p>}
                <div className="row">
                    {
                        !flagAdd ?
                            <button className='btnAddmembers' onClick={e => setFlagAdd(true)}>+ Add Members</button> :
                            <>
                                <input className='inputAdd col-8' type="text" defaultValue={search} placeholder='enter email' onChange={e => setAdd(e.target.value)} />
                                <button className='col-3' onClick={e => clickAddMember()}>+ Add</button>
                            </>
                    }
                </div>
            </div>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        getContacts: () => dispatch(actions.getContactsForUser()),
        addMembers: (contact) => dispatch(actions.addMembers(contact)),
        shareObject: (contact) => dispatch(actions.shareObject(contact))
    }
}
const mapStateToProps = (state) => {
    return {
        contactsList: state.share_reducer.contactsUser,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListMembers)