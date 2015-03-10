var React = require('react');

var Typer = React.createClass({
	propTypes:{
		words: React.PropTypes.string.isRequired
	},
	getDefaultProps:function(){
		return {
			words: 'Web Design||Art',
		}
	},
	componentDidMount: function(){
		var $wraper = this.getDOMNode();
			$wraper.classList.add('uac-waiting');

		var $words = $wraper.getElementsByTagName('b');

		var _duration = 3000;
		var animationDuration = 1200;// in and out duration;
		var letterAnimDelay = 80;

		var activeWordIndex=0,$current = $words[0],$previous, $next;

		var letterInInterval = setInterval(function(){
				letterIn($current.childNodes );
			},100 );;

		this.wordTimer = setInterval(function(){
			if(letterInInterval) clearInterval( letterInInterval );

			if(activeWordIndex >= $words.length ) activeWordIndex = 0;
			$current = getByIndex($words, activeWordIndex );
			$previous = getByIndex($words, activeWordIndex - 1 );
			$next = getByIndex($words, activeWordIndex +1 );

			$current.classList.remove('uac-hidden');
			$current.classList.add('uac-visible');

			$previous.classList.remove('uac-visible');
			$previous.classList.add('uac-hidden');

			// ----------letterery
			$wraper.classList.remove('uac-waiting');
			setTimeout(function(){
				// select words
				$wraper.classList.add('uac-selected');
			} , _duration - 500 );

			letterInInterval = setInterval(function(){
				letterIn($current.childNodes );
			},letterAnimDelay );

			letterOut( $previous.childNodes );

			activeWordIndex ++;
		}, _duration );

		// sequencially add .uac-in and .uac-out to letters
		var inLetterIndex = 0, outLetterIndex = 0;
		function letterIn(letters){

			$wraper.classList.remove('uac-selected');

			if(letters[inLetterIndex]){ 
				letters[inLetterIndex].classList.remove('uac-out'); 
				letters[inLetterIndex].classList.add('uac-in');
			} 

			inLetterIndex++;
			if( inLetterIndex < letters.length ) {
				return;
			}else{ // finished all letter animation , now waitting for next
				inLetterIndex = 0;
				// flicker effect
				$wraper.classList.add('uac-waiting');
				clearInterval( letterInInterval );
			}
		}

		function letterOut(letters){
			// hide all at onece;
			for(var ii=0;ii<letters.length; ii++){
				letters[ii].classList.remove('uac-in');
			}
		}

		function getByIndex(arr,index){
			if( index >= arr.length ){
				return arr[0];
			}else if( index < 0 ){
				return arr[ arr.length-1 ];
			}else{
				return arr[index];
			}
		};


	},
	componentWillUnmount:function(){
		clearInterval(this.wordTimer);
	},
	render: function(){
		var words = this.props.words.split('||');
		var wordElms = words.map(function(word,index){
			var chars = [];
			var classString = index == 0 ? 'uac-visible' : '';
			for(var ii=0;ii<word.length;ii++){
				chars.push( <i key={'letter-'+ii}><em>{word[ii]}</em></i> );
			}
			return <b key={'word-'+index} className={classString}>{ chars}</b>
		});

		return (
			<span className="uac-words uac-letter-type">
				{wordElms}
			</span>
		)
	}

});

module.exports = Typer;