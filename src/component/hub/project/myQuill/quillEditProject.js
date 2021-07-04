// Urls for code 
//https://codepen.io/FLCcrakers/pen/JZVeZE?editors=0111
//https://codepen.io/tinymce/pen/QjzgRW

import React, { Component } from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import 'react-quill/dist/quill.snow.css';
import './myQuill.css'
import { actions } from '../../../../redux/actions/action'
import { connect } from 'react-redux'

class QuillEditProject extends Component {


    changeFiledInEditProject = (e) => {
        // כאן ניתן להשתמש בטקסט המעוצב
        console.log(e)//HTML מכיל את הטקסט כולל עיצוב e המשתנה 
        let editProjectInRedux = {
            "nameFiled": 'description', "value": e,
        }
        this.props.setProjectByFiledFromWorkspace(editProjectInRedux)
    }


    // componentDidMount() {
    //     this.changeFiledInEditProject(this.props.text)
    // }

    modules = {
        // כאן ניתן להוסיף\להסיר עוד אלמנטים לעיצוב הטקסט
        // formats וכן אם מוסיפים או מסירים אלמט יש להוסיף או להסיר במשתנה  
        toolbar: [
            [{ header: [1, 2, false] }],
            [{ 'color': [] }, { 'background': [] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"]
        ],
        mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,

            source: function (searchTerm, renderItem) {
                let values;

                if (searchTerm.length === 0) {
                    renderItem(values, searchTerm);
                } else {
                    const matches = [];
                    for (let i = 0; i < values.length; i++)
                        if (
                            ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
                        )
                            matches.push(values[i]);
                    renderItem(matches, searchTerm);
                }
            }
        }
    };

    formats = [
        "header",
        "color",
        "background",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link"
    ];



    render() {

        return (
            <>

                <ReactQuill
                    theme="snow"
                    id="textQuil"
                    modules={this.modules}
                    formats={this.formats}
                    value={this.props.workspaces[this.props.indexW] && this.props.workspaces[this.props.indexW].projects[this.props.indexP] && this.props.workspaces[this.props.indexW].projects[this.props.indexP].description}
                    onChange={(e) => this.changeFiledInEditProject(e)}
                >
                </ReactQuill>


            </>
        );
    }
}
export default connect(
    (state) => {
        return {
            workspaces: state.public_reducer.workspaces,
        }
    },
    (dispatch) => {
        return {
            setProjectByFiledFromWorkspace: (p) => dispatch(actions.setProjectByFiledFromWorkspace(p)),
        }
    }
)(QuillEditProject)
