import React from "react";
import './main.less';

import ORI from 'UI/orientationChange';
import Photo from './photo';
import Slider from './slider';
import Device from 'DEVICE/userAgent';

export default class main extends React.Component {

	constructor(props) {
		super(props);
		const root = this;
		this.state = { make:true, btn:true }
		if(Device.get() == 'desktop') window.location.replace('https://www.msf.org.tw/');
	}

	componentDidMount() {
		this.onstart = (e) => {
			if (e.cancelable) if (!e.defaultPrevented) e.preventDefault();
			if(e.target.id == 'btn') this.download();
			return false;
		}
		document.addEventListener('touchstart', this.onstart, { passive: false, capture: false });
	}

	download()
	{
		this.img = this.refs.photo.getImage();

		this.refs.h1.innerHTML = '　';
		this.setState({ make: false, btn:false },()=>{
			document.removeEventListener('touchstart', this.onstart);
		});
	}

	setPercent(e)
	{
		this.refs.photo.set(e);
	}

	appendImageMake()
	{
		if(this.state.make)
		{
			return <div class='row'>
						<Photo ref='photo' />
						<Slider set={ this.setPercent.bind(this) } />
					</div>
		}else
		{
			return <div class='row'>
						<a href={ this.img } download>
							<img src={ this.img } />
						</a>
					</div>
		}
	}

	appendBtn()
	{
		if(this.state.btn) return <div class='bottom'> <div id='btn' class='btn'>製作完成</div> </div>
		else return <div class='bottom'><a href={ this.img } download> <div id='btn' class='btn'>下載大頭貼</div> </a></div>
	}

	render() {
		return ( 
			<div id='profile'>
				<div class='row'>
					<h1 ref='h1'>
						製作大頭貼，讓愛繼續延續！
					</h1>
				</div>
				{ this.appendImageMake() }
				{ this.appendBtn() }
				<ORI />
			</div>
		);
	}
}

