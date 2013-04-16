package org.esg.node.realtimecpustats.actions.json;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.esg.node.realtimecpustats.beans.RealtimeLoadAvg;

import com.opensymphony.xwork2.ActionSupport;

public class RealtimeLoadAvgStatsAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<RealtimeLoadAvg> loadavgList = null;
	
	HttpServletRequest request;	

	private int last;
	private int sample;
	private String last_ = ServletActionContext.getRequest().getParameter("last");	
	private String sample_ = ServletActionContext.getRequest().getParameter("sample");

	
	public String execute() throws Exception {
		System.out.println("last_ = " + last_);
		System.out.println("sample_ = " + sample_);
		
		loadavgList = new LinkedList<RealtimeLoadAvg>();
		
		FileReader file1 = null;
		FileReader file2 = null;
		FileReader file3 = null;
		
		try{
			
			file1 = new FileReader("C:/realtime_cpu/realtime_cpu_1m.dat");
			file2 = new FileReader("C:/realtime_cpu/realtime_cpu_5m.dat");
			file3 = new FileReader("C:/realtime_cpu/realtime_cpu_15m.dat");
			
			BufferedReader reader1 = new BufferedReader(file1);
			BufferedReader reader2 = new BufferedReader(file2);
			BufferedReader reader3 = new BufferedReader(file3);
			
			String line = "";
			
			//get the number of lines in the file
			File file = new File("C:/realtime_cpu/realtime_cpu_1m.dat");
			Scanner scanner = new Scanner(file);
            int count = 0;
            while (scanner.hasNextLine()) {
                    String lines = scanner.nextLine();
                    count++;
            }
            
            //get the parameters
    		//last_ = ServletActionContext.getRequest().getParameter("last");
            if(last_ != null){
        		last = -1;    
            }
    		
    		System.out.println("last = " + last);
    		
    		//sample_ = ServletActionContext.getRequest().getParameter("sample");    		
    		
    		
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
			if(last == 1 & sample == -1){
				while ((line = reader1.readLine())!= null) {
					
					int start = line.indexOf("&");
					
					String timestamp = line.substring(start + 1);
					
					String text = line.substring(0, start);
					double loadavg = Double.parseDouble(text);
				
					RealtimeLoadAvg realtimeLoadAvg = new RealtimeLoadAvg(loadavg, timestamp);
					loadavgList.add(realtimeLoadAvg);		

				    }					
			}
			//else return the requested number of samples
			else if(last == 1 & sample != -1) {
				
				for(int i = 0; i < sample; i++){
					
					line = reader1.readLine();
                    int start = line.indexOf("&");
					
					String timestamp = line.substring(start + 1);
					
					String text = line.substring(0, start);
					double loadavg = Double.parseDouble(text);
				
					RealtimeLoadAvg realtimeLoadAvg = new RealtimeLoadAvg(loadavg, timestamp);
					loadavgList.add(realtimeLoadAvg);	
				}		
			}
			
			
			else if(last == 5 & sample == -1){
				while ((line = reader2.readLine())!= null) {
					
					int start = line.indexOf("&");
					
					String timestamp = line.substring(start + 1);
					
					String text = line.substring(0, start);
					double loadavg = Double.parseDouble(text);
				
					RealtimeLoadAvg realtimeLoadAvg = new RealtimeLoadAvg(loadavg, timestamp);
					loadavgList.add(realtimeLoadAvg);		

				    }					
			}
			
			else if(last == 5 & sample != -1) {
				
				for(int i = 0; i < sample; i++){
					
					line = reader2.readLine();
                    int start = line.indexOf("&");
					
					String timestamp = line.substring(start + 1);
					
					String text = line.substring(0, start);
					double loadavg = Double.parseDouble(text);
				
					RealtimeLoadAvg realtimeLoadAvg = new RealtimeLoadAvg(loadavg, timestamp);
					loadavgList.add(realtimeLoadAvg);	
				}
				
			}
			
			else if(last == 15 & sample == -1){
				while ((line = reader3.readLine())!= null) {
					
					int start = line.indexOf("&");
					
					String timestamp = line.substring(start + 1);
					
					String text = line.substring(0, start);
					double loadavg = Double.parseDouble(text);
				
					RealtimeLoadAvg realtimeLoadAvg = new RealtimeLoadAvg(loadavg, timestamp);
					loadavgList.add(realtimeLoadAvg);		

				    }					
			}
			
			else if(last == 15 & sample != -1) {
				
				for(int i = 0; i < sample; i++){
					
					line = reader3.readLine();
                    int start = line.indexOf("&");
					
					String timestamp = line.substring(start + 1);
					
					String text = line.substring(0, start);
					double loadavg = Double.parseDouble(text);
				
					RealtimeLoadAvg realtimeLoadAvg = new RealtimeLoadAvg(loadavg, timestamp);
					loadavgList.add(realtimeLoadAvg);	
				}
				
			}
		
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
		
		finally {
		    if (file1 != null & file2 != null & file3 != null) {
		      try {
		        file1.close();
		        file2.close();
		        file3.close();
		      } catch (IOException e) {
		        // Ignore issues during closing 
		      }
		    }
		  }	
		
		return SUCCESS;
	}	
		
	public int getLast() {
		return last;
	}

	public void setLast(int last) {
		this.last = last;
	}

	public int getSample() {
		return sample;
	}

	public void setSample(int sample) {
		this.sample = sample;
	}



	public HttpServletRequest getRequest() {
		return request;
	}


	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}


	public List<RealtimeLoadAvg> getLoadavgList() {
		return loadavgList;
	}

	public void setLoadavgList(List<RealtimeLoadAvg> loadavgList) {
		this.loadavgList = loadavgList;
	}	

}
