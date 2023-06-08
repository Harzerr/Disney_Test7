package entity;

public class MyEntity {
    private float avg;
    private String msg;//标注是学生还是课程
    private String classname;

    public MyEntity() {
    }

    public MyEntity(float avg, String msg, String classname) {
        this.avg = avg;
        this.msg = msg;
        this.classname = classname;
    }

    public float getAvg() {
        return avg;
    }

    public void setAvg(float avg) {
        this.avg = avg;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getClassname() {
        return classname;
    }

    public void setClassname(String classname) {
        this.classname = classname;
    }
}
