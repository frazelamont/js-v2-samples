var imgBaseUrl = 'http://gmaps-samples.googlecode.com/svn/trunk/elections/2008/images/icons/';


if( ! Array.prototype.forEach ) {
	Array.prototype.forEach = function( fun /*, thisp*/ ) {
		if( typeof fun != 'function' )
			throw new TypeError();
		
		var thisp = arguments[1];
		for( var i = 0, n = this.length;  i < n;  ++i ) {
			if( i in this )
				fun.call( thisp, this[i], i, this );
		}
	};
}

if( ! Array.prototype.map ) {
	Array.prototype.map = function( fun /*, thisp*/ ) {
		var len = this.length;
		if( typeof fun != 'function' )
			throw new TypeError();
		
		var res = new Array( len );
		var thisp = arguments[1];
		for( var i = 0;  i < len;  ++i ) {
			if( i in this )
				res[i] = fun.call( thisp, this[i], i, this );
		}
		
		return res;
	};
}

if( ! Array.prototype.index ) {
	Array.prototype.index = function( field ) {
		this.by = {};
		var by = this.by[field] = {};
		for( var i = 0, n = this.length;  i < n;  ++i ) {
			var obj = this[i];
			by[obj[field]] = obj;
			obj.index = i;
		}
		return this;
	};
}

String.prototype.trim = function() {
	return this.replace( /^\s\s*/, '' ).replace( /\s\s*$/, '' );
};

String.prototype.words = function( fun ) {
	this.split(' ').forEach( fun );
};

function S() {
	return Array.prototype.join.call( arguments, '' );
};

function percent( n ) {
	n = Math.round( n * 100 );
	return n ? n + '%' : '';
}

function formatNumber( nStr ) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

