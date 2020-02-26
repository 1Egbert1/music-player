var get = function(url, data, callback) {
	var xhr = new XMLHttpRequest()
	var p = '?'
	for(var key in data) {
		var value = data[key]
		p += key + '=' + value + '&'
	}
	p = p.slice(0, p.length - 1)
	xhr.open('GET', url + p, true)
	xhr.send()
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 & xhr.status == 200) {
			if(typeof callback == 'function') {
				callback(JSON.parse(xhr.response))
			}
		}
	}
}
var zzz=[]
var search = function(keywords, callback) {
	get('http://localhost:3000/search', {
		keywords: keywords
	}, function(res) {
		if(callback) {
			callback(res.result.songs)
			
						console.log(res.result.songs)
           zzz.push(res.result.songs)
		}
	})
}
var getsongsurl = function(id, callback) {
	get('http://localhost:3000/music/url', {
		id: id
	}, function(res) {
		if(callback) {
			callback(res.data[0].url)
			if(res.data[0].url=='')
			{
				callback('无歌词')
			}
		}
	})
}

var qingkonglrc=function(){
var c=''
fillLrc(c)
}
var initPlayer = function(url) {
	
	if(url==''||url==undefined)
	{
		url='无歌词'
	}
	player.src = url
}
var player = document.getElementById('player')

var play = function(id) {
	getsongsurl(id, function(res) {
		
		initPlayer(res)
		player.play()
		hideSearch()

	})
	getsongslrc(id, function(res) {
		fillLrc(parseLrc(res))
		
	})
	

}
var plays=function(id){
	getsongsurl(id,function(res){
		initPlayer(res)
		player.play()
	})
	getsongslrc(id,function(res){
		fillLrc(parseLrc(res))
	})
}
