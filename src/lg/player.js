import React from "react";
import './player.less';

import $ from "jquery";
require("jquery-easing");
require('jquery.waitForImages');

export default class player extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		this.width = window.innerWidth * .96;
		this.height = window.innerHeight / 2;

		this.tr = { o:0, time: 1000,
			init:function(){
				this.c = $(root.refs.main);
				this.btn.init();
				this.tran();
				this.in();
			},
			in:function(){
				$(this)
				.animate({
					o:1
				},{
					duration: this.time,
					step:()=>this.tran(),
					complete:()=>this.tran(),
					easing:'easeOutQuart'
				});
			},
			out:function(){
				$(this)
				.animate({
					o:0
				},{
					duration: this.time,
					step:()=>this.tran(),
					complete:()=>{this.tran(); root.props.end(); },
					easing:'easeOutQuart'
				});
			},
			tran:function(){
				this.c.css({
					opacity: this.o
				})
			},
			btn:{ delay:3000,
				init:function()
				{
					this.c = $(root.refs.btn);
					this.in();
					this.evt();
				},
				in:function()
				{
					this.c
					.delay(this.delay)
					.animate({opacity: 1}, 500, 'easeOutQuart');
				},
				evt:function()
				{
					this.c.click(()=>{
						root.tr.out();
					});
				}
			}
		}
	}

	componentDidMount() {
		this.tr.init();
	}

	componentWillUnmount() {
		this.tr.btn.c.off();
	}

	end()
	{
		this.tr.out();
	}

	render() {
		return ( 
			<div ref='main' id='player'>
				<div class='bg'></div>
				<video ref='video' autoPlay width={ this.width } height={ this.height } onEnded={this.end.bind(this)}>
					<source src={ this.props.url } />
				</video>

				<div ref='btn' class='btn'>前往領取護照</div>
			</div>
		);
	}
}

