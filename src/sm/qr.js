import React from "react";

import Qr from 'UI/Qrcode';

export default class qr extends React.Component {

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

	render() {
		return ( 
			<div ref='qr' class='qr'>
				<Qr url={ this.props.index } width='400' height='400' />
			</div>
		);
	}
}

