var searchTpl = '<li class="search-result-item" data-id={%id%}>' +
	'<p><strong>{%geming%}</strong></p>' +
	'<p>{%geshou%} - 《{%zhuanji%}》</p>' +
	'</li> ' +
	'<img src="img/添加.png" class="tianjia" data-id={%tianjia%} data-name={%name%} data-song={%datasongs%}/>'

var searchButoton = document.getElementById('search-button')
var searchInput = document.getElementById('search')
var bo = []
var searchResultList = document.getElementById('search-result-list')
var zanting = document.getElementById('zanting')
var bofang = document.getElementById('bofang')
var z = 0
var urll = []
var xiayishou = document.getElementById('xiayishou')
var shangyishou = document.getElementById('shangyishou')
var d = document.getElementsByClassName('search-result-item')
var now
var addEventListener = function() {

	for(var i = 0; i < d.length; i++) {
		d[i].addEventListener('click', function() {
			now = parseInt(this.getAttribute('data-id'))
			play(parseInt(this.getAttribute('data-id')))
			zanting.style.display = 'block'
			bofang.style.display = 'none'
			initPlayer(urll[i])

		})
	}

}
var tianjia = document.getElementsByClassName('tianjia')
var z = 0

var getnow = function() {
	for(var i = 0; i < d.length; i++) {
		d[i].addEventListener('click', function() {
			nowbofangarr.push(this.getAttribute('data-id'))
			console.log(this.getAttribute('data-id'))

		})

	}
	for(var i = 0; i < tianjia.length; i++) {
		tianjia[i].addEventListener('click', function() {

			var c = this.getAttribute('data-id')
			var d = this.getAttribute('data-name')
			var e = this.getAttribute('data-song')
			nextbofangarr.push(c)
			var de = d + '+' + e
			console.log(de)
			bo.push(de)
			showSearch()
		})
	}
}

var tianjiatpl = '<li class="tianjia-wrap-list">{%geming%}</li>'
var tianjiawrapli = document.getElementsByClassName('tianjia-wrap-li')[0]
var bofangliebiaoo = function() {
	var html = ''
	for(var i = 0; i < bo.length; i++) {
		html += tianjiatpl.replace('{%geming%}', bo[i])
	}
	tianjiawrapli.innerHTML = html

}
var c = 0
var nowx=function(){
	
	for(var i = 0; i < urll.length; i++) {
	
	if(urll[i] == now) {
		 var indexx = i
	}
}
	return indexx
	console.log(indexx)
}

xiayishou.addEventListener('click', function() {
	nowx()
     var x=nowx()
	x=x + 1
	console.log(nowx())
	

	if(x>= urll.length + 1) {
		x = 0
	} else {
		play(urll[x+1])
	}

})

shangyishou.addEventListener('click', function() {
	var indexx=nowx()
	c = indexx - 1
	if(c <= -1) {
		c = urll.length
	} else {
		play(urll[c])
	}

})
zanting.addEventListener('click', function() {

	zanting.style.display = 'none'
	bofang.style.display = 'block'
	pause()
})
bofang.addEventListener('click', function() {
	bofang.style.display = 'none'
	zanting.style.display = 'block'
	bofangs()
})

var fillSeachResult = function(res) {
	var html = ''
	for(var i = 0; i < res.length; i++) {
		html += searchTpl.replace('{%geming%}', res[i].name)
			.replace('{%geshou%}', res[i].artists[0].name)
			.replace('{%zhuanji%}', res[i].album.name)
			.replace('{%id%}', res[i].id)
			.replace('{%tianjia%}', res[i].id)
			.replace('{%name%}', res[i].artists[0].name)
			.replace('{%datasongs%}', res[i].album.name)
		urll[i] = res[i].id

	}

	searchResultList.innerHTML = html
	addEventListener()
	getnow()
	showSearch()
	//  console.log(res[i].id)
}

searchButoton.addEventListener('click', function() {
	var keywods = searchInput.value
	search(keywods, function(res) {

		fillSeachResult(res)
	})
})

var searchResultWrap = document.getElementsByClassName('search-result-wrap')[0]
var jianyan
var showSearch = function() {
	searchResultWrap.className = 'search-result-wrap active'
	jianyan=1
}
var hideSearch = function() {
	searchResultWrap.className = 'search-result-wrap'
}