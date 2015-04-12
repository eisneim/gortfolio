var React = require('react');
var Router = require('react-router');
/*
<h1>this is about page</h1>
<p>{this.getPathname()}</p>
<p>this.getRoutes() : {this.getRoutes()}</p>
<p>this.getParams(): {this.getParams()}</p>
<p>this.getQuery(): {this.getQuery()}</p>
<div id="gf-about-text" dangerouslySetInnerHTML={{__html: content }}></div>
 */ 
var About = React.createClass({
	mixins: [ Router.State ],
	render: function(){
		return (
			<section className="gf-view" id="gf-about">
				<div id="gf-about-portrait"></div>

				<div id="gf-about-text">
					<h4 className="small-title">GREETINGS.</h4>
					<p>Hi there. I am Eisneim Terry(made in 1991), Shanghai based Digital artist & Developer. I'm currently work at startup project <a href="http://org.xinpingzi.com" target="_blank">xinpingzi.com</a> as lead web developer. 
					And, here <a href="http://eisneim.com">eisneim.com</a> is my personal space to memorize my workpieces and memories of the enjoyment of creating beautiful things.
					</p>
					<p>
						My university degree is Bachelor in Electronic Engineering, but I taught myself a lot more than electronics. 
Great thanks to the Internet, I learned almost all my skills online from: Youtube, Vimeo, 
<a href="http://www.lynda.com" target="_blank">lynda.com</a>, 
<a href="http://www.tutsplus.com" target="_blank">tutsplus.com</a>, 
<a href="http://www.pluralsight.com" target="_blank">pluralsight.com</a>, 
<a href="http://www.digitaltutors.com" target="_blank">DigitalTutors.com</a>, and many many more.
I record and share free video tutorials as well, you can find them on <a href="http://zexeo.com" target="_blank">zexeo.com</a>

					</p>
					<h4 className="small-title">WHAT I love to DO.</h4>
					<p>MotionGraphics, VFX, Web Development, Digital Paint, Parkour, BodyBuilding</p>

					<h4 className="small-title">SKILL SETS.</h4>
					<p>
						<em>Design & Motion & VFX</em>:  After Effects, Cinema 4D, Illustrator, Photoshop, MochaPro, Premiere  <br/>
						<em>Web ServerSide</em>: Node.JS, Golang, MongoDB, PHP <br/>
						<em>Web ClientSide</em>: Angular.JS, React.JS, SVG, CSS3, HTML5 <br/>
					</p>
					
					<a className="btn btn-ghost" href="#/contact">Stay in touch →</a>


				</div>
			</section>
		)
	}
});

module.exports = About;