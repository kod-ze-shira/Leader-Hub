import React from 'react'
import './shareOneMember.css'

export default function ShareOneMember(props) {
    const colors = ['#FD80E5', '#6236FC', '#40D9ED',
        '#6DD400', '#F88C20', '#F0D923', '#F26B9C', '#8580FD'

    ]
    return (
        <>
            <div className="row pt-3 pl-2">
                <div className="col-1 pt-3">
                    {/* <div class="round">
                        <input type="checkbox" id="checkbox" />
                        <label for="checkbox"></label>
                    </div> */}
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-3">
                            {props.member.shareDetail.thumbnail? <img className="img_share_one_member"
                                src={props.member.shareDetail.thumbnail}></img>
                                :<div style={{backgroundColor:colors[Math.floor(Math.random() * colors.length)]}} className="img_share_one_member div_img_share_one_member">{props.member.shareDetail.name[0]}</div>}
                         
                        </div>
                        <div className="col-9">
                            <div className="row name_share_one_member">
                                {props.member.shareDetail.name}
                            </div>
                            <div className="row email_share_one_member">
                                {props.member.shareDetail.email}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3 pr-3">
                <select class=" select_permission_one_member">
                            <option selected>{props.member.permission}</option>
                           {props.member.permission!='viewer'? <option value="1">viewer</option>:null}
                           {props.member.permission!='editor'? <option value="2">editor</option>:null}
                           {props.member.permission!='admin'? <option value="3">admin</option>:null}
                        </select>
                    
                </div>
            </div>



        </>
    )
}