import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import {DataGrid} from '@material-ui/data-grid';
import {SERVER_URL} from '../constants.js'

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

class AddAssignment extends Component {
    constructor(props) {
      super(props);
	  this.state = {assignmentName:'', dueDate:'', courseId:''};
	};
	
	inputChanged = (event) => {
	   this.setState({[event.target.name]:event.target.value});
	   }
 
  handleSubmit = (event) => {
	event.preventDefault();
    fetch(`${SERVER_URL}/gradebook`, 
      {  
        method: 'POST', 
		headers: {'Accept': 'application/json','Content-Type': 'application/json'},
		body: JSON.stringify({assignmentName:this.state.assignmentName, dueDate: this.state.dueDate,courseId: this.state.courseId})
      } )
      .then(res => {
          if (res.ok) {
            toast.success("Assignment added successfully.", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            this.setState({assignmentName:'', dueDate:'', courseId:''});
          } else {
            toast.error("Add assignment failed.", {
            position: toast.POSITION.BOTTOM_LEFT
            });
            console.error('Put http status =' + res.status);
      }})
	.catch(err => console.error(err)); 
	
      }
      
  render() {
  	return(
  	<div className="formContainer">
  	<h1>Add an Assignment</h1>
     <form onSubmit={this.handleSubmit}>
		<label>Assignment name:</label><br/>
			<input type="text" name="assignmentName" value={this.state.assignmentName} onChange={this.inputChanged}/><br/><br/>
		<label>Assignment due date (YYYY-MM-DD):</label><br/>
			<input type="text" name="dueDate" value={this.state.dueDate} onChange={this.inputChanged}/><br/><br/>
		<label>Course ID:</label><br/>
			<input type="text" name="courseId" value={this.state.courseId} onChange={this.inputChanged}/><br/><br/>
		
		<input type="submit" value="Add Assignment" />
		</form>
	 <ToastContainer autoClose={1500} />   
	</div>
		)

}
}

export default AddAssignment;