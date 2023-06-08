package dao;

import java.util.List;

import entity.Privilege;

public interface IPrivilege
{
	// 添加
    void add(Privilege privilege);

	// 删除
    void delete(Privilege privilege);

	// 更新
    void update(Privilege privilege);

	// 普通查询
    List<Privilege> query(String type, String value);

	// 分页查询
    List<Privilege> query(String type, String value, int currentPage);

	// 获取总页数
    int getCountPage(String type, String value);

}
