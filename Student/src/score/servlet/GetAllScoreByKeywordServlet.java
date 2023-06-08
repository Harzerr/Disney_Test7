package score.servlet;

import com.alibaba.fastjson.JSON;
import entity.Operator;
import entity.Score;
import entity.Student;
import entity.Teacher;
import impl.ScoreImpl;
import impl.StudentImpl;
import impl.TeacherImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("/GetAllScoreByKeywordServlet")
public class GetAllScoreByKeywordServlet extends HttpServlet {
    public GetAllScoreByKeywordServlet() {
        super();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/json;charset=utf-8");
        List<Score> list_score = null;
        StudentImpl studentImpl = new StudentImpl();
        TeacherImpl teacherImpl = new TeacherImpl();
        ScoreImpl scoreImpl = new ScoreImpl();

        Operator operator = (Operator) req.getSession().getAttribute("log_operator");
        int ope_rol_id = operator.getRole().getId();

        if (ope_rol_id == 1){
            list_score = scoreImpl.query("all", null);
        }else if (ope_rol_id == 2){
            Teacher teacher = teacherImpl.query("ope_id", operator.getId() + "").get(0);
            list_score = scoreImpl.query("tec_stu_all", teacher.getName());
        }else if (ope_rol_id == 3){
            Student student = studentImpl.query("ope_id", operator.getId() + "").get(0);
            list_score = scoreImpl.query("stu_all", String.valueOf(student.getId()));
        }

        PrintWriter printWriter = resp.getWriter();

        String result = JSON.toJSONString(list_score);
        printWriter.write(result);
        printWriter.flush();
        printWriter.close();
    }
}
