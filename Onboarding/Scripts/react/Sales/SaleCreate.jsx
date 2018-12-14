import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form, Message, Dropdown, Label, CustomCalendar } from 'semantic-ui-react';

export default class SaleCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CustomerDropdownList: [],
            ProductDropdownList: [],
            StoreDropdownList: []
        };
        this.CustomersDropdown = this.CustomersDropdown.bind(this);
        this.ProductsDropdown = this.ProductsDropdown.bind(this);
        this.StoresDropdown = this.StoresDropdown.bind(this);
    }

    componentDidMount() {
        this.CustomersDropdown();
        this.ProductsDropdown();
        this.StoresDropdown();
    }

    CustomersDropdown(){
    $.ajax({
        url: "/Customer/GetCustomers",
        type: "GET",
        success: function (data) {
            this.setState({ CustomerDropdownList: data });
        }.bind(this)
        })
    }

    ProductsDropdown() {
        $.ajax({
            url: "/Products/GetProducts",
            type: "GET",
            success: function (data) { this.setState({ ProductDropdownList: data }); console.log(data) }.bind(this)
        });
    }

    StoresDropdown() {
        $.ajax({
            url: "/Stores/GetStores",
            type: "GET",
            success: function (data) { this.setState({ StoreDropdownList: data }) }.bind(this)
        });
    }    

    render() {
        let list = this.state.CustomerDropdownList;
        let Customertemp = list.map((sale) => {
            return ({'key':sale.Id,'value':sale.Id ,'text':sale.Name});
        });
        let Producttemp = this.state.ProductDropdownList.map((sale) => {
            return ({ 'key': sale.Id, 'value': sale.Id, 'text': sale.Name });
        });
        let Storetemp = this.state.StoreDropdownList.map((sale) => {
            return ({ 'key': sale.Id, 'value': sale.Id, 'text': sale.Name });
        });
        
        return (
            <React.Fragment>
                <Modal open={this.props.showCreateModal} onClose={this.props.onClose} size="tiny">
                    <Modal.Header>Create sales</Modal.Header>
                    {this.props.errors.count &&
                        <div className="ui error message">
                            <i className="close icon"></i>
                            <div className="header">
                                There were some errors with your submission
                            </div>
                        <ul className="list">
                            {this.props.errors.Datesold && <li>{this.props.errors.Datesold}</li>}

                        </ul>
                        <ul className="list">
                            {this.props.errors.Customer && <li>{this.props.errors.Customer}</li>}

                        </ul>
                        <ul className="list">
                            {this.props.errors.Product && <li>{this.props.errors.Product}</li>}

                        </ul>
                        <ul className="list">
                            {this.props.errors.Store && <li>{this.props.errors.Store}</li>}

                        </ul>
                            
                        </div>
                    }
                    
                    <Modal.Content>
                        <Form size="small">
                            <Form.Group>
                                <Form.Input label='Date sold' placeholder="dd/mm/yyyy"  onChange={this.props.onChange} name="DateSold" />
                            </Form.Group>
                            <Form.Group>
                                <Dropdown placeholder='Select Customer' fluid selection options={Customertemp} onChange={this.props.onChange} name="CustomerId" />
                            </Form.Group>
                            <Form.Group>
                                <Dropdown placeholder='Select Product' fluid selection options={Producttemp} name="ProductId" onChange={this.props.onChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Dropdown placeholder='Select Store' fluid selection options={Storetemp} name="StoreId" onChange={this.props.onChange}/>
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.props.onClose} secondary >cancel</Button>
                        <Button onClick={this.props.onCreateSubmit} className="ui green button">create  <i className="check icon"></i></Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>

        )
    }
}