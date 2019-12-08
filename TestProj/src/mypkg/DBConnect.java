package mypkg;

// // You have successfully created a new database. The details are below.

// // Username:        Ka0DIDZ1ZH
// // Database name:   Ka0DIDZ1ZH
// // Password:        knebP1SC7m
// // Server:          remotemysql.com
// // Port:            3306

// // These are the username and password to log in to your database and phpMyAdmin
import java.util.*;
import java.io.*;
import java.lang.*;
import java.text.*;
import java.sql.*;  
public class DBConnect{  

    private Connection conn;
    private Statement st;
    private ResultSet rs;

    public DBConnect(){
        try{
//            String driver = "com.mysql.jdbc.Driver";
//            String url = "jdbc:mysql://remotemysql.com:3306/Ka0DIDZ1ZH";
//            String username = "Ka0DIDZ1ZH";
//            String password = "knebP1SC7m";            
            //String driver = "com.mysql.jdbc.Driver";

            conn = DriverManager.getConnection(url,username,password);  
            st = conn.createStatement();   
        }catch(Exception e){ 
            System.out.println(e);
            e.printStackTrace();
        }
    }  
    // Show DBs
    public void showDataBases() throws SQLException{
        try{
            ResultSet rs = st.executeQuery("SHOW DATABASES;");
            if (st.execute("SHOW DATABASES;")) {
                rs = st.getResultSet();
            }
            while (rs.next()) {
                System.out.println(rs.getString("Database"));
            }
        }catch(SQLException e){
            System.out.println(e); 
            e.printStackTrace();
        }finally{
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) { 
                    System.out.println(e); 
                    e.printStackTrace();
                }
            }
        }
    }   
    // Show tables
    public void showTables() throws SQLException{
        try {
            DatabaseMetaData databaseMetaData = conn.getMetaData();
            ResultSet rs = databaseMetaData.getTables(null, null, null,new String[] {"TABLE"});
            while (rs.next()) {
                System.out.println(rs.getString("TABLE_NAME"));
            }
        }catch(SQLException e){
            System.out.println(e); 
            e.printStackTrace();
        }finally{
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) { 
                    System.out.println(e); 
                    e.printStackTrace();
                }
            }
        }
    } 
    
    // Number of rows
    public int getRowNums() throws Exception, SQLException{
        int i=0;
    	try(ResultSet rs = st.executeQuery("SELECT * FROM Users")){     
            while(rs.next()){ 
               i++;
            }
        }catch(SQLException e){
            System.out.println(e); 
            e.printStackTrace();
        }finally{
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) { 
                    System.out.println(e); 
                    e.printStackTrace();
                }
            }
        }
        return i;
    }
    
    // SELECT * FROM table
    public String[][] getData(int a) throws Exception, SQLException{
    	String id = "";
    	String firstName = "";
        String lastName = "";
        String date = "";
        String [][] s = new String[this.getRowNums()][4];
        
        try(ResultSet rs = st.executeQuery("SELECT * FROM Users WHERE id = " + a)){
            
            int ii = 0;
            	while(rs.next()){ 
                	id = rs.getString("id");
                    firstName = rs.getString("firstName");
                    lastName = rs.getString("lastName");
                    date = rs.getString("reg_date");
                    s[ii][0] = id;
                    s[ii][1] = firstName;
                    s[ii][2] = lastName;
                    s[ii][3] = date;
                	ii++;
                }
            
        }
        catch(SQLException e){
            System.out.println(e); 
            e.printStackTrace();
        }finally{
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) { 
                    System.out.println(e); 
                    e.printStackTrace();
                }
            }
        }
        return s;
    }
}

