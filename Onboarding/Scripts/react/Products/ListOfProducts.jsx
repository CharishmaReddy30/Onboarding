import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import ProductDelete from './ProductDelete.jsx';
import ProductCreate from './ProductCreate.jsx';
import ProductUpdate from './ProductUpdate.jsx';


export default class ProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductList: [],
            Success: { Data: '' },
            showDeleteModal: false,
            deleteId: 0,
            showCreateModal: false,
            Name: '',
            Price: '',
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
            url: "/Products/GetProducts",
            type: "GET",
            success: function (data) { this.setState({ ProductList: data }) }.bind(this)
        });
    }

    onDeleteSubmit(id) {
        $.ajax({
            url: "/Products/DeleteProduct",
            type: "POST",
            data: { 'id': id }
        });
        window.location.reload()
    }

    onCreateSubmit() {
        console.log(this.state.errors)
            console.log('Modal create', this.state.Name, this.state.Address);
            let data = { 'Name': this.state.Name, 'Price': this.state.Price }
            console.log(data);
            $.ajax({
                url: "/Products/CreateProduct",
                type: "POST",
                data: data,
                success: function (data) {
                    if (data !== 'Sucess') {
                        let modelErrors = [];
                        modelErrors = [...data];
                        let errors = {};
                        modelErrors.forEach(function (error, index) {
                            if (error.includes('Name')) {
                                console.log(typeof error)
                                errors['Name'] = error;
                            }
                            if (error.includes('Price')) {
                                console.log(typeof error)
                                errors['Price'] = error;
                            }
                        });
                        errors['count'] = 1;
                        this.setState({
                            errors: errors
                        });
                    }
                    else {
                        window.location.reload()
                    }
                }.bind(this)
            });
    }

    onUpdateSubmit() {
            let data = { 'Name': this.state.Name, 'Price': this.state.Price, 'Id': this.state.Id };
            console.log(data);
            $.ajax({
                url: '/Products/UpdateProduct',
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
                            if (error.includes('Price')) {
                                errors['Price'] = error;
                            }
                        });
                        errors['count'] = 1;
                        this.setState({
                            errors: errors
                        });
                    }
                    else {
                        window.location.reload()
                    }
                }.bind(this)
            });
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
        console.log('Edit clicked', id);
        this.setState({ showUpdateteModal: true });
        this.setState({ updateId: id });
        console.log("exit", this.state.updateId);
        $.ajax({
            url: "/Products/GetProduct",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ Id: data.Id, Name: data.Name, Price: data.Price });
                console.log(this.state.Price);
            }.bind(this)
        });
    }


    render() {
        let list = this.state.ProductList;
        let tableData = null;
        if (list != "") {
            tableData = list.map(product =>
                <tr key={product.Id}>
                    <td className="four wide">{product.Name}</td>
                    <td className="four wide">{product.Price}</td>
                    <td className="four wide">
                        <Button className="ui yellow button" onClick={this.handleUpdate.bind(this, product.Id)} name={this.state.Name}><i className="edit icon"></i>Edit</Button>
                    </td>
                    <td className="four wide">
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, product.Id)}><i className="trash icon"></i>Delete</Button>
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
                        <div className="column"><Button primary onClick={this.handleCreate}>New Product</Button></div>
                        <ProductCreate onChange={this.onChange} onClose={this.closeCreateModal} showCreateModal={this.state.showCreateModal} onCreateSubmit={this.onCreateSubmit} errors={this.state.errors} />
                    </div>
                    <div className="column">
                        <ProductDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />
                        <ProductUpdate showUpdateteModal={this.state.showUpdateteModal} updateId={this.state.updateId} onClose={this.closeUpdateModal} name={this.state.Name} price={this.state.Price} onChange={this.onChange} onUpdateSubmit={this.onUpdateSubmit} errors={this.state.errors} />
                        <table className="ui celled table ui striped table ui small table ">
                            <thead>
                                <tr>
                                    <th className="four wide">Name</th>
                                    <th className="four wide">Price</th>
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