import React, { useState } from 'react'
import Search from '../Search/search';
import TableBody from '../Table/tablebody/tablebody';
import AllWorkspaces from '../workspace/allWorkspaces/allWorkspaces';
import './newBody.css';
import TeamExample from '../team/teamExample'
import { Button, Modal, Form } from 'react-bootstrap';



export default function Body() {
    const [showShare, setShowShare] = useState(false)

    return (

        <div className="body">

            {/* <Search /> */}
            {/* <TableHeader/> */}
            {/* <TableBody />
      <AllWorkspaces />
      <Button onClick={() => setShowShare(!showShare)} variant="primary">
        Add team
        </Button>
      {
        showShare ? <TeamExample></TeamExample> : null
      } */}
        </div>
    );
}
// )
