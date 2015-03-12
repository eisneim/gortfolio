var React = require('react');
var routeCoverStore = require('../stores/routeCoverStore.js');
var routeCoverActions = require('../actions/routeCoverActions.js');

var RouteCover = React.createClass({
	_onChange: function() {
    	// this.setState({});

    	var state = routeCoverStore.getState();
    	if( state.isCoverShown ){
    		this.start();
    	}else{
    		this.finish( );
    	}

  	},
	componentDidMount:function(){
		routeCoverStore.addChangeListener( this._onChange );
		// polygon points
		var width = window.innerWidth, height = window.innerHeight;
		this.startPoints = [ 
			[0,0,  0,0,        0,height,      	0,height ], // 0 start at right;
			[0,0,  width/4,0,  1,height,      	0,height ], // 1

			// [0,0,  width/4,0,  width/4 ,height, 0,height ], // 2
			[0,0,  width/4,0,  width/2 ,height, 0,height ], // 3

			// [0,0,  width/2,0,  width/2 ,height, 0,height], 
			[0,0,  width/4*3,0,  width/2 ,height, 0,height],

			// [0,0,  width/4*3,0,  width/4*3 ,height, 0,height],
			[0,0,  width/4*3,0,    width ,height, 0,height],

			[0,0,  width,0,    width,height, 	0,height],//full screen
		];
		this.finishPoints = [ 
			[0,0, 		width,0, 		width,height, 		0,height ],// full screen
			[width/4,0,  		width,0,  	width,height,	0,height ],
			[width,0,  width,0,        width,height,      	width/4*3,height ],
			[width,0,  width,0,        width,height,      	width,height ],
		];

		this.gfelm = {
			routeCoverSvg : Snap( document.getElementById('route-cover-svg') ),
		};

		this.gfelm.routeCoverPoly= this.gfelm.routeCoverSvg.polygon( this.startPoints[0] );
		this.gfelm.routeCoverPoly.attr({
			id:"route-cover-poly",
			fill: "#fff",
			opacity:0.97,
		});

	},
	start:function(){
		// show element
		this.getDOMNode().style.display = 'block';
		var index = 1;
		var that = this;
		anim();

		function anim(){
			routeCoverStore.setState('isAnimating',true );

			that.gfelm.routeCoverPoly.animate({
				'points': that.startPoints[ index ],
			},100, mina.easeinout, function(){
				index ++;
				if(index < that.startPoints.length ){
					// return anim();
					setTimeout(anim , 50 );
				}else{
					// done
					routeCoverStore.setState('isAnimating',false );
					// call finish
					routeCoverActions.finish(  );
				}

			} );
		}
		
	},
	finish:function(  ){
		// this func will be called twice, execute at last time
		if(routeCoverStore.getState().isAnimating) return;
		if(routeCoverStore.getState().isCoverShown ) return;

		var that = this;
		this.gfelm.routeCoverPoly.animate({'points': this.finishPoints[ 1 ],},80, mina.easeinout,function(){
			that.gfelm.routeCoverPoly.animate({'points': that.finishPoints[ 2 ],},300, mina.easeinout,function(){
				that.gfelm.routeCoverPoly.animate({'points': that.finishPoints[ 3 ],},80, mina.easeinout,function(){
					that.gfelm.routeCoverPoly.attr({
						points: that.startPoints[0],
					});
					// and hide element
					that.getDOMNode().style.display = 'none';
				})
			})

		} )
		
			
	},
	render: function(){
		var width = window.innerWidth, height = window.innerHeight;
		var svgString = '<svg id="route-cover-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 '+width+' '+height+'" style="enable-background:new 0 0 '+width+' '+height+';" xml:space="preserve"> \
		</svg>'; 
		return (
			<div id="gf-route-cover" dangerouslySetInnerHTML={{__html:svgString}}>
			</div>
		)
	}
});

module.exports = RouteCover;