// import React, { useState } from 'react'

// import { Row, Col, Toast, Button } from 'react-bootstrap'
// import './toastMassege.css'
// export default function ToastMassege() {
//     const [show, setShow] = useState(false);

//     return (
//         <Row>

//             <Col xs={6}>
//                 <Toast onClose={() => setShow(false)} className='toastMassege' show={show} delay={300000} autohide>
//                     <Toast.Header >

//                     </Toast.Header>
//                     <Toast.Body>
//                         <img
//                             src="holder.js/20x20?text=%20"
//                             className="rounded mr-2"
//                             alt=""
//                         />
//                         <strong className="mr-auto">Bootstrap</strong>
//                         <small>11 mins ago</small>


//                         Woohoo, you're reading this text in a Toast!</Toast.Body>
//                 </Toast>
//             </Col>
//             <Col xs={6}>
//                 <Button onClick={() => setShow(true)}>Show Toast</Button>
//             </Col>
//         </Row>
//     );
// }



import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import './toastMassege.css'


export default function ToastMassege() {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const buttons = (
        <React.Fragment>
            {/* <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>Top-Center</Button> */}
            {/* <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>Top-Right</Button> */}
            {/* <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}> */}
            {/* Bottom-Right */}
            {/* </Button> */}
            {/* <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}> */}
            {/* Bottom-Center */}
            {/* </Button> */}
            <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}>Bottom-Left</Button>
            {/* <Button onClick={handleClick({ vertical: 'top', horizontal: 'left' })}>Top-Left</Button> */}
        </React.Fragment>
    );

    return (
        <div>
            {buttons}
            <Snackbar
                className='toastMassege'
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="I love snacks"
                key={vertical + horizontal}
            >
            </Snackbar>
            {/* <div>dddddfd</div> */}

        </div>
    );
}