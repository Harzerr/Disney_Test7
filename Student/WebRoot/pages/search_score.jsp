<%@ page contentType="text/html; charset=utf-8" language="java"
	import="java.sql.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>search page</title>
		<link href="../css/search.css" rel="stylesheet" type="text/css" />
		<script src="../js/jquery-1.8.3.min.js" type="text/javascript">
</script>
		<script src="../js/search_score.js" type="text/javascript">
</script>
		<script src="../js/search.js" type="text/javascript">
</script>
	</head>
	<body>
		<center>
			<div class="window">
				<div class="searchbox tit">
					查找成绩：
					<select id="search_type">
						<c:choose>
							<c:when test="${sessionScope.log_operator.role.id == 3}">
								<option value="stu_all">
									查找全部
								</option>
								<option value="sub_name">
									科目名字
								</option>
								<option value="tec_name">
									科任教师
								</option>
							</c:when>
							<c:otherwise>
								<option value="stu_all">
									查找全部
								</option>
								<option value="stu_no">
									学生学号
								</option>
								<option value="stu_name">
									学生名字
								</option>
								<option value="sub_name">
									科目名字
								</option>
								<option value="cla_name">
									班级名字
								</option>
							</c:otherwise>
						</c:choose>
					</select>
					<input id="value" type="text" style="width: 200px; height: 20px;" />
					<input id="search_score" type="button" value="  查询  " />
				</div>
			</div>
		</center>
		<center id="center">
			<table id="table" width="740" border="1px" cellspacing="0"
				cellpadding="5" bordercolor="#999999">
				<tr align="center">
					<td width="60">
						编号
					</td>
					<td width="60">
						学号
					</td>
					<td width="80">
						姓名
					</td>
					<td width="100">
						科目
					</td>
					<td width="80">
						平时分
					</td>
					<td width="80">
						考试分
					</td>
					<td width="80">
						总分
					</td>
					<td width="100">
						编辑
					</td>
				</tr>
			</table>
			
		</center>

		<div class="average-wrap">
			<p class="my-title"></p>
			<table id="average-table" style="width: 100%;" border="1" cellspacing="0">

			</table>
			<p class="my-warning" style="color: red;font-size: 12px;margin: 20px auto;"></p>
			<canvas id="main-canvas">您的浏览器不支持canvas画布，请使用谷歌浏览器</canvas>
			<canvas id="sub-canvas">您的浏览器不支持canvas画布，请使用谷歌浏览器</canvas>
		</div>
		<div class="proportion-wrap">

		</div>
	</body>
</html>