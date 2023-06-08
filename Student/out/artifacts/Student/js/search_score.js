// 全局变量，总页数，当前页数
var countPages = 1;
var currentPage = 1;
var roleId;
var canvasWidth = 740;
var canvasHeight = 340;
var canvas = null;
var ctx = null;
var padding = 30;
var paragraph = 50;
var event = "";
var mouseX = 0;
var mouseY = 0;

var arccanvas = null;
var arcctx = null;


// 获取所有的成绩信息用于绘制整体的柱状图
/**
 * 传入一个canvas和数据数组，用来绘制柱状统计图
 * @param canvas {Object}
 * @param arr {Array}
 */
function myMain(canvas, arr){
	if (canvas != null){
		draw(arr);
		calProportion(arr);
		canvas.addEventListener("mousemove", function (e){
			mouseX = e.offsetX;
			mouseY = e.offsetY;
			event = "mousemove";
			draw(arr);
		});
		canvas.addEventListener("click", function (e){
			mouseX = e.offsetX;
			mouseY = e.offsetY;
			event = "click";
			draw(arr);
		});
	}
}
/**
 * 绘制函数
 * @param arr {Array}
 */
function draw(arr){
	initCanvas(canvas);
	ctx.restore();
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	let spacing = parseInt((canvasWidth - padding - padding/2) / arr.length);
	let w = spacing/3;
	if (w >= 50){
		w = 50;
	}else if(w <= 10){
		w = 10;
	}
	if (spacing <= 10){
		spacing = 10;
	}
	let scoreViewH = 5*paragraph;
	let proportion = scoreViewH / 100;
	let maxY = canvasHeight - padding - scoreViewH;
	// 遍历arr绘制图形
	for (let i = 0; i < arr.length; i++){
		ctx.beginPath();
		let score = arr[i].count;
		let stuno = arr[i].student.no;
		let subjectname = arr[i].subject.name;
		let classname = arr[i].student.classes.name;
		let stuname = arr[i].student.name;
		let x = spacing*i + spacing/2;
		let h = score*proportion;
		if (h <= 5){
			h = 5;
		}
		let y = (canvasHeight - padding) - h;
		ctx.rect(padding+x, y, w, h);
		ctx.fill();
		ctx.fillText(stuno, padding+x+w/2, canvasHeight - padding + padding/2);
		ctx.fillText(score, padding+x+w/2, y - 5);
		ctx.fillText(subjectname, padding+x+w/2, y - 20);
		ctx.stroke();
		ctx.closePath();
		if (ctx.isPointInPath(mouseX, mouseY)){
			if (event == "click"){
				alert("课程："+subjectname+"\n"+"分数："+score+"\n"+"学号："+stuno+"\n"+"班级："+classname+"\n"+"姓名："+stuname);
			}else {
				ctx.fillStyle = "orange";
				ctx.fill();
				canvas.style.cursor = "pointer";
			}
		}
		ctx.fillStyle = "#4D4D4D";
	}
	ctx.save();
}

/**
 * 分数段分为5段
 * 0-20 对应数组0
 * 20-40 对应数组1
 * 40-60 对应数组2
 * 60-80 对应数组3
 * 80-100 对应数组4
 * @type {*[]}
 */
var scoreParagraphProportion = [0, 0, 0, 0, 0];
var scoreParagraph = ["0-20", "20-40", "40-60", "60-80", "80-100"];
var total = 0;
var percentObjs = [];
function calProportion(arr){
	let proportionWrapDom = document.getElementsByClassName("proportion-wrap")[0];
	proportionWrapDom.innerHTML = "";
	let str = "<h3>各分段占比：</h3>";
	for (let i = 0; i < arr.length; i++){
		let score = arr[i].count;
		if (score <= 20){
			scoreParagraphProportion[0] += 1;
		}else if (score <= 40){
			scoreParagraphProportion[1] += 1;
		}else if (score <= 60){
			scoreParagraphProportion[2] += 1;
		}else if (score <= 80){
			scoreParagraphProportion[3] += 1;
		}else if (score <= 100){
			scoreParagraphProportion[4] += 1;
		}
		total += 1;
	}
	percentObjs = [];
	for(let i = 0; i < scoreParagraphProportion.length; i++){
		let p = parseFloat(parseFloat(scoreParagraphProportion[i]/total).toFixed(2));
		let percent = p*100 + "%";
		if (roleId == 3){
			str += "<p class='score-percent'>其中"+scoreParagraph[i]+"分占："+percent+"</p>";
		}else {
			str += "<p class='score-percent'>其中"+scoreParagraph[i]+"分占："+percent+" 共"+scoreParagraphProportion[i]+"项</p>";

		}
		percentObjs.push(p);
	}
	if (roleId != 3){
		str += "<p class='score-percent'>共"+total+"项</p>";
	}
	proportionWrapDom.innerHTML = str;
	initArcCanvas(percentObjs);
}

