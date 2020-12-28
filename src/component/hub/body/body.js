import React from 'react';
import Search from '../Search/search';
// import TableHeader from '../Table/tableheader/tableheader' 
import TableBody from '../Table/tablebody/tablebody';
import './body.css';
// import { connect } from 'react-redux';
// import { setlastname, setName } from '../../../redux/actions/action'


// function mapStateToProps(state) {
//   return {
//     workpace: state.workpaceReducer.workpace
   
//   };
// }
// const mapDispatchToProps = (dispatch) => ({
//   setName: (name) => dispatch(setName(name)),
//   setlastname: (lastName) => dispatch(setlastname(lastName)),

// })

// export default connect(mapStateToProps, mapDispatchToProps)(function Body(props)
export default function Body()
{
  // const { workpace, setName, setlastname}=props;
    return(
     
    <div className="body">
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

     <Search />
       {/* <TableHeader/> */}
      <TableBody/>
    </div>
    );
}
// )