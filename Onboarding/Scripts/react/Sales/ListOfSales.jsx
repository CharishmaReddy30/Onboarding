import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import SaleDelete from './SaleDelete.jsx';
import SaleCreate from './SaleCreate.jsx';
import SaleUpdate from './SaleUpdate.jsx';


export default class SalesTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SalesList: [],
            Success: { Data: '' },
            showDeleteModal: false,
            deleteId: 0,
            showCreateModal: false,
            ProductId: '',
            StoreId: '',
            CustomerId: '',
            DateSold: '',
            showUpdateModal: false,
            updateId: 0,
            Id: 0,
            errors: {}
        };

        this.loadData = this.loadData.bind(this);
        this.DateConverter = this.DateConverter.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.closeUpdateModal = this.closeUpdateModal.bind(this);
        this.DateConverterForUpdate = this.DateConverterForUpdate.bind(this);
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
        this.setState({ showUpdateModal: false });
    }

    onChange(e,data) {
        if (e.target.name === undefined) {
            this.setState({ [data.name]: data.value });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    loadData() {
        $.ajax({
            url: "/Sales/GetSales",
            type: "GET",
            success: function (data) { this.setState({ SalesList: data })}.bind(this)
        });
    }

    DateConverter(tempdate) {
        var converted = parseInt((tempdate.replace("/Date(", "").replace(")/", "")))
        console.log(converted);
        var temp = new Date(converted)
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sept", "Oct",
            "Nov", "Dec"
        ];
        var date = (temp.getDate() + ' ' + monthNames[temp.getMonth()] + ', ' + temp.getFullYear())
        return date
    }

    onDeleteSubmit(id) {
        console.log(id);
        $.ajax({
            url: "/Sales/DeleteSales",
            type: "POST",
            data: { 'id': id },
            success: function (data) { console.log(data) }.bind(this)
        });
        window.location.reload()
    }

    onCreateSubmit() {
        if (true) {
            let data = { 'CustomerId': this.state.CustomerId, 'ProductId': this.state.ProductId, 'StoreId': this.state.StoreId, 'DateSold': this.state.DateSold}
            $.ajax({
                url: "/Sales/SalesCreate",
                type: "POST",
                data: data,
                success: function (data) {
                    if (data !== 'Sucess') {
                        let modelErrors = [];
                        modelErrors = [...data];
                        let errors = {};
                        modelErrors.forEach(function (error, index) {
                            if (error.includes('Datesold')) {
                                errors['Datesold'] = error;
                            }
                            if (error.includes('Customer')) {
                                errors['Customer'] = error;
                            }
                            if (error.includes('Product')) {
                                errors['Product'] = error;
                            }
                            if (error.includes('Store')) {
                                errors['Store'] = error;
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
            let data = { 'Id': this.state.Id, 'Customerid': this.state.CustomerId, 'Productid': this.state.ProductId, 'Storeid': this.state.StoreId, 'Datesold': this.state.DateSold }
            $.ajax({
                url: '/sales/UpdateSale',
                type: "POST",
                data: data,
                success: function (data) {
                    console.log(data);
                    if (data !== 'Sucess') {
                        let modelErrors = [];
                        modelErrors = [...data];
                        let errors = {};
                        modelErrors.forEach(function (error, index) {
                            if (error.includes('Datesold')) {
                                errors['Datesold'] = error;
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
        this.setState({ showUpdateModal: true });
        this.setState({ updateId: id });
        $.ajax({
            url: "/Sales/GetSale",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ Id: data.Id, CustomerId: data.Customerid, ProductId: data.Productid, StoreId: data.Storeid, DateSold: this.DateConverterForUpdate(data.Datesold) });
            }.bind(this)
        });
    }

    DateConverterForUpdate(tempdate) {
        var converted = parseInt((tempdate.replace("/Date(", "").replace(")/", "")))
        var temp = new Date(converted);
        var date = (temp.getDate() + "/" + (temp.getMonth()+1) + "/" + temp.getFullYear())
        return date
    }

    render() {
        let list = this.state.SalesList;
        let tableData = null;
        if (list != "") {
            tableData = list.map(sales =>
                <tr key={sales.Id}>
                    <td>{sales.CustomerName}</td>
                    <td>{sales.ProductName}</td>
                    <td>{sales.StoreName}</td>
                    <td>{this.DateConverter(sales.DateSold)}</td>
                    <td>
                        <Button className="ui yellow button" onClick={this.handleUpdate.bind(this, sales.Id)}><i className="edit icon"></i>Edit</Button>
                    </td>
                    <td>
                        <Button className="ui red button" onClick={this.handleDelete.bind(this, sales.Id)}><i className="trash icon"></i>Delete</Button>
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
                        <div className="column"><Button primary onClick={this.handleCreate}>New Sales</Button></div>
                        <SaleCreate onChange={this.onChange} onClose={this.closeCreateModal} showCreateModal={this.state.showCreateModal} CustomerId={this.state.CustomerId} onCreateSubmit={this.onCreateSubmit} errors={this.state.errors}/>
                    </div>
                    <div className="column">
                        <SaleDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} />
                        <SaleUpdate showUpdateModal={this.state.showUpdateModal} updateId={this.state.updateId} onClose={this.closeUpdateModal} CustomerId={this.state.CustomerId} ProductId={this.state.ProductId} StoreId={this.state.StoreId} DateSold={this.state.DateSold} onChange={this.onChange} onUpdateSubmit={this.onUpdateSubmit} errors={this.state.errors} />
                        <table className="ui celled table ui striped table ui small table ui six column table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Store</th>
                                    <th>Date Sold</th>
                                    <th>Action(Edit)</th>
                                    <th>Action(Delete)</th>
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