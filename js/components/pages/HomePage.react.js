/*
 * HomePage
 * This is the first thing users see of our App
 */

import * as appActions from '../../actions/AppActions';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Map} from 'immutable';

const actions = [
  appActions,
];

function mapStateToProps(state) {
  return {
      ...state
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();
  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

class HomePage extends Component {
  constructor(props){
    super(props);
    console.log('props', props);
    this.state = {
      email: null,
      password: null,
      'f.reason':'',
      'f.nps':'',
      'f.comment':'',
      'f.genre':'',
      'f.profession':'',
      'f.contact':'',
    };
  }
  componentWillMount(){
    this.props.actions.asyncGetReasons();
    this.props.actions.asyncGetProfessions();
  }
  componentWillReceiveProps(props){
    console.log('>>>>>>>>>', props, props.home.sent, this.props.home.sent)
    if(props.home.sent!==this.props.home.sent){
      console.log('SENT..........')
      this.setState({
        ...this.state,
        'f.reason':'',
        'f.nps':'',
        'f.comment':'',
        'f.genre':'',
        'f.profession':'',
        'f.contact':'',
      });
    }
  }
  setValue(key){
    return (ev)=>this.setState({[key]: ev.target.value});
  }
  doLogin(e){
    e.preventDefault();
    this.props.actions.asyncLogin(this.state.email, this.state.password);
    return false;
  }
  addAnswer(e){
    e.preventDefault();
    if(!this.props.home.reasons.some((d)=>d===this.state['f.reason'])){
      this.props.actions.asyncSetReasons(this.state['f.reason']);
    }
    if(!this.props.home.professions.some((d)=>d===this.state['f.profession'])){
      this.props.actions.asyncSetProfessions(this.state['f.profession']);
    }
    var data = {
      sent_by: this.props.home.loginData.password.email
    };
    for(let item in this.state){
      if(item.startsWith('f.')){
        data[item.replace('f.','')] = this.state[item];
      }
    }
    this.props.actions.asyncAddAnswer(data);
    return false;
  }
  render() {
    const dispatch = this.props.dispatch;
    const { isFetching, reasons, professions, loginData } = this.props.home;
    var login = (<div>
      <form action="#" onSubmit={this.doLogin.bind(this)}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" onChange={this.setValue('email').bind(this)} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input id="password" type="password" onChange={this.setValue('password').bind(this)} required/>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>);
    var add = (<form action="#" onSubmit={this.addAnswer.bind(this)}>
      <datalist id="reasons">
        {reasons.map((r)=><option key={r} value={r}/>)}
      </datalist>
      <datalist id="professions">
        {professions.map((p)=><option key={p} value={p}/>)}
      </datalist>
      <div className="form-group">
        <label htmlFor="reason">Qual motivo de estar na Campus?</label>
        <input className="form-control" value={this.state['f.reason']} type="text" id="reason" list="reasons" onChange={this.setValue('f.reason').bind(this)} minLength="3"/></div>
      <div className="form-group">
        <label htmlFor="nps">De 0 a 10 qual a probabilidade de indicar a Campus para um amigo ou colega?</label>
        <select className="form-control" value={this.state['f.nps']}  name="nps" id="nps" onChange={this.setValue('f.nps').bind(this)}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select></div>
      <div className="form-group">
        <label htmlFor="comment">Quer comentar algo?</label>
        <textarea className="form-control" value={this.state['f.comment']}  name="comment" id="comment" onChange={this.setValue('f.comment').bind(this)} cols="30" rows="10"></textarea></div>
      <div className="form-group">
        <label htmlFor="genre">Gênero</label>
        <select className="form-control" value={this.state['f.genre']}  name="genre" id="genre" onChange={this.setValue('f.genre').bind(this)}>
          <option value="m">Masculino</option>
          <option value="f">Feminino</option>
          <option value="f">Não responder</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="profession">Profissão</label>
        <input className="form-control" value={this.state['f.profession']}  list="professions" type="text" id="profession" onChange={this.setValue('f.profession').bind(this)}/>
      </div>
      <div className="form-group">
        <label htmlFor="contact">Contato</label>
        <input className="form-control" value={this.state['f.contact']}  type="text" id="contact" onChange={this.setValue('f.contact').bind(this)}/>
      </div>
      <button className="btn btn-primary" type="submit">Adicionar</button>
    </form>)
    return (
      <div>
      {(isFetching)?<div>Loading</div>:null}
      {(loginData)?add:login}
      </div>);
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
