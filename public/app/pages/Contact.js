var React = require('react');
var Navigation = require('react-router').Navigation;
var request = require('superagent');

var Contact = React.createClass({
	// mixins: [Navigation],
	getInitialState:function(){
		return {
			formError:null,
			formInfo:null,
		}
	},
	handleSubmit:function(e){
		e.preventDefault();
		var formData = {
			message: this.refs.messageInput.getDOMNode().value,
			email: this.refs.emailInput.getDOMNode().value,
		}

		if(!formData.message || !formData.email){
			return this.setState({
				formError:'Please fillin valid data in, so i can contact you back.',
			})
		}

		request.post('http://eisneim.com/message')
			.set('Content-Type', 'application/json')
			.send(formData)
			.end(function(req,res){
				console.log(res.status)
				// reset form
				e.target.reset();
				this.setState({
						formError:null,
						formInfo:'Thnak you! you have successfully send me a message!',
				})

			});
	},
	handleBlur:function(e){
		if(e.target.value){
			e.target.parentNode.classList.add('filled');
		}else{
			e.target.parentNode.classList.remove('filled');
		}
	},
	render: function(){
		return (
			<section className="gf-view flex-conainer flex-row" id="gf-contact">
				<div className="social-link">

				</div>
				<div className="flex contact-form" >
					<div className="formNotify">
						<p className="err" style={{display:this.state.formError?'block':'none'}}>{this.state.formError}</p>
						<p className="info" style={{display:this.state.formInfo?'block':'none'}}>{this.state.formInfo}</p>
					</div>
					<form ref="contactForm" name="contact-form" onSubmit={this.handleSubmit}>
						<span className="gf_input gf_input--wave">
							<input ref="emailInput" 
								onBlur={this.handleBlur}
								className="gf_input__field gf_input__field--wave" 
								type="email" 
								id="email" />
							<label className="gf_input__label gf_input__label--wave" htmlFor="email">
								<span className="gf_input__label-content gf_input__label-content--wave">Your Email</span>
							</label>
							<svg className="graphic graphic--wave" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
								<path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
							</svg>

						</span><br/>

						<span className="gf_input gf_input--yoshiko">
							<textarea 
								ref="messageInput" 
								className="gf_input__field gf_input__field--yoshiko" 
								id="message" onBlur={this.handleBlur} required
								></textarea>
							<label className="gf_input__label gf_input__label--yoshiko" htmlFor="message">
								<span className="gf_input__label-content gf_input__label-content--yoshiko" data-content="Good to hear from you">Good to hear from you</span>
							</label>
						</span>

						<button className="btn btn-ghost pull-right btn-lg">Say Hi <span style={{color:"#F0696C"}}>❤</span></button>
					</form>
					<br/><br/><br/><br/>
					<p>Shot me an Email here  ✉  <em>eisneim1[at]sina.com </em></p>
				</div>
			</section>
		)
	}
});

module.exports = Contact;