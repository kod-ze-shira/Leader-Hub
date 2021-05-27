import React, { useEffect, useRef, useState } from 'react'
import './shareOneMember.css'
import delete_member_logo from '../../../../img/delete_member_logo.svg'

export default function ShareOneMember(props) {
    const colors = ["#C967B6", "#8D18AD", "#4D2AC9", "#6A67C9", "#2B79C2", "#32AABA", "#34A38B", "#53A118", "#91A118", "#BDAA1C",
        "#C48E1A", "#C46F1A", "#C43C1A", "#BF2E63", "#C9676F",
        "#FD80E5", "#B620E0", "#6236FC", "#8580FD", "#3598F4", "#40D9ED", "#44D7B6", "#6DD41F", "#BFD41", "#F0D923",
        "#F8B520", "#F88C20", "#F84A20", "#F13B7F", "#FD808B",
        "#FCB3EE", "#CA79E0", "#8868FC", "#B6B3FC", "#67B0F5", "#6FDEED", "#6FD6C0", "#86D44A", "#C4D44A", "#F0DE54",
        "#F7C352", "#F7A452", "#F77352", "#F26B9C", "#FCB3B9"
    ]
    const [ifCheckedMember, setIfCheckedMember] = useState(true)

    let refToDivColor = useRef(null)
    const backgroundStyle = refToDivColor.current ?//because the color will render anyway
        refToDivColor.current.style.backgroundColor != "" ?
            refToDivColor.current.style.backgroundColor :
            colors[Math.floor(Math.random() * colors.length)] :
        colors[Math.floor(Math.random() * colors.length)]

    useEffect(() => {
        console.log(refToDivColor);

    })
    return (
        <>
            <div className="row pt-3 pl-4">
                <div className="col-1 pt-3">
                    {/* <div  class="checkmark">
                        <input type="checkbox" id="checkbox" />
                        <label  for="checkbox" className="checkmark checkmark-place"></label>
                    </div> */}
                    {/* <label
                        className="check-task py-2">
                        <input type="checkbox" checked={ifCheckedMember}
                            onChange={() => setIfCheckedMember(!ifCheckedMember)}
                        />
                        <span className="checkmark checkmark-place ml-1"></span>
                    </label> */}
                    <img src={delete_member_logo}></img>
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-3">
                            {props.member.member.thumbnail ?
                                <img className="img_share_one_member"
                                    src={props.member.member.thumbnail}></img>
                                // style={{ 'background': `linear-gradient(136deg,${backgroundStyle},white)` }}

                                : <div ref={refToDivColor} style={{ backgroundColor: backgroundStyle }}
                                    className="img_share_one_member div_img_share_one_member">{props.member.member.name?props.member.member.name[0]:props.member.member.email[0]}</div>}
                                    {/* props.member.member.email-its mail that not in my contacts , he has just email*/}
                        </div>
                        <div className="col-9">
                            <div className="row name_share_one_member">
                                {props.member.member.name?props.member.member.name:props.member.member.email}
                            </div>
                            <div className="row email_share_one_member">
                                {props.member.member.email}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 pl-0 pt-4">
                    <select class=" select_permission_one_member" onChange={(event)=>props.changePermission(event,props.member,props.teamId)}>
                        {/* send teamId to change perrission to change petrmission of member from true team */}
                        <option selected>{props.member.permission}</option>
                        {props.member.permission != 'viewer' ? <option value="1">viewer</option> : null}
                        {props.member.permission != 'editor' ? <option value="2">editor</option> : null}
                        {props.member.permission != 'admin' ? <option value="3">admin</option> : null}
                    </select>

                </div>
            </div>



        </>
    )
}