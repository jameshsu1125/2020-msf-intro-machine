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
		$('.containers').animate({ top: 0 - window.innerHeight * .5 }, 500);
		this.setState({ dir:false });
	}

	up()
	{
		this.props.reset();
		$('.containers').animate({ top: 0 }, 500);
		this.setState({ dir:true });
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

