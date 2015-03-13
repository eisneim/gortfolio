var React = require('react');
var Dragdealer = require('dragdealer').Dragdealer;

var Projects = React.createClass({
	getInitialState:function(){
		return {
			// isFullscreen: false,
		}
	},
	componentDidMount:function(){

		this.ui = {
			isFullscreen:false,
			currentSlide: 0,
		},
		this.elm = {
			slides: [].slice.call( document.getElementById('gf-projects-wraper').children ),
			dragwraper: document.getElementById('gf-projects-wraper'),
		};
		this.elm.slides[0].classList.add('active');

		this._initDrag();
		this._initEvents();
	},
	componentWillUnmount:function(){
		document.removeEventListener( 'keydown',  this.keyEventHandler );
	},
	_initDrag: function(){
		var that = this;
		this.dd = new Dragdealer('gf-projects-drag', {
			steps: 4,
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
			// clicking the slides when not in isFullscreen mode
			slide.addEventListener( 'click', function() {

				if( !self.ui.isFullscreen || self.dd.activity ) return false;
				
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
					if( self.ui.isFullscreen ) return;
					self.onToggleView( currentSlide );
					break; 
				 //up
				case 38:
					// if not fullscreen don't reveal the content. If you want to navigate directly to the content then remove this check.
					if( !self.ui.isFullscreen ) return;
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
			that.ui.isFullscreen = !that.ui.isFullscreen;
		},520);
	},
	chooseSlide:function(e){
		console.log(e);
		console.log('---clicked---');
	},
	render: function(){
		var projects = [{
				name:'project1',
				cover:'images/1.jpg',
			},{
				name:'project2',
				cover:'images/2.jpg',
			},{
				name:'project3',
				cover:'images/3.jpg',
			},{
				name:'project4',
				cover:'images/1.jpg',
			}
		];
		var projectElms = [];
		projects.forEach(function(pp ,index ){
			var projectStyle = {
				'backgroundImage': 'url('+pp.cover+')',
				'width': (100/projects.length)+'%'
			};
			projectElms.push( 
				<div data-index={index} key={'project'+index} className="gf-project-holder" style={projectStyle}>
					<div className="gf-project-info">
						<h1>{pp.name}</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum sapiente ducimus veritatis dolorem, id tenetur dolores ex natus quis nihil laboriosam ut earum, provident atque, esse possimus? Laborum, nostrum, consequatur.</p>
					</div>
					<div className="gf-project-title">
						<h1>{pp.name}</h1>
					</div>
				</div>
			)
		});

		return (
			<section className="gf-view" id="gf-projects">
				<a id="gf-projects-switch" onClick={this.onToggleView}></a>
				<div id="gf-projects-drag" className="dragdealer">
					<div id="gf-projects-wraper" className="handle" style={{'width': (projects.length*100)+'%','transformStyle': 'preserve-3d' }}>
						{projectElms}
					</div>
				</div>
				
				
			</section>
		)
	}
});

module.exports = Projects;