var states = [
	{ 'abbr': 'al', 'name': 'Alabama' },
	{ 'abbr': 'ak', 'name': 'Alaska' },
	{ 'abbr': 'az', 'name': 'Arizona' },
	{ 'abbr': 'ar', 'name': 'Arkansas' },
	{ 'abbr': 'ca', 'name': 'California' },
	{ 'abbr': 'co', 'name': 'Colorado' },
	{ 'abbr': 'ct', 'name': 'Connecticut' },
	{ 'abbr': 'de', 'name': 'Delaware' },
	{ 'abbr': 'dc', 'name': 'District Of Columbia' },
	{ 'abbr': 'fl', 'name': 'Florida' },
	{ 'abbr': 'ga', 'name': 'Georgia' },
	{ 'abbr': 'hi', 'name': 'Hawaii' },
	{ 'abbr': 'id', 'name': 'Idaho' },
	{ 'abbr': 'il', 'name': 'Illinois' },
	{ 'abbr': 'in', 'name': 'Indiana' },
	{ 'abbr': 'ia', 'name': 'Iowa',
		'results': {
			"democrat":{"precincts":{"total":1781,"reporting":1772},"total":13420,"democrat":[{"votes":4688,"name":"obama"},{"votes":4194,"name":"edwards"},{"votes":4089,"name":"clinton"},{"votes":298,"name":"richardson"},{"votes":147,"name":"biden"},{"votes":4,"name":"dodd"},{"votes":0,"name":"kucinich"},{"votes":0,"name":"gravel"}]},
			"republican":{"precincts":{"total":1781,"reporting":1781},"total":118696,"republican":[{"votes":40841,"name":"huckabee"},{"votes":29949,"name":"romney"},{"votes":15904,"name":"thompson"},{"votes":15559,"name":"mccain"},{"votes":11817,"name":"paul"},{"votes":4097,"name":"giuliani"},{"votes":524,"name":"hunter"},{"votes":5,"name":"tancredo"}]}
		}
	},
	{ 'abbr': 'ks', 'name': 'Kansas' },
	{ 'abbr': 'ky', 'name': 'Kentucky' },
	{ 'abbr': 'la', 'name': 'Louisiana' },
	{ 'abbr': 'me', 'name': 'Maine' },
	{ 'abbr': 'md', 'name': 'Maryland' },
	{ 'abbr': 'ma', 'name': 'Massachusetts' },
	{ 'abbr': 'mi', 'name': 'Michigan',
		'results': {
			"democrat":{"total":592798,"precincts":{"total":"5385","reporting":"5385"},"democrat":[{"votes":328151,"name":"clinton"},{"votes":236723,"name":"uncommitted-d"},{"votes":21708,"name":"kucinich"},{"votes":3853,"name":"dodd"},{"votes":2363,"name":"gravel"}]},
			"republican":{"republican":[{"votes":337847,"name":"romney"},{"votes":257521,"name":"mccain"},{"votes":139699,"name":"huckabee"},{"votes":54434,"name":"paul"},{"votes":32135,"name":"thompson"},{"votes":24706,"name":"giuliani"},{"votes":17971,"name":"uncommitted-r"},{"votes":2823,"name":"hunter"},{"votes":458,"name":"tancredo"},{"votes":354,"name":"brownback"}],"total":867948,"precincts":{"total":"5385","reporting":"5385"}}
		}
	},
	{ 'abbr': 'mn', 'name': 'Minnesota' },
	{ 'abbr': 'ms', 'name': 'Mississippi' },
	{ 'abbr': 'mo', 'name': 'Missouri' },
	{ 'abbr': 'mt', 'name': 'Montana' },
	{ 'abbr': 'ne', 'name': 'Nebraska' },
	{ 'abbr': 'nv', 'name': 'Nevada',
		'results': {
			"democrat":{"total":10560,"precincts":{"total":"1797","reporting":"1762"},"democrat":[{"votes":5355,"name":"clinton"},{"votes":4773,"name":"obama"},{"votes":396,"name":"edwards"},{"votes":31,"name":"uncommitted-d"},{"votes":5,"name":"kucinich"}]},
			"republican":{"republican":[{"votes":22649,"name":"romney"},{"votes":6087,"name":"paul"},{"votes":5651,"name":"mccain"},{"votes":3616,"name":"huckabee"},{"votes":3521,"name":"thompson"},{"votes":1910,"name":"giuliani"},{"votes":890,"name":"hunter"}],"total":44324,"precincts":{"total":"1797","reporting":"1797"}}
		}
	},
	{ 'abbr': 'nh', 'name': 'New Hampshire' },
	{ 'abbr': 'nj', 'name': 'New Jersey' },
	{ 'abbr': 'nm', 'name': 'New Mexico' },
	{ 'abbr': 'ny', 'name': 'New York' },
	{ 'abbr': 'nc', 'name': 'North Carolina' },
	{ 'abbr': 'nd', 'name': 'North Dakota' },
	{ 'abbr': 'oh', 'name': 'Ohio' },
	{ 'abbr': 'ok', 'name': 'Oklahoma' },
	{ 'abbr': 'or', 'name': 'Oregon' },
	{ 'abbr': 'pa', 'name': 'Pennsylvania' },
	{ 'abbr': 'ri', 'name': 'Rhode Island' },
	{ 'abbr': 'sc', 'name': 'South Carolina',
		'results': {
			"republican":{"republican":[{"votes":143224,"name":"mccain"},{"votes":128908,"name":"huckabee"},{"votes":67897,"name":"thompson"},{"votes":64970,"name":"romney"},{"votes":15773,"name":"paul"},{"votes":9112,"name":"giuliani"},{"votes":1035,"name":"hunter"},{"votes":115,"name":"tancredo"},{"votes":83,"name":"cox"},{"votes":56,"name":"cort"},{"votes":23,"name":"fendig"}],"total":431196,"precincts":{"total":"2259","reporting":"2249"}}
		}
	},
	{ 'abbr': 'sd', 'name': 'South Dakota' },
	{ 'abbr': 'tn', 'name': 'Tennessee' },
	{ 'abbr': 'tx', 'name': 'Texas' },
	{ 'abbr': 'ut', 'name': 'Utah' },
	{ 'abbr': 'vt', 'name': 'Vermont' },
	{ 'abbr': 'va', 'name': 'Virginia' },
	{ 'abbr': 'wa', 'name': 'Washington' },
	{ 'abbr': 'wv', 'name': 'West Virginia' },
	{ 'abbr': 'wi', 'name': 'Wisconsin' },
	{ 'abbr': 'wy', 'name': 'Wyoming' }
];

var parties = [
	{ name: 'democrat', shortName: 'Democratic', fullName: 'Democratic Party', url:'http://www.iowademocrats.org/' },
	{ name: 'republican', shortName: 'Republican', fullName: 'Republican Party', url:'http://www.iowagop.net/' }
].index('name');

