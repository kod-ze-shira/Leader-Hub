import "./email.css";
import React, { useState } from 'react'

export default function Email(props) {
    const [email, setEmail] = useState(props.email);
    const handleDelete = props.onClick;



    return <>
        <div className="tag-item" key={email}>
            {email}
            <button
                type="button"
                className="buttonMail"
                onClick={handleDelete}
            >
                &times;
            </button>
        </div>
    </>
}