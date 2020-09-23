import React from "react";
import './player.less';

import $ from "jquery";
require("jquery-easing");
require('jquery.waitForImages');

export default class player extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		this.width = window.innerWidth * .94;
		this.height = window.innerHeight * .44 ;

		this.tr = { o:0, time: 1000,
			init:function(){
				this.c = $(root.refs.main);
				this.btn.init();
				this.arr.init();
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
			arr:{ o:0, r:10, time: 1000,
				init:function()
				{
					this.c = $(root.refs.arr);
					this.tran();
				},
				in:function()
				{
					$(this)
					.animate({
						o: 1,
						r: 4
					},{
						duration: this.time,
						step:()=>this.tran(),
						complete:()=>{this.tran(); this.play();},
						easing:'easeOutQuart'
					})
				},
				play:function()
				{
					$(this)
					.animate({
						r: 9
					},{
						duration: 300,
						step:()=>this.tran(),
						complete:()=>{this.tran();},
						easing:'swing'
					})
					.animate({
						r: 4
					},{
						duration: 300,
						step:()=>this.tran(),
						complete:()=>{this.tran(); this.play();},
						easing:'swing'
					})
				},
				tran:function()
				{
					this.c.css({
						opacity: this.o,
						right: this.r + '%'
					});
				}
			},
			btn:{ delay:5000, o:0, time: 1000,
				init:function()
				{
					this.c = $(root.refs.btn);
					this.tran();
					this.in();
					this.evt();
				},
				in:function()
				{
					
					$(this)
					.delay(this.delay)
					.queue(function(){
						root.tr.arr.in();
						$(this).dequeue();
					})
					.animate({
						o:1
					},{
						duration: this.time,
						step:()=>this.tran(),
						complete:()=>this.tran(),
						easing:'easeOutQuart'
					});
				},
				tran:function()
				{
					this.c.css({
						opacity: this.o
					})
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
				<div class='videoBG'></div>
				<video ref='video' autoPlay width={ this.width } height={ this.height } onEnded={this.end.bind(this)}>
					<source src={ this.props.url } />
				</video>

				<div ref='btn' class='btn'>前往領取護照 <div ref='arr' class='arr'><img src={ require('./img/arrow.png') } /></div></div>
			</div>
		);
	}
}

