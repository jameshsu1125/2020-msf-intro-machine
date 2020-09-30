import React from "react";
import './photo.less';

import Hash from 'UNIT/Get';

export default class photo extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		//scripts
		var id = Hash.get('id').split('#')[0];
		this.pic = `https://graph.facebook.com/${ id }/picture?width=365&height=365`;
		this.tr = { w:1, x:0, y:0, 
			init:function()
			{
				this.c = root.refs.canvas;
				this.ctx = this.c.getContext('2d');

				this.appned();
				this.evt();
			},
			evt:function()
			{
				var cx, cy, ox = this.x, oy = this.y;

				this.onstart = (e) => {
					if (e.cancelable) if (!e.defaultPrevented) e.preventDefault();
					cx = e.changedTouches[0].clientX;
					cy = e.changedTouches[0].clientY;
					return false;
				}

				this.onmove = (e) => {
					if (e.cancelable) if (!e.defaultPrevented) e.preventDefault();
					let dx = e.changedTouches[0].clientX - cx;
					let dy = e.changedTouches[0].clientY - cy;
					this.x = ox + dx;
					this.y = oy + dy;
					let ow = (this.w * this.c.width - this.c.width) / 2;
					let oh = ( this.w * this.c.height - this.c.height) / 2;
					if(this.x > ow) this.x = ow;
					else if(this.x < 0 - ow) this.x = 0 - ow;
					if(this.y > oh) this.y = oh;
					else if(this.y < 0 - oh) this.y = 0 - oh;
					this.drag();
					return false;
				}

				this.onend = (e) => {
					ox = this.x;
					oy = this.y;
				}
				root.refs.m.addEventListener('touchstart', this.onstart, { passive: false, capture: false });
				root.refs.m.addEventListener('touchmove', this.onmove, { passive: false, capture: false });
				document.addEventListener('touchend',this.onend, { passive: false, capture: false });
			},
			appned:function()
			{

				this.img = new Image();
				this.img.setAttribute("crossOrigin",'Anonymous');
				this.img.onload = () => {
					var w = this.w * this.c.width;;
					var h = this.w * this.c.width;;
					var x = this.x - ( w - this.c.width ) / 2;
					var y = this.y - ( h - this.c.height ) / 2;

					this.ctx.drawImage(this.img, x, y, w, h);
					this.drawTemplate();
				};				
				this.img.src = root.pic;

			},
			clear:function()
			{
				this.ctx.clearRect(0,0,this.c.width,this.c.height);
			},
			drag:function()
			{
				this.clear();
				var w = this.w * this.c.width;
				var h = this.w * this.c.width;
				var x = this.x - ( w - this.c.width ) / 2;
				var y = this.y - ( h - this.c.height ) / 2;
				this.ctx.drawImage(this.img, x , y , w, h);
				this.drawTemplate();
			},
			scale:function()
			{
				this.clear();

				var w = this.w * this.c.width;
				var h = this.w * this.c.width;
				
				var cx = this.x + w / 2;
				var cy = this.y + h / 2;

				var x = this.x + (this.c.width - 400 * this.w) / 2;
				var y = this.y + (this.c.height - 400 * this.w) / 2;

				let ow = w - this.c.width;
				let oh = h- this.c.height;

				if(x > 0) x = 0;
				else if(x < 0 - ow) x = 0 - ow;
				if(y > 0) y = 0;
				else if( y < 0 - oh) y = 0 - oh;


				this.ctx.drawImage(this.img, x, y, w, h);
				this.drawTemplate();
			},
			drawTemplate: function()
			{
				this.ctx.strokeStyle = '#E60012';
				this.ctx.lineWidth = 8;
				this.ctx.beginPath();
				this.ctx.arc(this.c.width / 2, this.c.height / 2, 180, 0, 2 * Math.PI);
				this.ctx.stroke();

				this.ctx.font = 'bold 42px NotoSansCJKtc-Bold-Alphabetic';
				this.ctx.fillStyle = '#E60012';
				this.ctx.fillText('我挺無國界醫生', 52, 270);
			},
			set:function(e)
			{
				this.w = 1 + ( e / 100 );
				this.scale();
			},
			capture:function()
			{
				return this.c.toDataURL('image/png', 1.0);
			},
			off:function()
			{
				root.refs.m.removeEventListener('touchstart', this.onstart);
				root.refs.m.removeEventListener('touchmove', this.onmove);
				document.removeEventListener('touchend', this.onend);
			}
		}
	}

	componentWillUnmount() {
		this.tr.off();
	}

	getImage()
	{
		return this.tr.capture();
	}

	componentDidMount() {
		this.tr.init();
	}

	set(e)
	{
		this.tr.set(e);
	}

	render() {
		return ( 
			<div id='photo'>
				<canvas ref='canvas' width='400' height='400' ></canvas>
				<div ref='m' class='m'></div>
			</div>
		);
	}
}

