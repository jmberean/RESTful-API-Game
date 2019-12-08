package mypkg;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;


public class ExcelRW {

    public static void main(String[] args) throws Exception, FileNotFoundException, IOException {
    	writeIntoExcel("birthdays.xls");
    }

    public static void writeIntoExcel(String file) throws Exception, FileNotFoundException, IOException{
        
        DBConnect db = new DBConnect();
        int a = 1;
        String s[][] = db.getData(a);    
        
        // Print results
        for(int k = 0; k < s.length; k++) {             
        	for(int x = 0; x < s[0].length; x++) {      
                    System.out.print(s[k][x] + " | ");    
            } System.out.println();
        }
        
    	Workbook book = new HSSFWorkbook();
        Sheet sheet = book.createSheet("StepLog");
        Sheet sheet2 = book.createSheet("CallApp");
        
        for(int k = 0; k < s.length; k++) {             // 2dArray.length is the number of rows, for loop moves us through rows
            Row row = sheet.createRow(k); 
        	for(int x = 0; x < s[0].length; x++) {      // 2dArray[0].length is the number of columns present in row 0, for loop moves us through rows
                    Cell name = row.createCell(x);
                    name.setCellValue(s[k][x]);                
            }
        }
        for(int k = 0; k < s.length; k++) {             // 2dArray.length is the number of rows, for loop moves us through rows
            Row row = sheet2.createRow(k); 
        	for(int x = 0; x < s[0].length; x++) {      // 2dArray[0].length is the number of columns present in row 0, for loop moves us through rows
                    Cell name = row.createCell(x);
                    name.setCellValue(s[k][x]);                
            }
        }
        
        // Size all columns
        for(int i = 0; i < s.length; i++) {
        	sheet.autoSizeColumn(i);
        }
        
        // Now, its time to write content of Excel into File
        book.write(new FileOutputStream(file));
        book.close();
    }
}
