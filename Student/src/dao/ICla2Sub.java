package dao;

import java.util.List;

import entity.Cla2Sub;

public interface ICla2Sub
{
	// 添加
    int add(Cla2Sub cla2Sub);

	// 删除
    void delete(Cla2Sub cla2Sub);

	// 更新
    void update(Cla2Sub cla2Sub);

	// 普通查询
    List<Cla2Sub> query(String type, String value);

	// 分页查询
    List<Cla2Sub> query(String type, String value, int currentPage);

	// 获取总页数
    int getCountPage(String type, String value);

}
