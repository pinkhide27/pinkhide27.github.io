const CANVASSIZE = 600;

let R = CANVASSIZE/2;

let time, hour, minute, second;

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = CANVASSIZE;
canvas.height = CANVASSIZE;


draw();

function draw(){
	time = new Date();
	hour = time.getHours();
	minute = time.getMinutes();
	second = time.getSeconds();
	drawClockCircle();
	drawNumbers();
	drawMarks();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawCenter();
	setTimeout(()=>{
		context.clearRect(0, 0, canvas.width, canvas.height);
		draw();
	},1000);
}

function drawClockCircle(){
	let lineWidth = 10;
	context.save();
	context.translate(R, R);
	context.lineWidth = lineWidth;
	context.beginPath();
	context.arc(0, 0, R - lineWidth/2, 0, 2*Math.PI);
	context.stroke();
	context.restore();
}
function drawNumbers(){
	let numbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
	let numR = CANVASSIZE/2*80/100;
	context.save();
	context.translate(R, R);
	context.beginPath();
	context.font = 'bold 30px Arail';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	numbers.forEach((item, index)=>{
		context.fillText(item, numR * Math.cos(2*Math.PI/12*index), numR * Math.sin(2*Math.PI/12*index));
	});
	context.restore();
}
function drawMarks(){
	let markR = CANVASSIZE/2*90/100;
	context.save();
	context.translate(R, R);
	for(let i = 0;i<60;i++){
		context.beginPath();
		context.arc(markR * Math.cos(2*Math.PI/60*i), markR * Math.sin(2*Math.PI/60*i), 2, 0, 2*Math.PI);
		if(i % 5 == 0){
			context.fillStyle = '#000';
		} else {
			context.fillStyle = '#ccc';
		}
		context.closePath();
		context.fill();
	}
	
	context.restore();
}
function drawHour(hour, minute){
	let hourLen = CANVASSIZE/2*55/100;
	let rad = 2*Math.PI / 12 * hour + 2*Math.PI / 12 / 60 * minute;
	context.save();
	context.translate(R, R);
	context.rotate(rad);
	context.beginPath();
	context.lineCap = 'round';
	context.strokeStyle = '#333';
	context.lineWidth = 8;
	context.moveTo(0, 15);
	context.lineTo(0, -hourLen);
	context.stroke();
	context.restore();
}
function drawMinute(minute){
	let minuteLen = CANVASSIZE/2*66/100;
	let rad = 2*Math.PI / 60 * minute;
	context.save();
	context.translate(R, R);
	context.rotate(rad);
	context.beginPath();
	context.lineCap = 'round';
	context.strokeStyle = '#ccc';
	context.lineWidth = 4;
	context.moveTo(0, 15);
	context.lineTo(0, -minuteLen);
	context.stroke();
	context.restore();
}
function drawSecond(second){
	let secondLen = CANVASSIZE/2*75/100;
	let rad = 2*Math.PI / 60 * second;
	context.save();
	context.translate(R, R);
	context.rotate(rad);
	context.beginPath();
	context.lineCap = 'round';
	context.strokeStyle = 'red';
	context.lineWidth = 2;
	context.moveTo(0, 18);
	context.lineTo(0, -secondLen);
	context.stroke();
	context.restore();
}
function drawCenter(){
	context.save();
	context.translate(R, R);
	context.beginPath();
	context.fillStyle = '#fff';
	context.arc(0, 0, 4, 0, 2*Math.PI);
	context.fill();
	context.restore();
}