/**
 * 创建扇形图
 * @param canvas {Object}
 */
var MAX_HEIGHT_ARC = 400;
var MAX_WIDTH_ARC = 400;
function initArcCanvas(arr) {
	arccanvas.width =  MAX_WIDTH_ARC;
	arccanvas.height = MAX_HEIGHT_ARC;
	arcctx = arccanvas.getContext("2d");
	arcctx.clearRect(0,0, MAX_WIDTH_ARC, MAX_HEIGHT_ARC);
	let begin = 0;
	let end = 0;
	for (let i = 0; i < percentObjs.length; i++){
		let color = "rgb("+Math.random()*200+","+Math.random()*200+","+Math.random()*200+")";
		end = Math.PI*2*percentObjs[i];
		if (end != 0){
			arcctx.restore();
			arcctx.beginPath();
			arcctx.strokeStyle = "transparent";
			arcctx.arc(MAX_WIDTH_ARC/2, MAX_HEIGHT_ARC/2, MAX_WIDTH_ARC/2 - 10, begin, begin+end);
			arcctx.lineTo(MAX_WIDTH_ARC/2, MAX_HEIGHT_ARC/2);
			arcctx.fillStyle = color;
			arcctx.fill();
			arcctx.stroke()
			arcctx.closePath();
			arcctx.save();
			let angle = begin + end/2;
			let x = MAX_WIDTH_ARC/2 + MAX_WIDTH_ARC/3*(Math.cos(angle));
			let y = MAX_WIDTH_ARC/2 + MAX_WIDTH_ARC/3*(Math.sin(angle));
			if (percentObjs[i] >= 1){
				x = MAX_WIDTH_ARC/2;
				y = MAX_HEIGHT_ARC/2;
			}
			let text = "["+scoreParagraph[i]+"]："+percentObjs[i]*100+"%";
			arcctx.strokeStyle = "white";
			arcctx.fillStyle = "white";
			arcctx.textAlign = "center";
			arcctx.textBaseline = "center";
			arcctx.fillText(text, x, y);
			begin += end;
		}
	}
}
	/**
 * 初始化canvas画布
 * @param canvas {Object}
 */
function initCanvas(canvas){
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	canvas.style.cursor = "default";
	ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	ctx.beginPath();
	ctx.strokeStyle = "#4D4D4D";
	ctx.fillStyle = "#4D4D4D";
	// x坐标
	ctx.moveTo(padding, canvasHeight - padding);
	ctx.lineTo(canvasWidth, canvasHeight - padding);
	ctx.lineTo(canvasWidth - padding/2, canvasHeight - padding - padding/3);
	ctx.moveTo(canvasWidth, canvasHeight - padding);
	ctx.lineTo(canvasWidth - padding/2, canvasHeight - padding + padding/3);
	ctx.font = "12px 新宋体";
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	ctx.fillText("学号", canvasWidth - padding/2, canvasHeight - padding + padding/3 + padding/2);
	// y轴
	ctx.moveTo(padding, canvasHeight - padding);
	ctx.lineTo(padding, 0);
	ctx.lineTo(padding - padding/3, padding/2);
	ctx.moveTo(padding, 0);
	ctx.lineTo(padding + padding/3, padding/2);
	ctx.textAlign = "start";
	ctx.fillText("分数/课程（整体成绩柱状图）", padding + padding/3 + 5, padding/2);
	// 0点
	ctx.fillText("0", padding - 5, canvasHeight - padding + 5);
	// 分段
	ctx.textAlign = "center";
	ctx.textBaseline = "center";
	for(let i = 1; i <= 5; i++){
		let text = i * 20
		ctx.moveTo(padding, canvasHeight - padding - (paragraph*i));
		ctx.lineTo(padding - padding/3, canvasHeight - padding - (paragraph*i));
		ctx.fillText(text, padding - padding/1.5, canvasHeight - padding - (paragraph*i) + 5);
	}
	ctx.stroke();
	ctx.closePath();
	ctx.save();
}


