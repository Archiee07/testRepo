import React, { Component } from 'react'
import BackendService from '../services/BackendService'

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Id: this.props.match.params.Id,
            employee: {}
        }
    }

    componentDidMount(){
        BackendService.getEmployeeById(this.state.Id).then( res => {
            this.setState({employee: res.data});
        })
    }
    viewEmployee(Id){
        this.props.history.push('/employees');
    }
    
    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Employee Details</h3>
                    <div className = "card-body">
                    <div className = "row">
                            <label style={{fontWeight: 'bold'}}> Employee ID: </label>
                            <div> { this.state.employee.Id }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontWeight: 'bold'}}> Employee Name: </label>
                            <div> { this.state.employee.Name }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontWeight: 'bold'}}> Employee Mobile: </label>
                            <div> { this.state.employee.ContactMobile }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontWeight: 'bold'}}> Employee Email: </label>
                            <div> { this.state.employee.EmailId }</div>
                        </div>
                        <div className = "row">
                            <label style={{fontWeight: 'bold'}}> Employee Address: </label>
                            <div> { this.state.employee.Address }</div>
                        </div>
                    </div>
                    <div className = "row" style={{ display: "flex" }}>
                    <button className="btn btn-info" style={{ marginLeft: "auto" }} onClick={ () => this.viewEmployee(this.state.Id)}>Go Back</button>
                 </div>
                </div>
            </div>
        )
    }
}

export default ViewEmployeeComponent
