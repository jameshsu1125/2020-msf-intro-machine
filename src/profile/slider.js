import React from "react";
import './slider.less';

import $ from "jquery";
require("jquery-easing");



export default class slider extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		//scripts
		this.tr = { is:false, left: 0, now:0,
			init:function()
			{
				this.c = root.refs.dot;
				this.evt();
			},
			evt:function()
			{
				this.onstart = (e)=>{
					if (e.cancelable) if (!e.defaultPrevented) e.preventDefault();
					this.is = true;
					this.x = e.changedTouches[0].clientX;
					return false;
				}

				this.onmovie = (e) => {
					if (e.cancelable) if (!e.defaultPrevented) e.preventDefault();
					if(!this.is) return;
					var dx = e.changedTouches[0].clientX - this.x;
					var w = 228;
					this.now = this.left + ( dx / w * 100 );
					if(this.now > 100) this.now = 100;
					else if( this.now < 0 ) this.now = 0;
					this.set();
					return false;
				}

				this.onend = (e) => {
					this.left = this.now;
				}

				this.c.addEventListener('touchstart', this.onstart, { passive: false, capture: false });
				this.c.addEventListener('touchmove', this.onmovie, { passive: false, capture: false });
				document.addEventListener('touchend', this.onend, { passive: false, capture: false });
			},
			set:function()
			{
				this.c.style.left = this.now + '%';
				root.props.set(this.now);
			},
			off:function()
			{
				this.c.removeEventListener('touchstart', this.onstart);
				this.c.removeEventListener('touchmove', this.onmovie);
				document.removeEventListener('touchmove', this.onend);
			}
		}

	}

	componentDidMount() {
		this.tr.init();
	}

	componentWillUnmount() {
		this.tr.off()		
	}

	render() {
		return ( 
			<div ref='main' id='slider'>
				<div class='l'>
					<div class='slide-container'>
						<div class='w'>-</div>
						<div class='m'>
							<div class='line'>
								<div ref='dot' class='dot'>
									<div class='d'></div>
								</div>
							</div>
						</div>
					<div class='w'>+</div>
				</div>
				</div>
				<div class='r'>
					<div class='btn'>縮放</div>
				</div>
			</div>
		);
	}
}

