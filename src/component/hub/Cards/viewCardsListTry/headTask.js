import { connect } from 'react-redux'
import './viewCardsTry.css'
import React from 'react'



function HeadTask(props) {
    return (
        <>
            <thead>
                <tr>
                    <th>
                        {/* <div id={props.cardFromMap._id + "disappear"}>
                                <div className=" row justify-content-start card-name  mx-4 mt-4" > */}

                        <div className="col-5 "
                            onMouseOver={(e) => $(`#task${props.cardFromMap._id}`).css({ 'display': 'inline' })}
                            onMouseOut={(e) => $(`#task${props.cardFromMap._id}`).css({ 'display': 'none' })}
                        >
                            <div className="wrap-triangle">
                                <div id={props.cardFromMap._id}
                                    className=" newTriangle "
                                    onClick={(e) => props.changeSelectedCard(e)} ></div>
                            </div>
                            <input
                                // autoFocus="true"
                                className="ml-3 show-card"
                                value={editCardName}
                                onChange={updateCardName}
                                onBlur={editCard}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        props.editCard()
                                    }
                                }}
                            >
                            </input>
                            <button data-tip data-for="add" className="new-task "
                                id={`task${props.cardFromMap._id}`}
                                onClick={addTask}>+</button>
                        </div>
                        <Button className="more col-1 " data-tip data-for="more_a"
                            onClick={handleClick}>
                            . . .
                                    </Button>
                        <ReactTooltip data-tip id="more_a" place="top" effect="solid">
                            {title.title_more_actions}
                        </ReactTooltip>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            value={actionINcard}
                        >
                            <MenuItem className="rename-card" onClick={(e) => props.handleClose(actionINcard.renameCard)}>Rename Card</MenuItem>
                            <MenuItem onClick={(e) => props.handleClose(actionINcard.deleteCard)} > Delete Card</MenuItem>
                        </Menu>
                    </th>
                    <th>
                        <p className="col">Start</p>
                    </th>
                    <th>
                        <p className="col">End</p>
                    </th>
                    <th>
                        <p className="col">Total</p>
                    </th>
                    <th>
                        <p className="col">Assignee</p>
                    </th>
                    <th>
                        <p className="col">Status</p>
                    </th>
                    <th>
                        <p className="col">Start date</p>
                    </th>
                    <th>
                        <p className="col">Due date</p>
                    </th>
                    <th>
                        <p className="col-add-task">
                            <a>  <ReactTooltip data-tip id="add" place="bottom" effect="solid">
                                {title.title_add_task}
                            </ReactTooltip>
                            </a></p>
                    </th>
                    {/* </div> */}
                </tr>
            </thead>
        </>
    )
}
const mapStateToProps = (state) => {

    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeadTask)