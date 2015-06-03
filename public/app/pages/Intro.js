 var React = require('react');
var Typer = require('../components/Typer.js');

var Intro = React.createClass({
	// componentDidMount:function(){
	// 	// let's insert our big backgournd video;

	// },
	render: function(){
		return (
			<section className="gf-view" id="gf-intro">
				<div className="gf-centered-wraper">
					<header className="gf-centered">
						<br/><br/><br/>
						<h1 className="ua-line-loadin">袁维隆</h1>
						<h2>Eisneim Terry</h2>
						<h3>I Love To Do&nbsp;
							<Typer words={'Parkour||Freerunning||Web Design||Web Development||Paintting||Motion Graphics'}/>
						</h3>
						<p>24yrs old, currently based in Shanghai, China</p>
						<a className="btn btn-ghost btn-lg" href="#/project"> My Projects →</a>
					</header>
				</div>
				<div className="cover-mat"></div>
				<video id="video_background" autoPlay="true" preload="auto" loop="loop" muted="muted" volume="0">
					<source src="video/splash.webm" type="video/webm"/> 
					<source src="video/splash.mp4" type="video/mp4"/> 
					your browser is way too old!
				</video>
			</section>
		)
	}
});

module.exports = Intro;