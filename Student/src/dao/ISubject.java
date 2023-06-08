package dao;

import java.util.List;

import entity.Subject;

public interface ISubject
{
	// 添加
    int add(Subject subject);

	// 删除
    void delete(Subject subject);

	// 更新
    void update(Subject subject);

	// 查询
    List<Subject> query(String type, String value);

	// 分页查询
    List<Subject> query(String type, String value, int currentPage);

	// 获取总页数
    int getCountPage(String type, String value);

}
