// JavaScript Document
$(function() {
	
	//当添加数据成功后弹出提示框
	var message = $("#message").val();
	if (message != null) {
		alert(message);
	}

	// 实时查看个人图片,仅在IE6的渣渣中有效
	$("input[name=pic]").change(function() {
		// 获取选中的文件
		let file = this.files[0];
		if(file != undefined){//文件存在
			let fileType = file.type.substring(0, "image".length);
			if("image" == fileType){//类型是图片
				let src = URL.createObjectURL(file); // 创建本地blob路径
				let avatarDom = document.getElementById("user-avatar");
				avatarDom.src = src;
				console.log(src);
			}
		}
	});

	// 表格鼠标经过样式，动态添加的数据无法绑定，已失效
	$(".change").mouseover(function() {
		$(this).addClass("mouseover");
	}).mouseout(function() {
		$(this).removeClass("mouseover");
	});
});