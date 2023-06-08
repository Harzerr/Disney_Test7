package dao;

import java.util.List;

import entity.Operator;

public interface IOperator
{
	// 添加
    Operator add(Operator operator);

	// 删除
    void delete(Operator operator);

	// 更新
    void update(Operator operator);

	// 普通查询
    List<Operator> query(String type, String value);

	// 分页查询
    List<Operator> query(String type, String value, int currentPage);

	// 获取总页数
    int getCountPage(String type, String value);

}
