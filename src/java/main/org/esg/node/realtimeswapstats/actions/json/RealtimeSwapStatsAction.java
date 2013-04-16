package org.esg.node.realtimeswapstats.actions.json;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.esg.node.realtimeswapstats.beans.RealtimeSwapStats;

import com.opensymphony.xwork2.ActionSupport;

public class RealtimeSwapStatsAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<RealtimeSwapStats> swapList = null;
	
	HttpServletRequest request;
	
	private int sample = 0;
	
	public String execute() {
		
		swapList = new LinkedList<RealtimeSwapStats>();
		
		FileReader file = null;
		
		try {
			file = new FileReader("C:/realtime_swap/realtime_memory_swap.dat");
			
			BufferedReader reader = new BufferedReader(file);
			
			String line = "";
			
			//get the number of lines in the file
			File myFile = new File("C:/realtime_swap/realtime_memory_swap.dat");
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
					double freeSwap = Double.parseDouble(text);
					
					String text2 = line.substring(first + 1, second);
					double totSwap = Double.parseDouble(text2);
					
					RealtimeSwapStats realtimeSwap = new RealtimeSwapStats(freeSwap, totSwap, timestamp);
					swapList.add(realtimeSwap);					
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
					double freeSwap = Double.parseDouble(text);
					
					String text2 = line.substring(first + 1, second);
					double totSwap = Double.parseDouble(text2);
					
					RealtimeSwapStats realtimeSwap= new RealtimeSwapStats(freeSwap, totSwap, timestamp);
					swapList.add(realtimeSwap);
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

	public List<RealtimeSwapStats> getSwapList() {
		return swapList;
	}

	public void setSwapList(List<RealtimeSwapStats> swapList) {
		this.swapList = swapList;
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
