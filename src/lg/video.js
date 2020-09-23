import React from "react";
import './video.less';

import $ from "jquery";
require("jquery-easing");
require('jquery.waitForImages');

export default class video extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		this.tr = { o:0, time:1000, 
			init: function()
			{
				this.c = $(root.refs.c);
				this.tran();
				this.appendImage();
			},
			in:function()
			{
				$(this)
				.delay( 100 * ( root.props.index % root.props.loadIndex ) )
				.animate({
					o:1
				},{
					duration: this.time,
					step:()=>this.tran(),
					complete:()=>{this.tran(); root.props.onReady();},
					easing:'easeOutQuart'
				});
			},
			tran:function(){
				this.c.css('opacity', this.o)
			},
			appendImage:function()
			{
				this.c.css('background', `rgba(0, 0, 0, 0) url(${root.props.data.image}) no-repeat scroll top center / cover`)
			}
		}
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: ()=>this.tr.in(),
			waitForAll: true
		});
	}

	clicked()
	{
		this.props.clicked(this.props.data.video, this.props.data.index);
	}

	render() {
		return ( 
			<div ref='main' onClick={ this.clicked.bind(this) } id='video'>
				<div ref='c' class='container'></div>
			</div>
		);
	}
}

