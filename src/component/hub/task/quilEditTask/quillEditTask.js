// Urls for code 
//https://codepen.io/FLCcrakers/pen/JZVeZE?editors=0111
//https://codepen.io/tinymce/pen/QjzgRW

import React, { Component } from "react";
import ReactQuill from "react-quill";
import "quill-mention";
import "quill-mention/dist/quill.mention.css";
import 'react-quill/dist/quill.snow.css';
// import './myQuill.css'
import { actions } from '../../../../redux/actions/action'
import { connect } from 'react-redux'
import imageCompression from "browser-image-compression";

class QuillEditTask extends Component {

    flug = false

    changeFiledInEditTask = (e) => {
        // כאן ניתן להשתמש בטקסט המעוצב
        // console.log(e)//HTML מכיל את הטקסט כולל עיצוב e המשתנה 
        this.flug = false
        let editTaskInRedux = {
            "nameFiled": 'description', "value": e,
        }
        let text = e
        if (text.includes("https://") || text.includes("https://")) {
            if (text.includes("https://"))
                text = "https://" + text.split("https://")[1]
            else if (text.includes("http://"))
                text = "http://" + text.split("http://")[1]
            // let myText
            if (text.includes('.jpg')) {
                text = text.split('.jpg')[0] + '.jpg'
                this.addFile(text)
                text = e.replace(text, '')
            } else if (text.includes('.png')) {
                text = text.split('.png')[0] + '.png'
                this.addFile(text)
                text = e.replace(text, '')
            } else if (text.includes('.jpeg')) {
                text = text.split('.jpeg')[0] + '.jpeg'
                this.addFile(text)
                text = e.replace(text, '')
            }
            if (text.includes('.gif')) {
                text = text.split('.gif')[0] + '.gif'
                this.addFile(text)
                text = e.replace(text, '')
            }
        }
        if (this.flug) {
            editTaskInRedux = {
                "nameFiled": 'description', "value": text,
            }
            setTimeout(() => {
                this.props.setTaskByFiledFromTasks(editTaskInRedux)
            }, 300);
        }
        else
            this.props.setTaskByFiledFromTasks(editTaskInRedux)
    }

    checkURL = (url) => {
        return (url.match(/^http[^\?]*\.(jpeg|jpg|gif|png)$/) != null);
    }
    compressedFile = async (myFiles) => {

        let compressedFile;
        let compressedFiles = [];

        await Promise.all(
            myFiles.map(async (file) => {
                if (file.file.type.includes("image")) {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                    };
                    compressedFile = await imageCompression(file.file, options);

                    console.log(
                        `compressedFile size ${compressedFile.size / 1024} MB`
                    );
                } else {
                    compressedFile = file.file;
                }
                compressedFiles.push(compressedFile)
            })
        )

        return compressedFiles
    }






    addFile = async (file) => {


        let url
        if (file)
            url = file
        else
            url = document.getElementById('inputImageInD').value;
        // צריכה לבדוק פה אם הכתובת תקינה?
        // this.props.setTaskByFiledFromTasks(url)

        url = decodeURI(url)

        let isGood = this.checkURL(url)

        if (isGood) {
            this.flug = true;
            let file = await fetch(url)
                .then(r => r.blob())
                .then(blobFile => new File([blobFile],
                    url.match(/.*\/(.*)$/)[1],
                    { type: "image/jpeg" }))
            // הורדת קובץ
            debugger
            const url2 = window.URL.createObjectURL(file);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url2;
            a.download = file.name;
            document.body.appendChild(a);
            // action.payload.e.stopPropagation()
            a.click();
            window.URL.revokeObjectURL(url2);


            console.log(file)
            this.props.setFileFromTask(file)
            file = [{
                'url': 'new',
                'name': file.name,
                'file': file,
                'size': file.size
            }]
            file = await this.compressedFile(file)
            let task = {}, type

            task = this.props.cards[this.props.indexCurrentCard].tasks[this.props.indexCurrentTask]
            this.props.uploadFiles({ 'files': file, 'task': task, type: 'task' })
        }
    }


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
                    value={this.props.cards[this.props.indexCurrentCard] &&
                        this.props.cards[this.props.indexCurrentCard].tasks[this.props.indexCurrentTask] &&
                        this.props.cards[this.props.indexCurrentCard].tasks[this.props.indexCurrentTask].description ?
                        this.props.cards[this.props.indexCurrentCard].tasks[this.props.indexCurrentTask].description
                        : null}
                    onChange={(e) => this.changeFiledInEditTask(e)}
                >
                </ReactQuill>
                {/* <input type='text' placeholder='input inport image' id='inputImageInD' />
                <button onClick={() => this.addFile('')}>add</button> */}

            </>
        );
    }
}
export default connect(
    (state) => {
        return {
            cards: state.public_reducer.cards,
            indexCurrentCard: state.public_reducer.indexCurrentCard,
            indexCurrentTask: state.public_reducer.indexCurrentTask,
        }
    },
    (dispatch) => {
        return {
            setTaskByFiledFromTasks: (p) => dispatch(actions.setTaskByFiledFromTasks(p)),
            setFileFromTask: (file) => dispatch(actions.setFileFromTask(file)),
            uploadFiles: (file) => dispatch(actions.uploadFiles(file))

        }
    }
)(QuillEditTask)
