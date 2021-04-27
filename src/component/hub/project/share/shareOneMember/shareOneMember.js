import React from 'react'
import './shareOneMember.css'

export default function ShareOneMember(props) {
    return (
        <>
            <div className="row pt-3 pl-2">
                <div className="col-1 pt-3">
                    <div class="round">
                        <input type="checkbox" id="checkbox" />
                        <label for="checkbox"></label>
                    </div>
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-3">
                            <img className="img_share_one_member"
                                src={props.member.shareDetail.thumbnail ? props.member.shareDetail.thumbnail : null}></img>


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