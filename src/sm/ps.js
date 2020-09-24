import React from "react";
import $ from "jquery";
require("jquery-easing");

export default class ps extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		//scripts
		this.tr = { o:1, time:350, l:50,
			init:function()
			{
				this.c = $(root.refs.main);
				this.tran();
				this.play();
			},
			play:function()
			{
				//if(root.props.getIndex() == 0) this.push();
				//else 
					this.blank();
			},
			push:function()
			{
				var t = $(root.refs.arr);

				if(t.length == 0) return;

				$(this)
				.animate({
					l:80,
					o:1
				},{
					duration: this.time,
					step:()=>this.tranL(t),
					complete:()=>this.tranL(t),
					easing:'easeOutQuart'
				})
				.animate({
					l:30,
					o:1
				},{
					duration: this.time,
					step:()=>this.tranL(t),
					complete:()=>{this.tranL(t); this.play();},
					easing:'easeOutQuart'
				});
			},
			blank:function()
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
			},
			tranL:function(t)
			{
				this.c.css('opacity',this.o);
				t.css({
					'background-position-x': `${this.l}%`,
				})
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

	appendItem(e)
	{
		e = e.split('ↆ');
		if(e.length == 1) return e;
		else
		{
			var op = [];
			for(var i = 0; i < e.length; i++)
			{
				if(e[i] == '') op.push(<div ref='arr' key={i}></div>);
				else op.push(<span key={i}>{e[i]}</span>)
			}
			return op;
		}
		
	}

	append()
	{
		return this.props.data.split('\n').map( ( item, i ) =>  <span key={ i }> {  this.appendItem(item)  } <br /> </span> )
	}

	render() {
		return ( 
			<h2 ref='main' key='p'> { this.append() } </h2>
		);
	}
}

