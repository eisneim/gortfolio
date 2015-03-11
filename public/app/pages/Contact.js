var React = require('react');
var Navigation = require('react-router').Navigation;

var Contact = React.createClass({
	// mixins: [Navigation],
	
	render: function(){
		return (
			<section className="gf-view" id="gf-contact">
				<div className="container">
					<h1>this is Contact page</h1>
				</div>
				
			</section>
		)
	}
});

module.exports = Contact;