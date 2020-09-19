import React from "react";
import './main.less';

import Facebook from 'SOCIAL/Facebook';
import Storage from 'UNIT/localStorage';

import Card from './card';
import Login from './login';
import ORI from 'UI/orientationChange';
import Device from 'DEVICE/userAgent';

export default class main extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		if(Device.get() == 'desktop') window.location.replace('https://www.msf.org.tw/');
		this.state = { card: false, login:false };
		Facebook.init('314583379829317',{
			onStatus:(e)=>{
				this.data = e;
				this.setState({login:true});
				//this.setState({ card:true, login:false });
			}
		});
	}

	componentDidMount() {

	}

	login()
	{
		if (Facebook.status == 'connected') {
			this.data = Facebook.response;

			Storage.set('pic', Facebook.response.picture.data.url );
			this.setState({ card:true, login:false });
		}
		else Facebook.login(()=>{ this.setState({ card:true, login:false }); });
	}

	appendLogin()
	{
		if(this.state.login) return <Login login={ this.login.bind(this) } />;
	}

	appendCard()
	{

		if(this.state.card) return <Card Facebook={ Facebook } />;
	}

	render() {
		return ( 
			<div id='main'>
				{ this.appendLogin() }
				{ this.appendCard() }
				<ORI />
			</div>
		);
	}
}

