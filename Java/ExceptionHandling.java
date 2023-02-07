package Java;

public class ExceptionHandling {
    public static void main(String args[]){
        try{
            throwsException();
        } catch(Exception e){
            System.out.println("Exception occured:");
            e.printStackTrace();
        }
    }
    public static void throwsException () throws Exception {
        System.out.println("Sub Exception is throwing");
        throwsSubException();
    }
    public static void throwsSubException () throws Exception {
        System.out.println("New Exception is throwing");
        throw new Exception();
    }
}
