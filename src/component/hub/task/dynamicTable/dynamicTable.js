import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
// import './contact.css'
import $ from 'jquery'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
// import { actions } from '../../../redux/actions/action'

const name=()=>{
    return "Yael"
}

    const TablePage = (props) => {
        const data = {
            columns: [
                {
                    label: '#',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Heading',
                    field: 'heading0',
                    sort: 'asc'
                },
                {
                    label: 'Heading',
                    field: 'heading1',
                    sort: 'asc'
                },
                {
                    label: 'Heading',
                    field: 'heading2',
                    sort: 'asc'
                },
                {
                    label: 'Heading',
                    field: 'heading3',
                    sort: 'asc'
                },
                {
                    label: 'Heading',
                    field: 'heading4',
                    sort: 'asc'
                },
                {
                    label: 'Heading',
                    field: 'heading5',
                    sort: 'asc'
                },
                {
                    label: 'Heading',
                    field: 'heading6',
                    sort: 'asc'
                },
                {
                    label: 'Heading',
                    field: 'heading7',
                    sort: 'asc'
                },
                {
                    label: 'Heading',
                    field: 'heading8',
                    sort: 'asc'
                }
            ],
            rows: [
                {
                    'id': 1,
                    'heading0': 'Cell',
                    'heading1': 'Cell',
                    'heading2': 'Cell',
                    'heading3': 'Cell',
                    'heading4': 'Cell',
                    'heading5': 'Cell',
                    'heading6': 'Cell',
                    'heading7': 'Cell',
                    'heading8': 'Cell'
                },
                {
                    'id': 2,
                    'heading0': 'Cell',
                    'heading1': 'Cell',
                    'heading2': 'Cell',
                    'heading3': 'Cell',
                    'heading4': 'Cell',
                    'heading5': 'Cell',
                    'heading6': 'Cell',
                    'heading7': 'Cell',
                    'heading8': 'Cell'
                },
                {
                    'id': 3,
                    'heading0': 'Cell',
                    'heading1': 'Cell',
                    'heading2': 'Cell',
                    'heading3': 'Cell',
                    'heading4': 'Cell',
                    'heading5': 'Cell',
                    'heading6': 'Cell',
                    'heading7': 'Cell',
                    'heading8': 'Cell'
                }
            ]
        };


        return (
            <>
                <MDBTable responsive>
                    <MDBTableHead columns={data.columns} />
                    <MDBTableBody rows={data.rows} />
                </MDBTable>
            </>

        )

    }


    const mapStateToProps = (state) => {

        return {
            // cards: state.public_reducer.cards,
            // indexCurrentCard: state.public_reducer.indexCurrentCard,
            // indexCurrentTask: state.public_reducer.indexCurrentTask,
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            // assingTo: (emailOfContact) => dispatch(actions.assingTo(emailOfContact))
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(TablePage)
