package dao;

import java.util.List;

import entity.Role;

public interface IRole
{
	// 添加
    void add(Role role);

	// 删除
    void delete(Role role);

	// 更新
    void update(Role role);

	// 普通查询
    List<Role> query(String type, String value);

	// 分页查询
    List<Role> query(String type, String value, int currentPage);

	// 获取总页数
    int getCountPage(String type, String value);

}
