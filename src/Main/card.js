import React from "react";
import './card.less';
import $ from "jquery";
require("jquery-easing");
require('jquery.waitForImages');
import { video } from './../_data.js';
import Hash from 'UNIT/Get';
import Pad from 'UNIT/NumberPad';
import { Upload } from './../_config';
import Loading from 'UI/Loading';

export default class card extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		//scripts

		this.state = { loading:false };

		//console.log(this.props.Facebook)

		this.tr = { top: -32, time: 1000,
			init:function()
			{
				this.container.init();
				this.btn.init();
				this.canvas.init();
			},
			in:function()
			{
				this.container.in();
				this.btn.in();
			},
			canvas:{ 
				coverIndex: parseInt(Hash.get('index') || '0'), 
				img:{ x:300, y:20, w:430, h:361}, 
				font:{ lineHeight:50 }, 
				profile:{
					location:{x:158, y:162, text:'烏干達'},
					date:{ x:158, y:201, text:'' },
					sn:{ x:158, y: 241, text:'' },
					pic:{x:41,y:131, url:''},
					card:{ x:51, y: 351, text:'PASSPORT' },
					name:{ x:42, y:287, text:'' }
				},
				init:function(){
					this.c = root.refs.canvas;
					this.ctx = this.c.getContext('2d');
					this.pic = root.refs.pic;
					this.picCtx = this.pic.getContext('2d');
					
					var now = new Date();
					this.profile.date.text = `${ Pad.pad(now.getDate(),2) }/${ Pad.pad(now.getMonth() + 1 ,2) }/${ now.getFullYear() }`;
					this.profile.sn.text = now.getTime().toString().slice(3);
					this.profile.location.text = video[this.coverIndex].location;

					if(root.props.Facebook.response)
					{
						this.profile.pic.url = root.props.Facebook.response.picture.data.url;
						this.profile.name.text = root.props.Facebook.response.name
						this.append();
						this.evt();
					}
					else
					{
						setTimeout(()=>{
							this.init();
						},500)
					}
				},
				appendCardText:function(t, i)
				{
					this.ctx.fillText(t, this.img.x + 12, this.img.y + 50 + this.font.lineHeight * i)
				},
				append:function()
				{
					this.clear();
					this.ctx.fillStyle = '#E60012';
					this.ctx.fillRect(0, 0, this.c.width, this.c.height);

					var l = new Image(), r = new Image(), p = new Image();

					r.onload = ()=>{
						this.ctx.drawImage(r,this.img.x,this.img.y, this.img.w, this.img.h);
						this.ctx.font = 'bold 45px NotoSansCJKtc-Bold-Alphabetic';
						this.ctx.fillStyle = '#E60012';
						this.ctx.shadowOffsetX = 3;
						this.ctx.shadowOffsetY = 3;
						this.ctx.shadowColor = "rgba(0,0,0,0.3)";
						this.ctx.shadowBlur = 4;
						var t = video[this.coverIndex].cardText.split('\n')
						for (var i = 0; i < t.length; i++) this.appendCardText(t[i], i);						
						root.tr.in();
					};

					l.onload = ()=>{
						this.ctx.drawImage(l, 20, 20, 262, 362);
						this.ctx.font = '18px NotoSansCJKtc-Bold-Alphabetic';
						this.ctx.fillStyle = '#231815';
						this.ctx.fillText(this.profile.location.text, this.profile.location.x, this.profile.location.y);
						this.ctx.fillText(this.profile.date.text, this.profile.date.x, this.profile.date.y);
						this.ctx.fillText(this.profile.sn.text, this.profile.sn.x, this.profile.sn.y);
						this.ctx.fillText(this.profile.name.text, this.profile.name.x, this.profile.name.y);

						this.ctx.font = '39px NotoSansCJKtc-Bold-Alphabetic';
						this.ctx.fillStyle = '#E60012';
						this.ctx.fillText(this.profile.card.text, this.profile.card.x, this.profile.card.y);
						
						p.src = this.profile.pic.url;
					};

					p.onload = ()=>{
						var x = ( 105 - 129 ) / 2;
						this.picCtx.drawImage(p, x, 0, 129, 129);
						this.picCuted = this.pic.toDataURL('image/png', 1.0);
						var np = new Image();
						np.onload = ()=>{this.ctx.drawImage(np, this.profile.pic.x, this.profile.pic.y) }
						np.src = this.picCuted;
						r.src = video[this.coverIndex].workPermit;
						
					}
					p.setAttribute('crossOrigin','Anonymous');
					l.src = require('./img/card-l.png');
				},
				clear:function()
				{
					this.ctx.clearRect(0, 0, this.c.width, this.c.height);
				},
				capture:function()
				{
					return this.c.toDataURL('image/png', 1.0);
				},
				evt:function()
				{
					//move and test
					return;
					var p = this.profile.name;
					var p1 = 'x', p2 = 'y';
					$(window).keydown((e)=>{
						switch(e.keyCode)
						{
							case 37:
								p[p1] --;
								
							break;

							case 38:
								p[p2] --;
							break;

							case 39:
								p[p1] ++;
							break;

							case 40:
								p[p2] ++;
							break;
						}
						this.append();
						console.log(p);
					});
				}
			},
			container:{ top:-50, time:700,
				init:function()
				{
					this.c = $(root.refs.container);
					this.tran();
				},
				in:function(){
				
					$(this)
					.animate({
						top: 20
					},{
						duration: this.time,
						step:()=>this.tran(),
						complete:()=>this.tran(),
						easing:'easeOutBack'
					});
				},
				tran:function(){
					this.c.css({
						top: this.top + '%'
					})
				}
			},
			btn:{ b:-10, time:500, delay: 1000,
				init:function()
				{
					this.c = $(root.refs.btn);
					this.tran();
				},
				in:function(){

				},
				tran:function()
				{
					this.c.css({
						bottom: this.b + '%'
					})
				}
			}
			
		}
	}

	componentDidMount() {
		this.tr.init();
		$(this.refs.main).waitForImages({
			finished: ()=>{},
			waitForAll: true
		});
	}

	share()
	{
		this.setState({ loading: true });
		Upload({
			base64: this.tr.canvas.capture()
		}).then((e)=>{
			if(e.message == '新增成功')
			{
				this.props.Facebook.share({
					url: e.share_url,
					hashtag: '無國界醫生',
					redirect_uri: Hash.root() + '/profile.html?id=' +  this.props.Facebook.response.id
				});
			}
		})
		
	}

	appendLoading()
	{
		if(this.state.loading) return <Loading text='檔案上傳中' />
	}


	render() {
		return ( 
			<div ref='main' id='card'>
				<div ref='container' class='c'>
					<canvas ref='canvas' width="750" height="400"></canvas>
					<canvas class='pic' ref='pic' width="105" height="129"></canvas>
				</div>
				<div class='bottom'>
					<button onClick={ this.share.bind(this) }>立即分享</button>
				</div>
				{ this.appendLoading() }
			</div>
		);
	}
}

