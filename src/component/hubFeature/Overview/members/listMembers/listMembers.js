import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../../redux/actions/action'
import OneMemberToAdd from '../oneMemberToAdd/oneMemberToAdd'
import './listMembers.css'



function ListMembers(props) {
    const { contactsList, getContacts, shareObject, setMembersList ,getAllWorkspacesFromServer} = props
    const [flagAdd, setFlagAdd] = useState(false)
    const [contacts, setContacts] = useState(contactsList);
    const [search, setSearch] = useState('')
    const [add, setAdd] = useState('')
    const [validEmail, setValidEmail] = useState(false)


    useEffect(() => {
        if (contactsList?.length === 0)
            getContacts()
        setContacts(contactsList)
    }, [])
    useEffect(() => {
        if (flagAdd === true)
            document.getElementsByClassName('inputAdd')[0].focus();
    }, [flagAdd])


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
        getAllWorkspacesFromServer()
        setMembersList(false)
    }

    function clickAddMember() {
        if (ValidateEmail(add)) {
            clickMembers(add)
        }
        else {
            setValidEmail(true)
        }
    }

    return (
        <>
            <div className='container membersToAdd'>
                <input className='row inputSearch mt-1 ml-1' type='text' placeholder='enter name or email' onChange={(e) => {
                    searchContacts(e)
                }} />
                {contacts.length !== 0 ?
                    contacts.map(cl => <OneMemberToAdd member={cl} clickMembers={clickMembers} />)
                    : <p>No Members</p>}
                <div className="row">
                    {
                        !flagAdd ?
                            <button className='btnAddmembers cursorPoint' onClick={e => {
                                setFlagAdd(true)
                            }}>+ Add Members</button> :
                            <>
                                <div className='d-flex justify-content-around'>
                                    <input className='inputAdd col-7 mb-1 ' type="text" defaultValue={search} placeholder='enter email' onChange={e => setAdd(e.target.value)} />
                                    <button className=' buttonAdd col-4  mb-1 cursorPoint' onClick={e => clickAddMember()}>+ Add</button>
                                </div>
                                {validEmail ?
                                    <p>The mail is not valid</p> : null}
                            </>
                    }
                </div>
            </div>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllWorkspacesFromServer:()=>dispatch(actions.getAllWorkspacesFromServer()),
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