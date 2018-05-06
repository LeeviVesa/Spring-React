import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [{
                id: Number,
                firstName: String,
                lastName: String,
                email: String,
            },
            ],
        };
    }

    componentDidMount() {
        this.loadStudentsFromServer();
    }

    render() {
        return (
            <div>
            <text style={{fontSize: 25}}>STUDENTLIST</text>
        <StudentTable students={this.state.students}/>
        </div>
    );
    }
    loadStudentsFromServer() {
        fetch('http://localhost:8080/studentlist', {credentials: 'same-origin'})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({students: responseJson});
                console.log("students: ", this.state.students);
            });

    };
}



class StudentTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let studentprops = this.props.students;
        function onAfterDeleteRow(rowKeys, rows) {
            alert('Removed rows : ' + rowKeys);
            for (let i = 0; i < rowKeys.length; i++) {
                fetch('http://localhost:8080/delete' + '/' + rowKeys[i], {credentials: 'same-origin'});
            }
        }
        const options = {
            afterDeleteRow: onAfterDeleteRow  // A hook for after droping rows.
        };
        const selectRowProp = {
            mode: 'checkbox'
        };
        return (
            <BootstrapTable data={studentprops} striped hover
        options={ options }
        deleteRow={ true }
        selectRow={ selectRowProp }
        exportCSV>
        <TableHeaderColumn  width="150" isKey dataField='id'>Student ID</TableHeaderColumn>
        <TableHeaderColumn width="150" dataField='firstName'>First Name</TableHeaderColumn>
        <TableHeaderColumn width="150" dataField='lastName'>Last Name</TableHeaderColumn>
        <TableHeaderColumn width="150" dataField='email'>Email</TableHeaderColumn>
            </BootstrapTable>
    );
    }
}
ReactDOM.render(<App/>, document.getElementById('root') );