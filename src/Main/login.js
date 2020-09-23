import React from "react";
import './login.less';

export default class login extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		//scripts
	}

	componentDidMount() {
		
	}

	componentDidUpdate() {

	}

	componentWillUnmount() {
		
	}

	login()
	{
		this.props.login();
	}

	render() {
		return ( 
			<div id='login'>
				<div class='bg'></div>
				<div class='row'>
					<h1>
						用支持，讓愛開始轉動！
					</h1>
				</div>
				<div class='row'>
					<h2>
						領取無國界護照並分享<br />讓救援無界限！
					</h2>
				</div>
				
				<div class='row bottom'>
					<button onClick={ this.login.bind(this)}> 領取無國界護照 </button>
				</div>
				
			</div>
		);
	}
}

