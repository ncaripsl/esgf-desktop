package org.esg.node.realtimememorystats.actions.json;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.esg.node.realtimememorystats.beans.RealtimeMemoryStats;

import com.opensymphony.xwork2.ActionSupport;

public class RealtimeMemoryStatsAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<RealtimeMemoryStats> memoryList = null;
	
	HttpServletRequest request;
	
	private int sample = 0;
	
	public String execute() throws Exception {
		
		memoryList = new LinkedList<RealtimeMemoryStats>();
		
		FileReader file = null;
		
		try {
			
			file = new FileReader("C:/realtime_memory/realtime_memory_mem.dat");
			
			BufferedReader reader = new BufferedReader(file);
			
			String line = "";
			
			//get the number of lines in the file
			File myFile = new File("C:/realtime_memory/realtime_memory_mem.dat");
			Scanner scanner = new Scanner(myFile);
            int count = 0;
            while (scanner.hasNextLine()) {
                    String lines = scanner.nextLine();
                    count++;
            }
            
            //get the parameter
            String sample_ = ServletActionContext.getRequest().getParameter("sample");
            
          //if sample is null or with length 0 or the number of samples is greater than the number 
    		//of lines in the file, set sample = -1            
    		
    		if(sample_ == null){    			
    			sample = -1;
     		}
            
    		else if(sample_.length() == 0){
    			sample = -1;
    		}
    		else{
    			sample = Integer.parseInt(sample_);
    			if(sample > count){
    				sample = -1;
    			}
    		}
    		
    		//if sample == -1 return all the lines of the file
			if(sample == -1){
				while ((line = reader.readLine())!= null) {
					
					int first = line.indexOf("&");
					int second = line.indexOf("%");
					
					String timestamp = line.substring(second + 1);
					
					String text = line.substring(0, first);
					double freeMem = Double.parseDouble(text);
					
					String text2 = line.substring(first + 1, second);
					double totMem = Double.parseDouble(text2);
					
					RealtimeMemoryStats realtimeMemory = new RealtimeMemoryStats(freeMem, totMem, timestamp);
					memoryList.add(realtimeMemory);		
				    }					
			}	
			//else return the requested number of samples
			else if (sample != -1) {
				
				for(int i = 0; i < sample; i++){
					
					line = reader.readLine();
					
					int first = line.indexOf("&");
					int second = line.indexOf("%");
					
					String timestamp = line.substring(second + 1);
					
					String text = line.substring(0, first);
					double freeMem = Double.parseDouble(text);
					
					String text2 = line.substring(first + 1, second);
					double totMem = Double.parseDouble(text2);
					
					RealtimeMemoryStats realtimeMemory = new RealtimeMemoryStats(freeMem, totMem, timestamp);
					memoryList.add(realtimeMemory);		
				}		
			}
			
		}		
		catch (Exception e) {
			throw new RuntimeException(e);
		}
		
		finally {
		    if (file != null ) {
		      try {
		        file.close();
		      } catch (IOException e) {
		        // Ignore issues during closing 
		      }
		    }
		}	
		
		return SUCCESS;
	}

	public List<RealtimeMemoryStats> getMemoryList() {
		return memoryList;
	}

	public void setMemoryList(List<RealtimeMemoryStats> memoryList) {
		this.memoryList = memoryList;
	}

	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public int getSample() {
		return sample;
	}

	public void setSample(int sample) {
		this.sample = sample;
	}

}
