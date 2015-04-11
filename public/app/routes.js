var React = require('react'),
   	Router = require('react-router'),
   	Route = Router.Route , 
   	DefaultRoute = Router.DefaultRoute, 
    App = require('./App.js'),
    Intro = require('./pages/Intro.js'),
    Projects = require('./pages/Projects.js'),
    Project = require('./pages/Project.js'),
    About = require('./pages/About.js'),
    Portfolio = require('./pages/Portfolio.js'),
    PortfolioItem = require('./pages/PortfolioItem.js'),
    Ideas = require('./pages/Ideas.js'),
    Contact = require('./pages/Contact.js');

module.exports = (
  <Route name='app' path='/' handler={App}>
  	<Route name='intro' path='/intro' handler={Intro} />
    <Route name='about' path='/about' handler={About} />
    <Route name='portfolio' path='/portfolio' handler={Portfolio} >
        <Route name="portfolioItem" path=":itemName" handler={PortfolioItem}/>
    </Route>
    <Route name='projects' path='/project' handler={Projects} >
      <Route name="project" path=":projectUrl" handler={Project}/>
    </Route>
    <Route name='ideas' path='/idea' handler={Ideas} />
    <Route name='contact' path='/contact' handler={Contact} />
    <DefaultRoute handler={Intro}/>
  </Route>
);

