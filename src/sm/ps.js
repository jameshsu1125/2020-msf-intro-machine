import React from "react";
import $ from "jquery";
require("jquery-easing");

export default class ps extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		//scripts
		this.tr = { o:0, time:1000,
			init:function()
			{
				this.c = $(root.refs.main);
				this.tran();
				this.play();
			},
			play:function()
			{
				$(this)
				.animate({
					o:1
				},{
					duration: this.time,
					step:()=>this.tran(),
					complete:()=>this.tran(),
					easing:'easeInOutQuart'
				})
				.animate({
					o:0
				},{
					duration: this.time,
					step:()=>this.tran(),
					complete:()=>{this.tran(); this.play();},
					easing:'easeInOutQuart'
				});
				
			},
			tran:function()
			{
				this.c.css('opacity', this.o);
			}
		}
	}

	componentWillUnmount() {
		$(this.tr).stop();
		$(this.tr).clearQueue();
	}

	componentDidMount() {
		this.tr.init();
	}

	append()
	{
		return this.props.data.split('\n').map( ( item, i ) =>  <span key={ i }> { item } <br /> </span> )
	}

	render() {
		return ( 
			<h2 ref='main' key='p'> { this.append() } </h2>
		);
	}
}

