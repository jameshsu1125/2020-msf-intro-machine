import React from "react";
import './arrow.less';

import $ from "jquery";
require("jquery-easing");

export default class arrow extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		//scripts
		this.state = { dir: true };

	}

	componentDidMount() {
		$(window).scroll(()=>{
			var t = $('html, body').scrollTop();
			if(t != 0) this.setState({ dir:false });
			else this.setState({ dir:true });
		});
	}

	down()
	{
		this.props.reset();
		var h = $('#lg').height() + 100;
		var to = h - window.innerHeight;
		$('html, body').animate({ scrollTop: to + 'px' }, 500);
	}

	up()
	{
		this.props.reset();
		$('html, body').animate({ scrollTop: '0px' }, 500);
	}

	appendArrow()
	{
		if(this.state.dir) return <div onClick={this.down.bind(this)} class='button-down'></div>
		else return <div onClick={ this.up.bind(this) } class='button-up'></div>
	}

	render() {
		return ( 
			<div id='arrow'>
				{/*<div class='button-down'></div>
				<div class='button-up'></div>*/}
				{ this.appendArrow() }
			</div>
		);
	}
}

