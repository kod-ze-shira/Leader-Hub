import React, { useState } from 'react';
import star from '../../.././../assets/img/1star-solid.png'
import './createTeam.css'
export default function CreateTeam() {

    const [newTeam, setNewTeam] = useState({ name: '', logo: '', members: [] })
    const changeFiledInTeam = (event) => {
        newTeam[event.target.name] = event.target.value
    }
    return (
        <>
            <div className='row txt_your_team_list pb-3 pt-3 pl-4'>Create team</div>
            <div className='row pt-3'>
                {/* <div className='col-2'>
            <img src={star}></img>
         </div> */}
                <div className="row">
                    <div className="col">
                        <label htmlFor="teamLogo" className="lbl_img">
                            <img className="img_logo"
                                referrerPolicy="no-referrer"
                                src={star} />
                        </label>
                        <input
                            type={"file"}
                            id="teamLogo"
                            htmlFor="myInput"
                            accept="image/*"
                            name='logo'
                            style={{
                                display: 'none',
                                cursor: 'pointer',
                            }}
                        // onChange={(e) => onChangeHandlerLogo(e.target.files[0])}
                        />
                    </div>
                </div>

                <div className=' pl-3 col-9'>
                    <input onChange={(event) => changeFiledInTeam(event)} name='name'
                        placeholder='Team Name' className='input_name_new_team'></input>
                </div>
            </div>
            <div className='row pt-3'>
                <div className='pl-3 col'>
                    <input placeholder='IsraelIsraeli@Company.Com' className='input_name_new_team input_member_new_team'></input>

                </div>
            </div>

        </>
    )
}