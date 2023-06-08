package score.servlet;

import com.alibaba.fastjson.JSON;
import entity.MyEntity;
import entity.Operator;
import entity.Student;
import entity.Teacher;
import impl.Cla2SubImpl;
import impl.StudentImpl;
import impl.TeacherImpl;
import util.MyUitls;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/GetAverage")
public class GetAverage extends HttpServlet {
    public GetAverage() {
        super();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");
        TeacherImpl teacherImpl = new TeacherImpl();
        StudentImpl studentImpl = new StudentImpl();
        Operator operator = (Operator) req.getSession().getAttribute("log_operator");
        int ope_rol_id = operator.getRole().getId();
        List<MyEntity> average = new ArrayList<>();
        if (ope_rol_id == 1){//管理员查询所有的
            average = MyUitls.getAverage(ope_rol_id, null);
        }else if(ope_rol_id == 2) { //老师查询自己班的
            Teacher teacher = teacherImpl.query("ope_id", operator.getId() + "").get(0);
            if (teacher != null){
                average = MyUitls.getAverage(ope_rol_id, teacher.getName());
            }
        }else if(ope_rol_id == 3) { //学生查询自己所有学科的平均成绩
            Student student = studentImpl.query("ope_id", operator.getId() + "").get(0);
            if (student != null){
                average = MyUitls.getAverage(ope_rol_id, String.valueOf(student.getId()));
            }
        }

        PrintWriter printWriter = resp.getWriter();

        String result = JSON.toJSONString(average);
        printWriter.write(result);

        printWriter.flush();
        printWriter.close();

    }
}
