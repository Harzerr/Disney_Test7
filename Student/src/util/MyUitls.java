package util;

import entity.MyEntity;
import entity.Score;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class MyUitls {
    public static List<MyEntity> getAverage(int roleId, String value){
        List<MyEntity> results = null;
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection = DB.getConn();
            String sql = "";
            if (roleId == 1){
                sql = "select avg(sco_count) as avg, `subject`.sub_name as msg, classes.cla_name as classname from \n" +
                        "score,`subject`,classes where `subject`.sub_id = score.sub_id and classes.cla_id = score.cla_id GROUP BY score.sub_id,score.cla_id;";
                preparedStatement = connection.prepareStatement(sql);
            }else if (roleId == 2){
                sql = "select avg(sco_count) as avg, `subject`.sub_name as msg, classes.cla_name as classname from \n" +
                        "score,`subject`,classes where `subject`.sub_id = score.sub_id and classes.cla_id = score.cla_id and classes.cla_id = (select classes.cla_id from classes where classes.cla_tec = ?) GROUP BY score.sub_id,score.cla_id;";
                preparedStatement = connection.prepareStatement(sql);
                preparedStatement.setString(1, value);
            }else if(roleId == 3){
                sql = "select avg(sco_count) as avg, `student`.stu_name as msg, classes.cla_name as classname from \n" +
                        "score,student,classes where score.stu_id = student.stu_id and score.cla_id = student.cla_id and score.stu_id = ? and classes.cla_name = (select classes.cla_name from classes where classes.cla_id = (select student.cla_id from student where student.stu_id\n" +
                        "= ?));";
                preparedStatement = connection.prepareStatement(sql);
                preparedStatement.setString(1, value);
                preparedStatement.setString(2, value);
            }

            resultSet = preparedStatement.executeQuery();
            results = new ArrayList<>();
            while (resultSet.next()){
                float avg = resultSet.getFloat("avg");
                String msg = resultSet.getString("msg");
                String classname = resultSet.getString("classname");
                MyEntity myEntity = new MyEntity(avg, msg, classname);
                results.add(myEntity);
            }
            return results;
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            DB.close(connection, preparedStatement, resultSet);
        }

        return null;
    }
}
