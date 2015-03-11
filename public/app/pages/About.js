var React = require('react');
var Router = require('react-router');

var About = React.createClass({
	mixins: [ Router.State ],
	render: function(){
		return (
			<section className="gf-view" id="gf-about" {...this.props}>
				<div className="container">
					<h1>this is about page</h1>
					<p>{this.getPathname()}</p>
					<p>this.getRoutes() : {this.getRoutes()}</p>
					<p>this.getParams(): {this.getParams()}</p>
					<p>this.getQuery(): {this.getQuery()}</p>
				</div>
				
			</section>
		)
	}
});

module.exports = About;