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
<<<<<<< HEAD

=======
      {/* <label>first name</label><input
          value={workpace.name}
          onChange={(e) => setName(e.target.value)}
        ></input><br></br>

        <label>last name</label><input
          value={workpace.lastName}
          onChange={(e) => setlastname(e.target.value)}
        ></input><br></br>
         
         <br></br>
         aba toda {workpace.name} {workpace.lastName} */}

      {/* <Search /> */}
      {/* <TableHeader/> */}
      {/* <TableBody /> */}
>>>>>>> dev
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
