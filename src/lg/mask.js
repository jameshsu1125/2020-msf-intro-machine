import React from "react";
import './mask.less';

import $ from "jquery";
require("jquery-easing");

export default class mask extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		//scripts
		this.tr = { 
			init:function()
			{
				this.c = $(root.refs.main);
			},
			in:function()
			{
				var len = $(this.c).children('div').length;
				this.c.css('display','block');
				$(this.c).children('div').each(function(i){
					$(this).stop();
					$(this).clearQueue();
					$(this)
					.delay(i * 100)
					.animate({
						width: '100%'
					}, 300, 'easeOutQuart',()=>{
						if(i == len - 1)
						{
							//root.props.ready();
						}
					})
				});
			},
			out:function()
			{
				const self = this;
				var len = $(this.c).children('div').length;
				$(this.c).children('div').each(function(i){
					$(this).stop();
					$(this).clearQueue();

					$(this)
					.delay( ( len * 100 ) - i * 100)
					.animate({
						width: '0%'
					}, 500, 'easeOutQuart',()=>{
						if(i == len - 1)
						{
							root.props.out();
							self.c.css('display','none');
						}
					});
				});
			}
		}
	}

	set(e)
	{
		if(e == '0' || e == '2') this.tr.in();
		else if(e == '1') this.tr.out();
	}

	componentDidMount() {
		this.tr.init();
	}

	onClick()
	{
		this.props.click();
	}

	render() {
		return ( 
			<div ref='main' id='mask'>
				<div class='f'></div>
				<div class='f'></div>
				<div class='f'></div>
				<div class='f'></div>
				<div class='f'></div>
				<div class='f last' onClick={ this.onClick.bind(this) }>
					<div class='logo'></div>
				</div>
			</div>
		);
	}
}

