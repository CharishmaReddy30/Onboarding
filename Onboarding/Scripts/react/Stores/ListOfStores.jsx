import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import StoreCreate from './StoreCreate.jsx';
import StoreDelete from './StoreDelete.jsx';
import StoreUpdate from './StoreUpdate.jsx';

export default class StoreTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StoreList: [],
            Success: { Data: '' },
            showDeleteModal: false,
            deleteId: 0,
            showCreateModal: false,
            Name: '',
            Address: '',
            showUpdateteModal: false,
            updateId: 0,
            Id: 0,
            errors: {}
        };

        this.loadData = this.loadData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
    }

    closeCreateModal() {
        this.setState({ showCreateModal: false });
    }

    closeUpdateModal() {
        this.setState({ showUpdateteModal: false });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    loadData() {
        $.ajax({
            url: "/Stores/GetStores",
            type: "GET",
            success: function (data) { this.setState({ StoreList: data }) }.bind(this)
        });
    }

    onDeleteSubmit(id) {
        $.ajax({
            url: "/Stores/DeleteStore",
            type: "POST",
            data: { 'id': id }
        });
        window.location.reload()
    }

    onCreateSubmit() {
        if (true) {
            let data = { 'Name': this.state.Name, 'Address': this.state.Address }
            $.ajax({
                url: "/Stores/CreateStore",
                type: "POST",
                data: data,
                success: function (data) {
                    if (data !== 'Sucess') {
                        let modelErrors = [];
                        modelErrors = [...data];
                        let errors = {};
                        modelErrors.forEach(function (error, index) {
                            if (error.includes('Name')) {
                                errors['Name'] = error;
                            }
                            if (error.includes('Address')) {
                                errors['Address'] = error;
                            }
                        });
                        errors['count'] = 1;
                        this.setState({
                            errors: errors
                        });
                    }
                    else {
                        window.location.reload()
                    } }.bind(this)
            });
        }
    }

    onUpdateSubmit() {
        if (true) {
            let data = { 'Name': this.state.Name, 'Address': this.state.Address, 'Id': this.state.Id };
            $.ajax({
                url: '/Stores/UpdateStore',
                type: "POST",
                data: data,
                success: function (data) {
                    if (data !== 'Sucess') {
                        let modelErrors = [];
                        modelErrors = [...data];
                        let errors = {};
                        modelErrors.forEach(function (error, index) {
                            if (error.includes('Name')) {
                                errors['Name'] = error;
                            }
                            if (error.includes('Address')) {
                                errors['Address'] = error;
                            }
                        });
                        errors['count'] = 1;
                        this.setState({
                            errors: errors
                        });
                    }
                    else {
                        window.location.reload()
                    } }.bind(this)
            });
        }

    }

    handleDelete(id) {
        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });
    }

    handleCreate() {
        console.log('Create clicked');
        this.setState({ showCreateModal: true });
    }

    handleUpdate(id) {
        this.setState({ showUpdateteModal: true });
        this.setState({ updateId: id });
        $.ajax({
            url: "/Stores/GetStore",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ Id: data.Id, Name: data.Name, Address: data.Address });
            }.bind(this)
        });
    }
    render() {
        let list = this.state.StoreList;
        let tableData = null;
        if (list != "") {
            tableData = list.map(store =>
                <tr key={store.Id}>
                    <td className="four wide">{store.Name}</td>
                    <td className="four wide">{store.Address}</td>
                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.handleUpdate.bind(this, store.Id)} name={this.state.Name}><i className="edit icon"></i>Edit</Button>
                    </td>
                    <td className="four wide">
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, store.Id)}><i className="trash icon"></i>Delete</Button>
                    </td>
                </tr>
            )
        }
        return (
            <React.Fragment>
                <div className="ui one column grid">
                    <div className="row"></div>
                    <div className="row"></div> 
                    <div className="row">
                        <div className="column"><Button primary onClick={this.handleCreate}>New store</Button></div>
                        <StoreCreate onChange={this.onChange} onClose={this.closeCreateModal} showCreateModal={this.state.showCreateModal} onCreateSubmit={this.onCreateSubmit} errors={this.state.errors} />
                    </div>
                    <div className="column">
                        <StoreDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />
                        <StoreUpdate showUpdateteModal={this.state.showUpdateteModal} updateId={this.state.updateId} onClose={this.closeUpdateModal} name={this.state.Name} address={this.state.Address} onChange={this.onChange} onUpdateSubmit={this.onUpdateSubmit} errors={this.state.errors} />
                        <table className="ui celled table ui striped table ui small table ">
                            <thead>
                                <tr>
                                    <th className="four wide">Name</th>
                                    <th className="four wide">Address</th>
                                    <th className="four wide">Action(Edit)</th>
                                    <th className="four wide">Action(Delete)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}