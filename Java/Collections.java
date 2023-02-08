import java.util.*;

public class Collections {
    public static void main(String args[])
    {
        Map<String, Integer> map = new HashMap<>();
        map.put("Shad", 10);
        map.put("Sachin", 30);
        map.put("Vaibhav", 20);
        for (Map.Entry<String, Integer> e : map.entrySet())
            System.out.println(e.getKey() + " " + e.getValue());
    }
}
