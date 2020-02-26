var audios=document.getElementById('player')
var parcent=document.getElementById('parcent')
var progress=document.getElementsByClassName('progress')[0]

var getparcent=function(){
	return audios.currentTime/audios.duration
}
var setparcent=function(p){
	parcent.style.width=p*1000+'px'
}
var pause=function(){
	player.pause()
}

var bofangs=function(){
	player.play()
	
}

audios.addEventListener('timeupdate',function(){
	var percent=getparcent()
	setparcent(percent)
})
progress.addEventListener('click',function(res){
//	console.log(res.pageX)
	var length=res.pageX
	var parcent=length/1000
	audios.currentTime=parseInt(parcent*audios.duration)
//	console.log(audios.currentTime)
	if(audios.currentTime==audios.duration)
	{
		player.play()
	}
	
})
var body=document.getElementsByTagName('body')[0]
body.addEventListener('click',function(){
	if(jianyan=1){
		hideSearch()
	}
	
	
})

var volume=document.getElementById('volume')
var yinliang
document.onkeydown=function(event){
	var e=event||window.event||arguments.callee.caller.arguments[0];
	yinliang=volume.value

//	console.log(yinliang)
	if(e&&e.keyCode==38){
		
		yinliang=parseInt(yinliang)+1
		
		volume.value=yinliang
		var v=parseInt(volume.value) / 100
		player.volume=v
//		console.log(volume.value)
		
	}
	if(e&&e.keyCode==40){
		yinliang=parseInt(yinliang)-1
		volume.value=yinliang
		var v=parseInt(volume.value) / 100
		player.volume=v
	}
}
var nextbofangarr=[]

var nowbofangarr=[]
var nextbofang=function(){
    for(var i=0;i<nextbofangarr.length;i++)
    {
    	var zz=parseInt(nextbofangarr[i])
    	getsongsurl(zz, function(res) {
		initPlayer(res)
		player.play()
		hideSearch()

	})
	getsongslrc(zz, function(res) {
		fillLrc(parseLrc(res))
	})
    	
    	
    	console.log(nextbofangarr[i])
    }
}
player.addEventListener('timeupdate',function(){
//	console.log(player.currentTime)
//	console.log(player.duration)
	if(player.currentTime==player.duration)
	{
		nextbofang()
		if(nextbofangarr==[])
		{
			play()
		}
	}

})
var bofangliebiao=document.getElementById('bofangliebiao')
var cc=0
var tianjiawrap=document.getElementsByClassName('tianjia-wrap')[0]

bofangliebiao.addEventListener('click',function(){
	cc=cc+1
	if(cc%2==0)
	{
		tianjiawrap.className='tianjia-wrap'
	}
	else{
		tianjiawrap.className='tianjia-wrap active'
	}
		bofangliebiaoo()
})