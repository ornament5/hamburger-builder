import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }
    sideDrawerShowHandler = () => {
        this.setState({showSideDrawer:true})
    }       
    
    render () {
        return (
            <Aux>
                <Toolbar toggleClicked={this.sideDrawerShowHandler}/>
                <SideDrawer 
                        closed={this.sideDrawerClosedHandler} 
                        open={this.state.showSideDrawer}/> 
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;