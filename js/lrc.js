var getsongslrc = function(id, callback) {
	get('http://localhost:3000/lyric', {
		id: id
	}, function(res) {
		if(callback) {
			
			if(res.lrc.lyric==''||res.lrc.lyric==undefined)
			{
				callback('无歌词')
			}
			callback(res.lrc.lyric)
			console.log(res)
		}
	})
}

var parseLrc = function(lrcstring) {
	var parsetime = function(timestring) {

		
		var timestringarr = timestring.split(':')
		var min = parseInt(timestringarr[0])
		var seconds = parseInt(timestringarr[1])
		var times = (min * 60 + seconds) * 1000
		return parseInt(times)
	}
	
	var lrcStringarr = lrcstring.split('\n')
//console.log(lrcStringarr)
	var lrcObjarr = []
	for(var i = 0; i < lrcStringarr.length; i++) {
		var line = lrcStringarr[i].split(']')
//		console.log(line)

		var time = parsetime(line[0].slice(1, line[0].length))
//		console.log(time)
		var content = line[1]
		 if(content == undefined || isNaN(time)) continue
		lrcObjarr.push({
			time: time,
			content: content
		})
	}
	
	return lrcObjarr
	
}

var index = 0
var marginTop = 240
var nowLrcObjeArr = []
var lrcItems = null
var resetLrc = function() {
	index = 0
	marginTop = 240
}
var compareLrc = function() {
	
	if(nowLrcObjeArr[index].time - player.currentTime * 1000 < 300) {
	
		lrcItems[index].style.color = 'red'
		lrcItems[index].style.fontSize = '1.2em'
		marginTop -= 20
		lrcWrap.style.marginTop = marginTop + 'px'
		if(index - 1 > -1) {
			lrcItems[index - 1].style.color = ''
			lrcItems[index - 1].style.fontSize = '1em'
		}
		index++
	}
}
player.addEventListener('timeupdate', function() {
	compareLrc()
})

var lrcTpl = '<li class="lrc-item">{%content%}</li>'
var lrcWrap = document.getElementById('lrc')
var fillLrc = function(lrcObjArr) {
	var html = ''
	for(var i = 0; i < lrcObjArr.length; i++) {
		html += lrcTpl.replace('{%content%}', lrcObjArr[i].content)
	}
	lrcWrap.innerHTML = html
	
	nowLrcObjeArr = lrcObjArr
	lrcItems = document.getElementsByClassName('lrc-item')
}