var candidates = {
	'all': [],
	'democrat': [
		{ 'name': 'biden', 'lastName': 'Biden', 'fullName': 'Joe Biden', 'color': '#20FF1F', 'feed': '' },
		{ 'name': 'clinton', 'lastName': 'Clinton', 'fullName': 'Hillary Clinton', 'color': '#FFFA00', 'feed': '2jmb4ula0um5138qnfk621nagg' },
		{ 'name': 'dodd', 'lastName': 'Dodd', 'fullName': 'Chris Dodd', 'color': '#E4Af95', 'feed': 'l06f7eei6qfjns5a4pd5nv6erg' },
		{ 'name': 'edwards', 'lastName': 'Edwards', 'fullName': 'John Edwards', 'color': '#FF1300', 'feed': '46uusesnavfh045mmfjje0fflo' },
		{ 'name': 'gravel', 'lastName': 'Gravel', 'fullName': 'Mike Gravel', 'color': '#8A5C2E', 'feed': '47r7phlvf8e07lga3poj0ntv8g' },
		{ 'name': 'kucinich', 'lastName': 'Kucinich', 'fullName': 'Dennis Kucinich', 'color': '#EE00B5', 'feed': '7c9gellom85djmbl6664s9cclc' },
		{ 'name': 'obama', 'lastName': 'Obama', 'fullName': 'Barack Obama', 'color': '#1700E8', 'feed': 'nkt5atdq7cdbes3ehdfpendpnc' },
		{ 'name': 'richardson', 'lastName': 'Richardson', 'fullName': 'Bill Richardson', 'color': '#336633', 'feed': 'mdgiev7eul12rt1lo6eohg55q0' },
		{ 'name': 'uncommitted-d', 'lastName': 'Uncommitted', 'fullName': 'Uncommitted', 'color': '#DDDDDD', 'feed': '' }
	],
	'republican': [
		{ 'name': 'brownback', 'lastName': 'Brownback', 'fullName': 'Sam Brownback', 'color': '#8080FF', 'feed': 'lm63qmbqunob5gbvratl1bo974' },
		{ 'name': 'cort', 'lastName': 'Cort', 'fullName': 'Hugh Cort', 'color': '#8080FF' },
		{ 'name': 'cox', 'lastName': 'Cox', 'fullName': 'John Cox', 'color': '#808040' },
		{ 'name': 'fendig', 'lastName': 'Fendig', 'fullName': 'Cap Fendig', 'color': '#408080' },
		{ 'name': 'giuliani', 'lastName': 'Giuliani', 'fullName': 'Rudy Giuliani', 'color': '#336633', 'feed': 'g0tkl52ft6nhrlm2e6v6his400' },
		{ 'name': 'huckabee', 'lastName': 'Huckabee', 'fullName': 'Mike Huckabee', 'color': '#1700E8', 'feed': 'h32i31ojgo9vvb3vnggmq1qrh8' },
		{ 'name': 'hunter', 'lastName': 'Hunter', 'fullName': 'Duncan Hunter', 'color': '#8A5C2E', 'feed': '' },
		//{ 'name': 'keyes', 'lastName': 'Keyes', 'fullName': 'Alan Keyes', 'color': '#8080FF', 'feed': '' },
		{ 'name': 'mccain', 'lastName': 'McCain', 'fullName': 'John McCain', 'color': '#FFFA00', 'feed': 'q1du1ju69m8jecsjkhjr538kbs' },
		{ 'name': 'paul', 'lastName': 'Paul', 'fullName': 'Ron Paul', 'color': '#E4Af95', 'feed': '7p20d17uil4ft2qhvattqrjdgg' },
		{ 'name': 'romney', 'lastName': 'Romney', 'fullName': 'Mitt Romney', 'color': '#FF1300', 'feed': '3mv48r8us0rou62c356om8groc' },
		{ 'name': 'tancredo', 'lastName': 'Tancredo', 'fullName': 'Tom Tancredo', 'color': '#EE00B5', 'feed': '' },
		{ 'name': 'thompson', 'lastName': 'Thompson', 'fullName': 'Fred Thompson', 'color': '#20FF1F', 'feed': 'fhg9gjvi7459qaf0ki43ij1g78' },
		{ 'name': 'uncommitted-r', 'lastName': 'Uncommitted', 'fullName': 'Uncommitted', 'color': '#DDDDDD', 'feed': '' }
	]
};

var preloadCandidates = candidates.all.map( function( candidate ) {
	//var img = new Image( 16, 16 );
	//img.src = imgUrl( candidate.name );
	//return img;
	return _IG_GetImage( imgUrl(candidate.name) );
});

