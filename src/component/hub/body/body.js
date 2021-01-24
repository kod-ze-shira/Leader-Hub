import React, { useState } from 'react'
import './body.css'
import AllWorkspaces from '../workspace/allWorkspaces/allWorkspaces';
import './body.css';


import TeamExample from '../team/teamExample'
import { Button, Modal, Form } from 'react-bootstrap';



export default function Body() {
  const [showShare, setShowShare] = useState(false)

  return (


    <div className="body">
      <AllWorkspaces />
      {/* <Button onClick={() => setShowShare(!showShare)} variant="primary">
        Add team
        </Button>
      {
        showShare ? <TeamExample></TeamExample> : null
      } */}
    </div>
  );
}
// )
