var React = require('react');
var navActions = require('../actions/navActions.js');
var navStore = require('../stores/navStore.js')

var Navtoggle = React.createClass({
	_onChange: function() {
    	// this.setState({});
    	// console.log('navStore.getState().isNavOpen :'+ navStore.getState().isNavOpen );
    	if( navStore.getState().isNavOpen ){
    		this.openNav()
    	}else{
    		this.closeNav()
    	}

  	},
	componentDidMount: function(){
		navStore.addChangeListener(this._onChange);

		// store dom elements here
		this.gfelm = {
			gfApp:document.getElementById('gf-app'),
			navSvgPoints : {
				from: 	[115,800,115,800,115,1,115,1 ],//this.gfelm.navSvgPolygon.attr('points'),
				to: 	[115,800,5 , 800,115,1,115,1 ],//this.gfelm.navSvg.getAttribute('data-points-hover'),
			}
		}

		this.gfelm.navSvg = Snap( document.getElementById('nav-svg') );//;
		this.gfelm.navSvgPolygon = this.gfelm.navSvg.polygon( this.gfelm.navSvgPoints.from );
		this.gfelm.navSvgPolygon.attr({
			id:"nav-svg-poly",
			fill: "#ffffff",
		});
		this.gfelm.isNavSvgOpen = false;

		// -----create a backdrop overlay ------
		this.gfelm.backdrop = document.createElement('div');
		this.gfelm.backdrop.id = 'gf-nav-backdrop';
		this.gfelm.gfApp.appendChild( this.gfelm.backdrop );
		// add event listener to close nav
		this.gfelm.backdrop.addEventListener('click',function(e){
			navActions.toggle('close');
		});

		this._onChange();
	},
	componentWillUnmount:function(){
		navStore.removeChangeListener(this._onChange);
	},
	openNav:function(){
		this.gfelm.gfApp.classList.add('show-nav');
		var node = this.getDOMNode();

		node.classList.add('uac-close');
		node.classList.add('uac-dark');
		this.gfelm.backdrop.style.visibility = 'visible';

		this.gfelm.navSvgPolygon.animate({
			'points': this.gfelm.navSvgPoints.to,
		},300, mina.easeinout );
	},
	closeNav:function(){
		this.gfelm.gfApp.classList.remove('show-nav');
		var node = this.getDOMNode();

		node.classList.remove('uac-close');
		node.classList.remove('uac-dark');

		this.gfelm.backdrop.style.visibility = 'hidden';

		this.gfelm.navSvgPolygon.animate({
			'points': this.gfelm.navSvgPoints.from,
		},300, mina.easeinout );
	},
	// toggleNav:function(){
	// 	this.gfelm.gfApp.classList.toggle('show-nav');
	// 	var node = this.getDOMNode();

	// 	node.classList.toggle('uac-close');
	// 	node.classList.toggle('uac-dark');

	// 	this.gfelm.navSvgPolygon.animate({
	// 		'points': navStore.getState().isNavOpen ? this.gfelm.navSvgPoints.from :  this.gfelm.navSvgPoints.to,
	// 	},300, mina.easeinout );
	// }
	onToggle: function(){
		navActions.toggle();
	},
	render: function(){
		var svgString = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">  \
			    	<path class="uac-circle" fill="none" stroke-width="2" stroke-miterlimit="10" d="M16,32h32c0,0,11.723-0.306,10.75-11c-0.25-2.75-1.644-4.971-2.869-7.151C50.728,7.08,42.767,2.569,33.733,2.054C33.159,2.033,32.599,2,32,2C15.432,2,2,15.432,2,32c0,16.566,13.432,30,30,30c16.566,0,30-13.434,30-30C62,15.5,48.5,2,32,2S1.875,15.5,1.875,32"></path> \
			    </svg> ';
		return (
			<div id="gf-nav-toggle" className="uac-toggle-barcircle" onClick={this.onToggle}> 
			  <div className="uac-top"></div>
			  <div dangerouslySetInnerHTML={{__html: svgString }}></div>
			  <div className="uac-bottom"></div> 
			</div>
		)
	}
});

module.exports = Navtoggle;
