var React = require('react');
var Typer = require('../components/Typer.js');

var Intro = React.createClass({
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
						<p>23yrs old, currently based in Shanghai, China</p>
					</header>
				</div>
				
			</section>
		)
	}
});

module.exports = Intro;