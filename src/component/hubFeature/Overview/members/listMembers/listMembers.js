import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../../../../redux/actions/action'
import OneMemberToAdd from '../oneMemberToAdd/oneMemberToAdd'
import './listMembers.css'

function ListMembers(props) {
    const { contactsList, getContacts, shareObject, setMembersList, membersList } = props
    const [flagAdd, setFlagAdd] = useState(false)
    const [contacts, setContacts] = useState(contactsList);
    const [search, setSearch] = useState('')
    const [add, setAdd] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const inputAdd = useRef()
    useEffect(() => {
        getContacts()
    }, [])
    useEffect(() => {
        setContacts(contactsList);
    }, [contactsList])

    useEffect(() => {
        if (flagAdd === true)
            inputAdd.current.focus();
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
        setMembersList(false)
    }

    function clickAddMember() {
        if (ValidateEmail(add)) {
            shareObject({ member: add, permission: 'viewer' })
            setMembersList(false)
        }
        else {
            setValidEmail(true)
        }
    }

    return (
        <>
            <div className='container membersToAdd' onClick={(e) => e.stopPropagation()}>
                <input className='row inputSearch mt-1 ml-1' type='text' placeholder='name or email' onChange={(e) => { searchContacts(e) }} />
                {
                    contacts.length !== 0 ?
                        contacts.map(cl => <OneMemberToAdd member={cl} clickMembers={clickMembers} />)
                        :
                        <p className='row m-2'>No Members</p>
                }
                {
                    !flagAdd ?
                        <button className='row btnAddMembers cursorPoint' onClick={e => {
                            setFlagAdd(true)
                        }}>+ Add Members</button> :
                        <>
                            <div className='row d-flex justify-content-between m-0 mt-2' style={{ width: '100%' }}>
                                <input className='inputAdd col-12 col-md-7 mb-1' ref={inputAdd} type="text" defaultValue={search} placeholder='enter email' onChange={e => setAdd(e.target.value)} />
                                <button className=' buttonAdd col-12 col-md-4 mb-1 cursorPoint' onClick={e => clickAddMember()}>+ Add</button>
                            </div>
                            {validEmail ?
                                <div className='d-flex justify-content-center my-2' style={{ width: '100%' }}><div className='row mailNotValid'><p>The mail is not valid</p></div> </div> : null}
                        </>
                }
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