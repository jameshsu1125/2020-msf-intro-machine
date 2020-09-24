import React from "react";
import './video.less';

import $ from "jquery";
require("jquery-easing");
require('jquery.waitForImages');

export default class video extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		this.tr = { r:0, time:500, gap:1000,
			init: function()
			{
				this.c = $(root.refs.c);
				this.tran();
			},
			reset:function(i)
			{
				this.r = 0;
				this.in();
			},
			in:function(i)
			{
				let index = i == 3 ? 4 : i;
				let gap = root.props.index % index || 0;

				$(this).clearQueue();
				$(this).stop();
				
				$(this)
				.delay( gap * this.gap + root.props.index * 50 )
				.animate({
					r: 90
				},{
					duration: this.time,
					step:()=>this.tran(),
					complete: () => {
						this.tran();
						root.props.re(root.props.index);
						this.r = -90
					},
					easing:'easeInQuad'
				})
				.animate({
					r: 0
				},{
					duration: this.time,
					step:()=>this.tran(),
					complete:()=>{this.tran(); root.props.ready();},
					easing:'easeOutQuad'
				})
			},
			flap:function(i)
			{
				$(this).clearQueue();
				$(this).stop();

				$(this)
				.delay(50 * i)
				.animate({
					r: 360
				},{
					duration: 500,
					step:()=>this.tran(),
					complete:()=>{this.tran();},
					easing:'easeOutQuad'
				})
			},
			tran:function(){
				//this.c.css('opacity', this.o)
				this.c.css('transform', `rotate3d(0, 1, 0, ${this.r}deg)`)
			},
			appendImage:function(img)
			{
				this.c.css('background', `rgba(0, 0, 0, 0) url(${img.src}) no-repeat scroll top center / cover`)
			}
		}
	}

	reset(i)
	{
		this.tr.reset(i);
	}

	flap(i)
	{
		this.tr.flap(i)
	}

	play(sortIndex)
	{
		this.tr.in(sortIndex);
	}

	appendImage(img, sortIndex)
	{
		this.tr.appendImage(img);
		this.tr.in(sortIndex);
	}

	replaceImage(img)
	{
		this.tr.appendImage(img);
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: ()=>{},
			waitForAll: true
		});
	}

	clicked()
	{
		this.props.clicked(this.props.index);
	}

	render() {
		return ( 
			<div ref='main' onClick={ this.clicked.bind(this) } id='video'>
				<div ref='c' class='container'></div>
			</div>
		);
	}
}

