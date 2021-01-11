import React from 'react'
import './new_tasck.css';
import Configurator from '../configurator';
import { connect } from 'react-redux';
import { actions} from '../../../../redux/actions/action'

// const mapStateToProps = (state) => {
//     return {
//         project: state.project_reducer.project

//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setisConfiguratorOpen: (isConfiguratorOpen) => dispatch(actions.setisConfiguratorOpen(isConfiguratorOpen))

//     }
// }
export default connect(mapStateToProps, mapDispatchToProps)(function NewTasck(props)
{
   
   
    return(
        <>
    
       
            {/* {props.project.isConfiguratorOpen ? */}
       < div className="right_nav" >
      
            <div className="row mt-5 img_right">
                <div className="col-1"></div>
                {/* <div className="col-1"><img src={require('../../img/sun.png')}></img></div> */}
                <div className="col-1"></div>
                <div className="col-6" style={{ color: "white" }}>Tast details</div>

                {/* <div className="col"><img src={require('../../img/adjust-solid.png')}></img> </div> */}
            </div>
            <div className="row mt-4">
                <div className="col-1"></div>
                <div className="col-7" style={{ color: "white" }}>Tast Name</div>
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
                <div className="col-6"><input type="text" placeholder="leader" id="our1" /></div>
            </div>
            <div className="row mt-4">
                <div className="col-1"></div>
                <div className="col-7" style={{ color: "white" }}>Tast Description</div>
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
            <div className="row mt-3">
            <div className="col-1"></div>
                <div className="text_tast" style={{ color:"#999CAC"}}>
                    <br></br>
                    I'm a product designer based in<br></br> Tel-Aviv with experience in<br></br> delivering end-to-end UX/UI <br></br>design for software products.
            </div>
            </div>
            <div className="row mt-2">
                <div className="col-1"></div>
                <div className="col" style={{color:"white"}}>Do Date</div>
            </div>
            <div className="row mt-2">
                <div className="col-1"></div>
                <div className="col"><input type="date" id="date2"></input></div>
            </div>
            <hr></hr>
            <div className="row mt-2">
                <div className="col-1"></div>
                <div className="col" style={{ color: "white" }}>Permission</div>
            </div>
    
        </div>
        :    <>
                <Configurator/>
             </>
}
        </>
        

    )
})




