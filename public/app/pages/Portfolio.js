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
					thumbnail:'/images/u1.jpg',
					cover:'/images/u1.jpg',
					content:'<div role="main" class="container"><p> 半路出家自学搬砖，工头最近管得松，特借此机会录搬砖之法以供分享，鄙人毕业不久水平很菜，还望各路高手手下留情 别把我拍死了。。。。</p><h3>教程的几个章节：</h3><ul><li>1.初识ReactJS(讲的太烂，直接跳过吧....)</li><li>2.第一个组件hellow world</li><li>3.组件的嵌套</li><li>4.组件的状态state</li><li>5.组件的参数props</li><li>6.事件events</li><li>7.指向ref</li><li>8.双向数据流</li><li>9.组件生命周期</li><li>10.mixin</li><li>11.1 开发环境和工具</li><li>11.2 分成小组件</li><li>11.3 添加功能</li><li>12.结尾</li></ul><p><a href="http://pan.baidu.com/s/1sjoeLe125">百度网盘</a><a href="http://pan.baidu.com/s/1pJJqYWN12">打包下载</a></p><p>如果大家觉得有用，我讲继续录React+flux+react-router的教程，或许会加上relay，graphQL(如果时间来得及的话)</p><h3>教程最后要实现的app：</h3><p><img src="/images/u1.jpg" alt="react.js中文视频教程"></p><ol class="post-nav"><a href="/articles/2015-1-1-new_year_plan.html" class="post-next">2015年的计划</a></ol></div>',
				},
				{
					name:'2th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item2",
					thumbnail:'/images/u2.jpg',
					cover:'/images/u2.jpg',
					content:'<h1>this is some conent</h1>',
				},
				{
					name:'3th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item3",
					thumbnail:'/images/u3.jpg',
					cover:'/images/u3.jpg',
					content:'<h1>this is some conent</h1>',
				},
				{
					name:'4th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item4",
					thumbnail:'/images/u4.jpg',
					cover:'/images/u4.jpg',
					content:'<h1>this is some conent</h1>',
				},
				{
					name:'5th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item5",
					thumbnail:'/images/u5.jpg',
					cover:'/images/u5.jpg',
					content:'<h1>this is some conent</h1>',
				},
				{
					name:'6th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item6",
					thumbnail:'/images/u6.jpg',
					cover:'/images/u6.jpg',
					content:'<h1>this is some conent</h1>',
				},
				{
					name:'7th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item7",
					thumbnail:'/images/u7.jpg',
					cover:'/images/u7.jpg',
					content:'<h1>this is some conent</h1>',
				},
				{
					name:'8th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item8",
					thumbnail:'/images/u8.jpg',
					cover:'/images/u8.jpg',
					content:'<h1>this is some conent</h1>',
				},
				{
					name:'9th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item9",
					thumbnail:'/images/u9.jpg',
					cover:'/images/u9.jpg',
					content:'<h1>this is some conent</h1>',
				},
				{
					name:'10th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item10",
					thumbnail:'/images/u10.jpg',
					cover:'/images/u10.jpg',
					content:'<h1>this is some conent</h1>',
				},
				{
					name:'11th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item11",
					thumbnail:'/images/u11.jpg',
					cover:'/images/u11.jpg',
					content:'<h1>this is some conent</h1>',
				},
				{
					name:'12th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item12",
					thumbnail:'/images/u12.jpg',
					cover:'/images/u12.jpg',
					content:'<h1>this is some conent</h1>',
				},
				{
					name:'13th item',
					description:'lorem ipsome delo ca deso someca totl esos cess',
					url:"item13",
					thumbnail:'/images/u13.jpg',
					cover:'/images/u13.jpg',
					content:'<h1>this is some conent</h1>',
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
				backgroundImage: 'url('+item.thumbnail+')',
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
					<RouteHandler {...this.props} item={this.state.items[selected]}/>
					<a className="close-btn" href="#/portfolio"></a>
				</div>
			</section>
		);
	}
}); // createClass


module.exports = Portfolio;