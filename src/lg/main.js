import React from "react";
import Video from './video';
import Player from './player';
import Mask from './mask';
import Arrow from './arrow';
import $ from "jquery";
import { video } from './../_data';
import { reset_time } from './../_config';
import EnterFrame from 'UNIT/EnterFrame';
import './main.less';
require("jquery-easing");
const Storage = require('UNIT/localStorage');



export default class main extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		this.state = { player:'', list:[], index:true };
		for(var i = 0; i < video.length; i++) {video[i].index = i; }
		Storage.set('index', '0');
		this.tr = {
			init:function(){
				this.evt();
				this.player.init();
			},
			evt:function()
			{

				Storage.addEvent('index',(e)=>{
					console.log(e)
					if(e == '1') this.timer.play();
					if(e == '0') this.player.reset();
					root.refs.mask.set(e);
				})

				$(window).keydown((e)=>{
					switch(e.keyCode)
					{
						case 32:
							var elem = document.getElementById("lg");
							if (elem.requestFullscreen) {
								elem.requestFullscreen();
							} else if (elem.msRequestFullscreen) {
								elem.msRequestFullscreen();
							} else if (elem.mozRequestFullScreen) {
								elem.mozRequestFullScreen();
							} else if (elem.webkitRequestFullscreen) {
								elem.webkitRequestFullscreen();
							}
						break;
						default:
							Storage.set('index', '1');
					}
				})
			},
			player:{ imgLoadedIndex:0, sortIndex:2, delay:3000,
				init:function()
				{
					this.img = [];
					this.readyIndex = 0;

					for(var i = 0; i < video.length; i++)
					{
						var img = new Image();
						img.onload = () => {
							this.imgLoadedIndex ++;
							if(this.imgLoadedIndex == video.length) this.imgLoaded();
						}
						img.src = video[i].image;
						img.id = 'img' + i;
						this.img.push(img);
					}
				},
				reset:function()
				{
					this.readyIndex = 0;
					this.sortIndex = 2;
					for (var i = 0; i < this.img.length; i++) {
						root.refs['v' + i].reset(i);
					}
				},
				imgLoaded:function()
				{
					for (var i = 0; i < this.img.length; i++) {
						root.refs['v' + i].appendImage(this.img[i], this.sortIndex);
					}
				},
				re:function(i)
				{
					this.shuffle(i);
				},
				shuffle:function(i){
					if(!this.img) return;
					var index = 12 + Math.floor( Math.random() * 6 );
					var dat = this.img[i];
					this.img[i] = this.img[index];
					this.img[index] = dat;
					root.refs['v' + i].replaceImage(this.img[i], this.sortIndex);
					root.refs['v' + index].replaceImage(this.img[index], this.sortIndex);
				},
				ready:function()
				{
					this.readyIndex ++;
					if(this.readyIndex == this.img.length)
					{
						this.readyIndex = 0;

						this.frame = setTimeout(()=>{
							this.sortIndex ++;
							if(this.sortIndex > 6) this.sortIndex = 2;
							for(var i = 0; i < this.img.length; i++) root.refs['v' + i].play(this.sortIndex);
						}, this.delay);
					}
				},
				flapAll:function()
				{
					clearTimeout(this.frame);
					for(var i = 0; i < this.img.length; i++)
					{
						root.refs['v' + i].flap(i);
					}
				},
				getVideoIndexByImageIndex:function(i){
					return parseInt(this.img[i].id.slice(3));
				}
			},
			timer:{ max: reset_time,
				play:function(){
					if(EnterFrame.time) EnterFrame.play();
					else EnterFrame.init((e)=>this.frame(e));
				},
				frame:function(e){
					if(e >= this.max)
					{
						EnterFrame.stop();
						//root.tr.player.reset();
						Storage.set('index', '0');
					}
				},
				stop:function(e){
					EnterFrame.stop();
				},
				reset:function()
				{
					this.stop();
					this.play();
				}
			}
		}
	}

	componentDidMount() {
		this.tr.init();
	}

	videoSelected(i)
	{
		this.selectedIndex = i;
		this.tr.timer.stop();
		

		this.setState({ player: video[this.tr.player.getVideoIndexByImageIndex(i)].video });
		Storage.set('index', '1');
	}

	videoReady()
	{
		this.tr.player.ready();
	}

	videoRe(i)
	{
		this.tr.player.re(i)
	}

	appendVideo()
	{

		if(this.state.index)
		{
			var op = [];
			for(var i = 0; i < 18; i++)
			{
				op.push(<Video ref={ 'v' + i } key={i} index={i} re={ this.videoRe.bind(this) } clicked={ this.videoSelected.bind(this)} ready={ this.videoReady.bind(this)} />);
			}
			return op;
		}
	}

	playerEnd()
	{
		this.setState({ player: '' });
		this.tr.timer.play();
		

		Storage.set('index', '2');
		Storage.set('video', this.selectedIndex);
	}

	appendPlayer()
	{
		if(this.state.player != '')
		{
			return <Player url={ this.state.player } end={ this.playerEnd.bind(this) } />
		}
	}

	maskOut()
	{
		this.tr.player.flapAll();
	}

	maskClick()
	{
		Storage.set('index', '1');
	}

	reset()
	{
		this.tr.timer.reset();
	}

	render() {
		return ( 
			<div id='lg'>
				<div class='containers'>
					{ this.appendVideo() }
					<Arrow reset={ this.reset.bind(this) } />
					{ this.appendPlayer() }
					<Mask ref='mask' out={ this.maskOut.bind(this) } click={ this.maskClick.bind(this) } />
				</div>
			</div>
		);
	}
}

