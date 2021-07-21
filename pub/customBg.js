var targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 10);

var cokis = document.cookie
	.split(';')
	.map(cookie => cookie.split('='))
	.reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

if (cokis.img) {
	document.body.style.backgroundImage = `url(${cokis.img})`
}
function revlbgpkr() {
	$("#pic-lnk-inp").toggle()
	$("#aply").toggle()
	$("#cusBgBtn").toggle()
	document.getElementById("pic-lnk-inp").style.width = "300px"
}
function apply() {
	$("#pic-lnk-inp").toggle()
	$("#aply").toggle()
	$("#cusBgBtn").toggle()
	document.body.style.backgroundImage = `url(${$('#pic-lnk-inp').val()})`
	document.cookie=`img=${$('#pic-lnk-inp').val()}; expires=${targetDate}`
}
// https://images.chesscomfiles.com/uploads/v1/theme/101411-0.2d687d92.jpg