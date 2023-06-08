package dao;

import java.util.List;
import entity.Classes;

public interface IClasses
{
	// 添加
    Classes add(Classes classes);

	// 删除
    void delete(Classes classes);

	// 更新
    void update(Classes classes);

	// 普通查询
    List<Classes> query(String type, String value);

	// 分页查询
    List<Classes> query(String type, String value, int currentPage);

	// 获取总页数
    int getCountPage(String type, String value);

}
