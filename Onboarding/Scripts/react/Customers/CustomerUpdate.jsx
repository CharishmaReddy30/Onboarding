import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form, Message } from 'semantic-ui-react';

export default class CustomerUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        
    }
    
    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showUpdateteModal} onClose={this.props.onClose}>
                    <Modal.Header>Edit customer</Modal.Header>
                    {this.props.errors.count &&
                        <div className="ui error message">
                            <i className="close icon"></i>
                            <div className="header">
                                There were some errors with your submission
  </div>
                            <ul className="list">
                                {this.props.errors.Name && <li>{this.props.errors.Name}</li>}

                            </ul>
                            <ul className="list">
                                {this.props.errors.Address && <li>{this.props.errors.Address}</li>}

                            </ul>
                        </div>
                    }
                    <Modal.Content>
                        <Form size="small">
                            <Form.Group>
                                <Form.Input label='NAME' width={16} onChange={this.props.onChange} name="Name" defaultValue={this.props.name}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input label='ADDRESS' width={16} onChange={this.props.onChange} name="Address" defaultValue={this.props.address}/>
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Modal.Actions>
                            <Button onClick={this.props.onClose} secondary >cancel</Button>
                            <Button onClick={this.props.onUpdateSubmit} className="ui green button">edit  <i className="check icon"></i></Button>
                        </Modal.Actions>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>

        )
    }
}