import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary'; 

const withErroHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state={
            error:null
        }
        componentDidMount () {
            axios.interceptors.request.use(request => {
                this.setState({error:null});
                return request;
            })
            axios.interceptors.response.use( res => res, error => {
                this.setState({error:error});
            })
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }
        render() {
            return  (
                <Aux>
                    <Modal 
                        show={this.state.error ? true : false}
                        modalClosed={this.errorConfirmedHandler }>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>    
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    } 
}

export default withErroHandler; 