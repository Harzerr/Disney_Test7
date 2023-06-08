package dao;

import java.util.List;
import entity.Major;

public interface IMajor
{
	// 添加
    int add(Major major);

	// 删除
    void delete(Major major);

	// 更新
    void update(Major major);

	// 普通查询
    List<Major> query(String type, String value);

	// 分页查询
    List<Major> query(String type, String value, int currentPage);

	// 获取总页数
    int getCountPage(String type, String value);

}
