var React = require('react');
var Grid = require('../components/Grid.js');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var gridSvc = require('../service/gridSvc.js');
var _ = require('lodash');


var Portfolio = React.createClass({
	mixins: [ 
		Router.Navigation,
		Router.State 
	],
	getInitialState: function(){
		var items = [
				{
					name:'1th item',
					description:'lorem ipsome delo ca deso someca totl esos cess lorem ipsome delo ca deso someca totl esos cess, lorem ipsome delo ca deso someca totl esos cess',
					url:"item1",
					img:'http://placehold.it/200x320/227DAC/fff',
				},
				{
					name:'2th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item2",
					img:'http://placehold.it/200x320/A3BB7E/fff',
				},
				{
					name:'3th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item3",
					img:'http://placehold.it/200x320/636aBC/fff',
				},
				{
					name:'4th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item4",
					img:'http://placehold.it/400x320/CC7B5D/fff',
				},
				{
					name:'5th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item5",
					img:'http://placehold.it/400x320/816F7C/fff',
				},
				{
					name:'6th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item6",
					img:'http://placehold.it/500x320/936aBC/fff',
				},
				{
					name:'7th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item7",
					img:'http://placehold.it/200x420/93aFBC/fff',
				},
				{
					name:'8th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item8",
					img:'http://placehold.it/200x420/136FBC/fff',
				},
				{
					name:'9th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item9",
					img:'http://placehold.it/400x320/936FBC/fff',
				},
				{
					name:'10th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item10",
					img:'http://placehold.it/600x320/936FBC/fff',
				},
				{
					name:'11th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item11",
					img:'http://placehold.it/200x550/63D5E7/fff',
				},
				{
					name:'12th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item12",
					img:'http://placehold.it/300x220/236FBC/fff',
				},
				{
					name:'13th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item13",
					img:'http://placehold.it/200x320/EBC575/fff',
				}
			];

		this.grid = gridSvc({
			gridWidth: window.innerWidth - 40,
			minItemWidth:280,
			itemLength: items.length,
		});

		var gridData =  this.grid.fill();

		return {
			items: items,
			gridData:gridData,
		}
	},
	componentWillMount: function(){

	},
	componentDidMount:function(){
		var self = this;
		this.debouncedFill = _.debounce( this.refill , 200);
		// add window resize event listener
		window.addEventListener('resize', this.debouncedFill );

		this.elms = {
			self: this.getDOMNode(),
			portfolioItem: document.getElementById('gf-portfolio-item'),
		}
	},
	componentWillUnmount:function(){
		// remove grid resize listener
		window.removeEventListener('resize',this.debouncedFill  );

	},
	refill:function(){
		var gridData = this.grid.refill();


		this.setState({
			gridData: gridData,
		});
	},
	/**
	 * when portfolio item is selected, page will scroll to top
	 * @return void
	 */
	scrollPosition:function(){
		var self = this;
		if(!this.elms || !this.elms.self) return;
		if(this.lastScrollPosition && this.lastScrollPosition > 200){
			setTimeout(function(){
				self.elms.self.scrollTop = self.lastScrollPosition;
				console.log( self.lastScrollPosition );
			},100);
		}
		
		if(this.elms.self.scrollTop >= 200){
			this.lastScrollPosition = this.elms.self.scrollTop;
		}

	},
	render: function(){
		// this.scrollPosition();

		var sectionClasses = 'gf-view';
		var itemWraperClass = '';

		var items = [],selected, selectedItem = this.getParams().itemName;
		if( selectedItem ){
			sectionClasses+= ' showItem';
			itemWraperClass += ' show';
		}

		this.state.items.forEach(function(item,index){
			var style = {
				backgroundImage: 'url('+item.img+')',
			};
			if(item.url == selectedItem) selected = index;
			var itemid = 'gf-'+item.url;

			items.push(
				<figcaption id={itemid} className="portfolio-item" style={style} >
					<div className="item-info-wraper">
						<h2>{item.name}</h2>
						<p>{item.description}</p>
					</div>
					<a href={'#/portfolio/'+item.url}></a>
				</figcaption>
			)
		});

		return (
			<section className={sectionClasses} id="gf-portfolio">
				<Grid items={items} gridData={this.state.gridData}  selected={selected}/>
				<div id="gf-portfolio-item" className={itemWraperClass}>
					<RouteHandler {...this.props}/>
					<a className="close-btn" href="#/portfolio"></a>
				</div>
			</section>
		);
	}
}); // createClass


module.exports = Portfolio;