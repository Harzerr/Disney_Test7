package dao;

import java.util.List;

import entity.Score;

public interface IScore
{
	// 添加
    void add(Score score);

	// 删除
    void delete(Score score);

	// 更新
    void update(Score score);

	// 普通查询
    List<Score> query(String type, String value);

	// 分页查询
    List<Score> query(String type, String value, int currentPage);

	// 获取总页数
    int getCountPage(String type, String value);

}
