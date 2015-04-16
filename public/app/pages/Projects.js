var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var Dragdealer = require('dragdealer').Dragdealer;
var navActions = require('../actions/navActions.js');
var request = require('superagent');

var projectsStore = require('../stores/projectsStore.js');
var projectsActions = require('../actions/projectsActions.js');

var projects = null;

var Projects = React.createClass({
	mixins: [Navigation,Router.State],
	statics:{
		// scen enter animation
		willTransitionTo: function (transition, params) {
		},
		// leave animation
		willTransitionFrom: function(transition, component ){
			// close side navigation;
			// navActions.toggle('close');
			// // start leave animation;
			// component.leaveSence();

			// setTimeout(function(){
			//  	component.leaveAnimationDone = true;
			//  	transition.retry();
			//  },500);
			// if(!component.leaveAnimationDone){
			// 	transition.abort();
			// }
		},
	},
	_onChange: function() {
    	this.setState( projectsStore.getState() );
	 },
	getInitialState:function(){
		return {
			// showAll: false,
			projects: this.props.preload,
			showGuide: projectsStore.getState().showGuide ,
			ui:{
				showAll:false,
				currentSlide: 0,
			}

		}
	},
	componentDidMount:function(){
		projectsStore.addChangeListener( this._onChange );


		this.ui = {
			showAll:false,
			currentSlide: 0,
		},
		this.elm = {
			slides: [].slice.call( document.getElementById('gf-projects-wraper').children ),
			dragwraper: document.getElementById('gf-projects-wraper'),
		};
		this.elm.slides[0].classList.add('active');

		this._initDrag();
		this._initEvents();

		// if(this.state.activePorject){
		// 	this.showProject();
		// }
	},
	componentWillUnmount:function(){
		document.removeEventListener( 'keydown',  this.keyEventHandler );
	},
	_initDrag: function(){
		var that = this;
		this.dd = new Dragdealer('gf-projects-drag', {
			steps: this.props.preload.length,
			speed: 0.3,
			loose: true,
			requestAnimationFrame: true,
			callback: function( x, y ) {
				// console.log( self.dd.getStep() );
				that.ui.currentSlide = that.dd.getStep()[0]-1;
				// update class of curren active slide;
				for(var ii =0;ii< that.elm.slides.length; ii++){
					that.elm.slides[ii].classList.remove('active');
				};
				that.elm.slides[ that.ui.currentSlide].classList.add('active');
				// change transform orgin

			}
		});
	},
	_initEvents:function(){
		var self = this;
		this.elm.slides.forEach( function( slide ) {
			// clicking the slides when not in showAll mode
			slide.addEventListener( 'click', function(e) {
				if(e.target.tagName == 'A') {
					if( e.target.className.indexOf('gf-project-link') > -1 ){
						// self.showProject();
					}
					return;	
				} 

				if( !self.ui.showAll || self.dd.activity ) return false;
				
				if( self.elm.slides.indexOf( slide ) === (self.ui.currentSlide) ) {
					self.onToggleView();
				}else {
					self.dd.setStep( self.elm.slides.indexOf( slide ) + 1 );
				}
			} );

		} );
		this.keyEventHandler = function( ev ) {
			var keyCode = ev.keyCode || ev.which,
				currentSlide = self.elm.slides[ self.ui.currentSlide ];

			switch (keyCode) {
				case 40: // down key
					if( self.ui.showAll ){
						// should to to poject page:
						self.transitionTo('project',{
							projectUrl: self.props.preload[ self.ui.currentSlide ].url,
						});

						return;
					};
					self.onToggleView( currentSlide );
					break; 
				 //up
				case 38:
					// if not fullscreen don't reveal the content. If you want to navigate directly to the content then remove this check.
					if( !self.ui.showAll ) return;
					self.onToggleView( currentSlide );
					break;
					// left;
				case 37:
					self.dd.setStep( self.ui.currentSlide - 1 );
					break;
				case 39:
					// righ
					self.dd.setStep( self.ui.currentSlide + 2 );
					break;
			}
		};
		// keyboard navigation events
		document.addEventListener( 'keydown',  this.keyEventHandler );

	},
	onToggleView:function(){
		var that = this;
		this.getDOMNode().classList.toggle('gf-showall');
		that.dd.disable();
		// reculculate translateX
		this.elm.dragwraper.style.transform = 'translateX(-'+( that.ui.currentSlide /that.elm.slides.length * 100)+'%)';

		setTimeout(function(){
			that.dd.reflow();
			that.dd.enable();
			that.ui.showAll = !that.ui.showAll;
		},520);
	},
	componentDidUpdate:function(){
		var self = this;
		// recalculate for dragdealer
		setTimeout(function(){
			self.dd.reflow();
		},100);

		if( this.getParams().projectUrl ){
			this.getDOMNode().classList.add('gf-leave')
			// remove event handler
			document.removeEventListener( 'keydown',  this.keyEventHandler );

		}else{
			this.getDOMNode().classList.remove('gf-leave')
			document.addEventListener( 'keydown',  this.keyEventHandler );
		}

	},
	leaveSence:function(){
		// this.elm.dragwraper.style.transform = 'translateX(-'+( that.ui.currentSlide /that.elm.slides.length * 100)+'%)';
		
		// this.getDOMNode().classList.add('gf-leave');
		// var self = this;
		// setTimeout(function(){
		// 	var $drag = document.getElementById('gf-projects-drag');
		// 	if($drag) $drag.style.display = 'none';
		// },1000);
	},
	/**
	 * show a specific project and hide dragable gird;
	 */
	showProject:function(){
		this.leaveSence();

	},
	render: function(){
		var self = this;
		var projects = this.props.preload;

		var projectElms = [];
		var selectedProject = null;
		var activePorject = this.getParams().projectUrl;

		projects.forEach(function(pp ,index ){
			var projectStyle = {
				'backgroundImage': 'url('+pp.cover+')',
				'width': (100/projects.length)+'%'
			};

			if( activePorject == pp.url ) selectedProject = projects[index];

			projectElms.push( 
				<div data-index={index} key={'project'+index} className="gf-project-holder" style={projectStyle}>
					<div className="gf-project-info">
						<h1><a href={ '#/project/'+pp.url }>{pp.name} ↓</a></h1>
						<p>{pp.description}</p>
					</div>
					<div className="gf-project-title">
						<h1>{pp.name}</h1>
						<a className="gf-project-link" href={ '#/project/'+pp.url }></a>
					</div>
				</div>
			)
		});
		var classese = 'gf-view '+( activePorject ? 'gf-leave':'');

		return (
			<section className={classese} id="gf-projects">
				<a id="gf-projects-switch" onClick={this.onToggleView}></a>
				
				<div id="guide-overlay" className={'overlay '+(this.state.showGuide?'':'hide')}>
					<div className="info">
						<h2>Interactions</h2>
						<span className="info-drag">Drag Sliders</span>
						<span className="info-keys">Use Arrows</span>
						<span className="info-switch">Switch view</span><br/><br/>
						<button className="btn btn-ghost btn-lg" onClick={projectsActions.toggleGuide}>Got it!</button>
					</div>
				</div>

				<div id="gf-projects-drag-wrap">
					<div id="gf-projects-drag" className="dragdealer">
						<div id="gf-projects-wraper" className="handle" style={{'width': (projects.length*100)+'%','transformStyle': 'preserve-3d' }}>
							{projectElms}
						</div>
					</div>
				</div>
				<RouteHandler {...this.props} projectData={selectedProject} />
			</section>
		)
	}
});

module.exports = Projects;