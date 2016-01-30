import React, { PropTypes } from 'react';



const styles = {
  modal: {
    position: 'fixed',
    left:0,
    right:0,
    top:0,
    bottom:0,
    margin: 'auto',
    width: 'auto',
    height: 'auto',
    background: 'rgba(0,0,0,0.3)'
  },
  spinner: {
    color:'white',
    fontSize: '3rem',
    position: 'fixed',
    left:0,
    right:0,
    top:0,
    bottom:0,
    margin: 'auto',
    width: '30px',
    height: '33px'
  }
};

export class Modal extends React.Component{
    propTypes: {
      shown: PropTypes.bool.isRequired
    };
    render(){
      if(this.props.shown){
        return <div style={styles.modal}>
          <div className="spin" style={styles.spinner}>
            <i className="glyphicon glyphicon-repeat"></i>
          </div>
        </div>
      }
      return null;
    }
}
