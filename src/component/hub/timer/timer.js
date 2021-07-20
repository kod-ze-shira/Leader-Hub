import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
// import { trueTimer } from '../../redux/actions/flags_action'
// import { flagTimerDisplay } from '../../redux/actions/flags_action'
// import { setTrueTimer } from '../../redux/actions/userAction';
import './timer.css';


function Timer(props) {

    const { continuedTimerContact, flagUserInContact } = props
    const [seconds, setSeconds] = useState(0);
    const [minutes, setminutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [ten, setTen] = useState(10);
    const [startTimerComp, setStartTimerComp] = useState(false)

    // const refminutes = props.refMinutes;
 
    useEffect(() => {
        let interval = null;
        // if (props.flagTrueTimer1 === true) {
        //     convertHour(props.continuedTimer1);
        //     props.setTrueTimer1(false);
        // }
        // ליוזר מסיום בתוך משתמש
        // if (flagUserInContact === true) {
        //     convertHour(continuedTimerContact);
        //     props.setTrueTimer1(false);
        // }

        if (startTimerComp) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else
            if (!startTimerComp && seconds !== 0) {
                clearInterval(interval);
            }

        if (seconds === 60) {
            setminutes(minutes + 1);
            setSeconds(0)
        }
        if (minutes === 60) {
            setHours(hours + 1)
            setSeconds(0)
            setminutes(0)
        }

        return () => clearInterval(interval);
        // }, [props.startTimerComp, seconds, props.flagTrueTimer1, props.FlagTimerdDisplay1]);
    }, [startTimerComp, seconds]);



    const convertHour = (timer1) => {
        console.log("timer", timer1)
        let timer = new Date(timer1)
        setHours(Number(timer.getHours() - 3))
        setminutes(Number(timer.getMinutes()));
        setSeconds(Number(timer.getSeconds()));

        console.log("dateHour+dateMinutes+dateSeconds", hours, minutes, seconds)
        props.trueTimer1(true);
    }

    return (
        <>

            <button onClick={(e) => { setStartTimerComp(true); props.displayLineByStart() }}>start</button>
            <button onClick={(e) => { setStartTimerComp(false); props.disaplayLineByStop() }}>stop</button>


            <span className="timertime">

                {
                    hours < ten ?
                        <span className="hour mr-2"> 0{hours}</span>
                        :
                        <span>{hours}</span>
                }
                <span>:</span>
                {
                    minutes < ten ?
                        <span className="minute mr-2" > 0{minutes}</span>
                        :
                        <span
                        //  ref={refminutes}
                        >{minutes}</span>
                }
                <span>:</span>
                {
                    seconds < ten ?
                        <span className="sec mr-2 "> 0{seconds}</span>
                        :
                        <span className="sec ml-2">{seconds}</span>
                } </span>
            {/* </Helmet> */}
        </>

    );
}
const mapStateToProps = (state) => {
    return {
        cards: state.public_reducer.cards,
        indexCurrentCard: state.public_reducer.indexCurrentCard,
        indexCurrentTask: state.public_reducer.indexCurrentTask,
        // flagTrueTimer1: state.userReducer.flagTrueTimer,
        // continuedTimer1: state.userReducer.continuedTimer,
        // FlagTimerdDisplay1: state.flags_reducer.FlagTimerdDisplay


    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        trueTimer1: (a) => dispatch(actions.trueTimer(a)),
        flagTimerDisplay1: (a) => dispatch(actions.flagTimerDisplay(a)),
        setTrueTimer1: (a) => dispatch(actions.setTrueTimer(a)),
        displayLineByStart: () => dispatch(actions.displayLineByStart()),
        disaplayLineByStop: () => dispatch(actions.disaplayLineByStop()),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Timer)