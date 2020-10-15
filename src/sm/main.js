import React from 'react';
import './main.less';
import Qr from './qr';
import PS from './ps';

const Storage = require('UNIT/localStorage');
import { text } from './../_data';
import $ from 'jquery';
require('jquery-easing');

export default class main extends React.Component {
	constructor(props) {
		super(props);
		const root = this;
		//scripts
		this.state = { data: '0', qr: '' };

		Storage.set('index', '0');
		Storage.set('video', '');

		this.tr = {
			init: function () {
				this.evt();
			},
			evt: function () {
				Storage.addEvent('index', (e) => {
					if (e == '0' || e == '1') root.setState({ data: e, qr: '' });
					else root.setState({ data: e });
				});
				Storage.addEvent('video', (e) => {
					root.setState({ qr: '' }, () => {
						root.setState({ qr: e });
					});
				});
				$(window).keydown((e) => {
					switch (e.keyCode) {
						case 32:
						/* var elem = document.getElementById("sm");
							if (elem.requestFullscreen) {
								elem.requestFullscreen();
							} else if (elem.msRequestFullscreen) {
								elem.msRequestFullscreen();
							} else if (elem.mozRequestFullScreen) {
								elem.mozRequestFullScreen();
							} else if (elem.webkitRequestFullscreen) {
								elem.webkitRequestFullscreen();
							} */
						//break;
						default:
							this.clickButtoned();
					}
				});
			},
			clickButtoned: function () {
				Storage.set('index', '1');
			},
		};
	}

	componentDidMount() {
		this.tr.init();
	}

	appendContent() {
		var dat = text[parseInt(this.state.data)];
		var op = [];
		op.push(this.appendTitle(dat));
		op.push(this.appendDescription(dat));
		op.push(this.appendPS(dat));
		return op;
	}

	appendTitle(e) {
		return <h1 key='t'> {e.title} </h1>;
	}

	appendDescription(e) {
		return (
			<h2 key='d'>
				{' '}
				{e.description.split('\n').map((item, i) => (
					<span key={i}>
						{' '}
						{item} <br />{' '}
					</span>
				))}{' '}
			</h2>
		);
	}

	getIndex() {
		return parseInt(this.state.data);
	}

	appendPS(e) {
		return <PS key={'ps'} data={e.PS} getIndex={this.getIndex.bind(this)} />;
	}

	appendQr() {
		if (this.state.qr) return <Qr index={this.state.qr} />;
	}

	render() {
		return (
			<div id='sm'>
				<div class='header'></div>
				<div class='content'>
					<div class='row'>{this.appendContent()}</div>
					{this.appendQr()}
				</div>
				<div class='loader'></div>
			</div>
		);
	}
}
