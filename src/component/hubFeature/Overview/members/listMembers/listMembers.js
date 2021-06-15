import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../../redux/actions/action'
import './listMembers.css'



function ListMembers(props) {
    const [search, setSearch] = useState('');
    let contacts = props.contactsList;


    useEffect(() => {
        if (props.contactsList?.length !== 0)
            props.getContacts()
        console.log('contacts', props.contactsList);
    }, [])
    function searchContacts(text){
        contacts.map(cm =>{
            console.log(cm);
            contacts.filter(!cm.search(text))
    
        })
    }

    return (
        <>

            <div className='container'>
                <input className='row' type='text' placeholder='enter name or email' onChange={(e) => setSearch(e.target.current)} onChange={(e) => searchContacts(e.target.current)} />
                {contacts.length === 0 ? contacts.map(cl =>
                    <div className='row mt-2'>
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
    }
}
const mapStateToProps = (state) => {
    return {
        contactsList: state.share_reducer.contactsUser,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListMembers)