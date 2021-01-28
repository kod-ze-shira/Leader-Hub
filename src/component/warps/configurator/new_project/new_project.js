//confegurator
import React from 'react';
import { ChromePicker } from 'react-color';
import Configurator from '../configurator';
import './new_project.css';
import { connect } from 'react-redux';
import { actions } from '../../../../redux/actions/action'
import public_reducer from '../../../../redux/Reducers/public_reducer';
const mapStateToProps = (state) => {
    return {
        project: state.project_reducer.project,
        isConfiguratorOpen: state.public_reducer.isConfiguratorOpen

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setisConfiguratorOpen: (isConfiguratorOpen) => dispatch(actions.setisConfiguratorOpen(isConfiguratorOpen))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function NewProject(props) {
    return (
        <>
            {props.isConfiguratorOpen ?
                <Configurator />
                :
                <>
                    <div className="right_nav">
                        <div className="conitner">

                            <div className="row mt-5 img_right">
                                <div className="col-1"></div>
                                <div className="col-3"><img src={require('../../../img/sun.png')}></img></div>
                                <div className="col-5"></div>
                                <div className="col"><img src={require('../../../img/adjust-solid.png')}></img> </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-1"></div>
                                <div className="col-8" style={{ color: 'white' }}>Create New Project</div>
                                <div className="col-1"><img src={require('../../../img/down-arrow.png')}></img></div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-1" ></div>
                                <div className="col-6">  <input type="text" placeholder="Attach To Workspace               >" id="our1" /></div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-1"></div>
                                <div className="col-7" style={{ color: "white" }}>Project Name</div>
                                <div className='custom-control custom-switch'>
                                    <input
                                        type='checkbox'
                                        className='custom-control-input'
                                        id='customSwitches'
                                        readOnly
                                    />
                                    <label className='custom-control-label' htmlFor='customSwitches'>


                                    </label>
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col-1"></div>
                                <div className="col-6"><input type="text" placeholder="Type Project Name" id="our1" /></div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-2"></div>
                                <div className="tag"></div>
                                <div className="col-1" style={{ color: "white" }} >Tag</div>
                            </div>
                            <div className="color" >
                                < ChromePicker />
                            </div>
                            <div className="row mt-2">
                                <div className="col-1"></div>
                                {/* <לשאול> */}
                                <div className="col-8" style={{ color: '#EAEAEA' }}>Add Category</div>
                                <div className="col-1" style={{ color: '#EAEAEA' }}>+</div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-1"></div>
                                <div className="col-8" style={{ color: 'white' }}>Start Date:</div>
                            </div>
                            <div className="row">
                                <div className="col-2"></div>
                                <input type="date" id="date"></input>
                            </div>

                            <div className="row mt-3">
                                <div className="col-1"></div>
                                <div className="col-8" style={{ color: 'white' }}> Due date:</div>
                            </div>
                            <div className="row">
                                <div className="col-2"></div>
                                <input type="date" id="date"></input>
                            </div>
                            <div className="row mt-4">
                                <div className="col-1"></div>
                                <div className="col-7" style={{ color: "white" }}>Description:</div>
                                <div className='custom-control custom-switch'>
                                    <input
                                        type='checkbox'
                                        className='custom-control-input'
                                        id='customSwitches'
                                        readOnly
                                    />
                                    <label className='custom-control-label' htmlFor='customSwitches'>


                                    </label>
                                </div>
                            </div>
                            <div className="row mt-2">

                                <div className="type" style={{ color: "#999CAC" }}><div className="row mt-3"><div className="col-1"></div>type your description Projec<br></br> based in Tel-Aviv with<br></br> experience in delivering end-to-<br></br>end UX/UI design for software<br></br> products.</div></div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-1"></div>
                                <div style={{ color: "#EBEAEA" }}>Permission</div>
                            </div>
                            <div className="row">
                                <hr style={{ color: "#6A6E83" }}></hr><hr></hr>
                            </div>
                        </div>
                    </div>
                </>
            }

        </>



    )
})