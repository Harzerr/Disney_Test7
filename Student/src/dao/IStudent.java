package dao;

import java.util.List;

import entity.Student;

public interface IStudent
{
	// 添加
    int add(Student student);

	// 删除
    void delete(Student student);

	// 更新
    void update(Student student);

	// 查询
    List<Student> query(String type, String value);

	// 分页查询
    List<Student> query(String type, String value, int currentPage);

	// 获取总页数
    int getCountPage(String type, String value);

}