var candidateNameList = [];
parties.forEach( function( party ) {
	var list = candidates[party.name];
	list.forEach( function( candidate ) {
		candidate.party = party;
		candidates.all.push( candidate );
		candidateNameList.push( candidate.name );
	});
	list.index( 'name' );
});

candidates.all.index( 'name' );

//var reCandidates = new RegExp( candidateNameList.join('|'), 'g' );

function imgUrl( name ) {
	return imgBaseUrl + name + '.png';
}

document.write(
	'<style type="text/css">',
		'* { font-family: Arial,sans-serif; font-size: 10pt; }',
		'table { width: 100%; }',
		'tr { vertical-align: top; }',
		'tr.odd { background-color: #F0F0F0; }',
		'.expander { vertical-align: center; }',
		'.expander div { width: 12px; height: 12px; margin-top: 3px; background-image: url(http://img0.gmodules.com/ig/images/max_min_dark_blue.gif) }',
		'td.party { font-weight: bold; }',
		'td.state { font-weight: bold; width: 1%; }',
		'.votes { text-align: center; padding-right:16px; }',
		'.favicon { margin-top:2px; }',
	'</style>'
);

(function() {
	
	//function col( state, partyname ) {
	//	var results = state.results[partyname];
	//	if( ! results ) return '<td colspan="3"></td>';
	//	var candidate = results[partyname][0];
	//	return S(
	//		'<td class="votes">',
	//			formatNumber( candidate.votes ),
	//		'</td>',
	//		'<td class="icon">',
	//			'<img class="favicon" src="', _IG_GetImageUrl( imgUrl(candidate.name) ), '" />',
	//		'</td>',
	//		'<td>',
	//			candidates.all.by.name[candidate.name].lastName,
	//		'</td>'
	//	);
	//}
	//
	//var odd;
	//document.write(
	//	'<table>',
	//		'<tr>',
	//			'<td colspan="2">',
	//			'</td>',
	//			'<td class="party" colspan="3">',
	//				'Democratic',
	//			'</td>',
	//			'<td class="party" colspan="3">',
	//				'Republican',
	//			'</td>',
	//		'</tr>',
	//		states.map( function( state ) {
	//			if( ! state.results ) return '';
	//			odd = ! odd;
	//			return S(
	//				'<tr class="', odd ? 'odd' : 'even', '">',
	//					'<td class="expander">',
	//						'<div>',
	//						'</div>',
	//					'</td>',
	//					'<td class="state">',
	//						state.abbr.toUpperCase(), '&nbsp;',
	//					'</td>',
	//					col( state, 'democrat' ),
	//					col( state, 'republican' ),
	//				'</tr>'
	//			);
	//		}).join(''),
	//	'</table>'
	//);
	
	function col( state, partyname, second ) {
		var results = state.results[partyname];
		if( ! results ) return '<td colspan="2"></td>';
		var total = results.total;
		var candidate = results[partyname][0];
		return ! second ? S(
			'<td class="icon">',
				'<img class="favicon" src="', _IG_GetImageUrl( imgUrl(candidate.name) ), '" />',
			'</td>',
			'<td>',
				candidates.all.by.name[candidate.name].lastName,
			'</td>'
		) : S(
			'<td class="percent">',
				percent( candidate.votes / total ),
			'</td>',
			'<td class="votes">',
				formatNumber( candidate.votes ),
			'</td>'
		);
	}

	var odd;
	document.write(
		'<table cellspacing="0">',
			'<tr>',
				'<td>',
				'</td>',
				'<td class="party" colspan="2">',
					'Democratic',
				'</td>',
				'<td class="party" colspan="2">',
					'Republican',
				'</td>',
			'</tr>',
			states.map( function( state ) {
				if( ! state.results ) return '';
				odd = ! odd;
				return S(
					'<tr class="', odd ? 'odd' : 'even', '">',
						'<td class="state" rowspan="2">',
							state.abbr.toUpperCase(), '&nbsp;',
						'</td>',
						col( state, 'democrat' ),
						col( state, 'republican' ),
					'</tr>',
					'<tr class="', odd ? 'odd' : 'even', '">',
						col( state, 'democrat', true ),
						col( state, 'republican', true ),
					'</tr>'
				);
			}).join(''),
		'</table>'
	);
	
})();

document.write(
	'<div>',
		'<a href="http://maps.google.com/decision2008">',
			'Complete results and election map',
		'</a>',
	'</div>'
);