function getAllScore(roleID){
	var url = "/Student/GetAllScoreByKeywordServlet";
	let warningDom = document.getElementsByClassName("my-warning")[0];
	$.ajax( {
		type : "get",
		url : url,
		async : true,//异步查询
		dataType : "json",
		success : function(rs) {
			if (rs != null || rs != undefined){
				myMain(canvas, rs);
				if (rs.length > 50){
					warningDom.innerHTML = "注：数据量过大，超出画布范围的数据不再展示";
				}
			}
		}
	});
}
// 查询平均分等信息
function getAverage(roleID){
	var url = "/Student/GetAverage";
	let table = document.getElementById("average-table");
	let title = document.getElementsByClassName("my-title")[0];

	$.ajax( {
		type : "get",
		url : url,
		async : true,//异步查询
		dataType : "json",
		success : function(rs) {
			if (rs != null ||　rs != undefined){
				table.innerHTML = "";
				let str = "";
				let titleStr = "";
				if(roleID == 3){
					titleStr += "<p class=\"title\">个人总体平均分：</p>";
					str += "<tr><td>CLASS</td><td>NAME</td><td>AVG</td></tr>";
				}else {
					titleStr += "<p class=\"title\">班级课程平均分：</p>";
					str += "<tr><td>CLASS</td><td>SUBJECT</td><td>AVG</td></tr>";
				}
				for(let i = 0; i < rs.length; i++){
					str += "<tr><td>"+rs[i].classname+"</td><td>"+rs[i].msg+"</td><td>"+rs[i].avg+"</td></tr>";
				}
				title.innerHTML = titleStr;
				table.innerHTML = str;
			}
		}
	});
}

// AJAX异步查询成绩
$(function() {
	$("#search_score").click(
			function() {
				canvas = document.getElementById("main-canvas");
				arccanvas = document.getElementById("sub-canvas");
				if ($("#search_type").val() != "stu_all"
						&& $.trim($("#value").val()) == "")
					alert("请输入关键字。");
				else {
					// 获取角色ID
					roleId = getRoleId();
					getAverage(roleId);
					getAllScore(roleId);
					// 查询总页数并赋值到全局变量中
					countPages = getCountPage();
					// 默认查询第一页数据
					showData(currentPage);
					// 根据当前页数构建分页按钮
					showPage(currentPage);
				}
			});
});

// 整体调用函数
function show(page) {
	showData(page);
	showPage(page);
}
// 根据条件查询数据，并显示分页查询数据
function showData(page) {
	var url = "";
	url += "/Student/SearchScoreServlet?search_type=" + $("#search_type").val();
	url += "&value=" + encodeURI(encodeURI($("#value").val())) + "&page="
			+ page;
	$.post(url, null, function(rs) {
		$("#table>tbody>tr").not(":first").remove();

		var str = "";
		for ( var i = 0; i < rs.length; i++) {
			str = "<tr class='change' align='center'>";
			str += "<td>" + (i + 1) + "</td>";
			str += "<td>" + rs[i].student.no + "</td>";
			str += "<td>" + rs[i].student.name + "</td>";
			str += "<td>" + rs[i].subject.name + "</td>";
			str += "<td>" + rs[i].daily + "</td>";
			str += "<td>" + rs[i].exam + "</td>";
			str += "<td>" + rs[i].count + "</td>";

			if (roleId == 2)
				str += "<td><a href='/Student/EditScoreServlet?sco_id="
						+ rs[i].id + "'>编辑</a></td>";
			else
				str += "<td>&nbsp;/ </td>";
			str += "</tr>";
			$("#table").append(str);
		}

	}, "json");
	
}

// 查询总页数,只返回一个总页数
function getCountPage() {
	var url = "", rt = "";
	url += "/Student/GetScoreCountPageServlet?search_type="
			+ $("#search_type").val();
	url += "&value=" + encodeURI(encodeURI($("#value").val()));
	$.ajax( {
		type : "post",
		url : url,
		async : false, // 设置成同步，不然回调函数无法按正确顺序执行
		dataType : "text",
		success : function(rs) {
			rt = rs;
		}
	});
	return rt;
}

// 构建分页按钮链接组件
function showPage(page) {
	$("#center>p,#center>br").remove();
	var str = "<br/><p>";

	if (page <= 1)
		str += "<a class='a_3'>上一页</a>";
	else
		str += "<a class='a_3' href='###' onclick='show("
				+ (page - 1) + ")'>上一页</a>";

	for ( var i = 1; i <= countPages; i++) {
		if (i == page)
			str += "<a class='a_4 select'>" + i + "</a>";
		else
			str += "<a class='a_4' href='###' onclick='show(" + i
					+ ")'>" + i + "</a>";
	}

	if (page >= countPages)
		str += "<a class='a_3'>下一页</a>";
	else
		str += "<a class='a_3' href='###' onclick='show("
				+ (page + 1) + ")'>下一页</a>";

	$("#center").append(str);
}

// 获取当前登录的用户的角色ID，用来判断是否提供修改链接
function getRoleId() {
	var rol_id;
	var url = "/Student/LoginServlet?type=get_rol_id";
	$.ajax( {
		type : "post",
		url : url,
		async : false,
		dataType : "text",
		success : function(rs) {
			rol_id = rs;
		}
	});
	return rol_id;
}
