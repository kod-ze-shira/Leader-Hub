import React from 'react'
import DynamicSelect from '../../team/dynamicSelect'
import './shareProject.css'

export default function ShareProject() {
    return (
        <>
            <div className="details mr-5 ml-4">
                <h5 className="mt-5 title-view-details pb-1 mb-2">Share Project</h5>
                <div class="row justify-content-between  mx-1 mb-2">
                    <p>your teammates will get an email that gives them access to your team.</p>
                </div>
                <div className="row pl-3">
                    <p>Email address</p>
                </div>
                <div className="row">
                    <div className="col-9">
                        <DynamicSelect options={'contacts'} />
                    </div>
                    <div className="col-3 pl-0">
                        <select class="form-control" onChange={()=>alert()}>
                            <option selected value="1">viewer</option>
                            <option value="2">editor</option>
                            <option value="3">admin</option>
                        </select>
                    </div>
                </div>
                <div className="row pl-3">
                    <p>Share With Teams</p>
                </div>
                <div className="row">
                    <div className="col">
                        <DynamicSelect options={'teams'} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Share with:
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="div_share_with"></div>
                    </div>
                </div>
            </div>

        </>
    )

}