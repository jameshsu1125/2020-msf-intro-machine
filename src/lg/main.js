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
		this.state = { player:'', list:[] };
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
					if(e == '1') this.timer.play();
					root.refs.mask.set(e);
				})

				$(window).keydown((e)=>{
					switch(e.keyCode)
					{
						case 32:
						default:
							Storage.set('index', '1');
					}
				})
			},
			player:{ o:0, time: 100, is:true, loadIndex:0, max:12, loadTime:2,
				init:function()
				{
					this.tran();
				},
				play:function()
				{
					$(this)
					.animate({
						o:1000
					},{
						duration: this.time,
						step:()=>this.tran(),
						complete:()=>this.tran(),
						easing:'easeOutQuart'
					});
				},
				tran:function()
				{
					if(!this.is) return;
					this.is = false;

					this.loadTime ++;
					if(this.loadTime > 5) this.loadTime = 2;
					this.loadIndex = 0;
					this.shuffle(video);
					root.setState({ list: [] },()=>{
						root.setState({ list: video })
					});
				},
				shuffle:function(array)
				{
					return array.sort(() => Math.random() - 0.5);
				},
				ready:function()
				{
					this.loadIndex ++;
					if(this.loadIndex == this.max) this.is = true;
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

	videoSelected(e,i)
	{
		this.tr.timer.stop();
		this.setState({ player: e});
		Storage.set('index', '2');
		Storage.set('video', i);
	}

	videoReady()
	{
		this.tr.player.ready();
	}

	appendVideo()
	{

		if(this.state.list.length > 0)
		{
			var op = [];
			for(var i = 0; i < 18; i++)
			{
				op.push(<Video loadIndex={ this.tr.player.loadTime } onReady={ this.videoReady.bind(this) } key={i} index={ i } data={ video[i] } clicked={ this.videoSelected.bind(this) } />);
			}
			return op;
		}
		
	}

	playerEnd()
	{
		this.setState({ player: '' });
		this.tr.timer.play();
		this.tr.player.play();
		
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
		//this.tr.player.play();
	}

	reset()
	{
		this.tr.timer.reset();
	}

	render() {
		return ( 
			<div id='lg'>
				{ this.appendVideo() }
				<Arrow reset={ this.reset.bind(this) } />
				{ this.appendPlayer() }
				<Mask ref='mask' out={ this.maskOut.bind(this) } />
			</div>
		);
	}
}

