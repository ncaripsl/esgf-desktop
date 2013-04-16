package org.esg.node.realtimeMemory.actions.json;

import java.io.FileReader;
import java.io.LineNumberReader;
import java.util.LinkedList;
import java.util.List;

import org.esg.node.generalUtils.Constants;
import org.esg.node.realtimeMemory.beans.RealtimePieMemory;

import com.opensymphony.xwork2.ActionSupport;

public class RealtimeMemoryPieAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<RealtimePieMemory> memoryPieList = null;
	
	public String execute(){
		
		memoryPieList = new LinkedList<RealtimePieMemory>();
		
		FileReader file = null;
		
		try {
			
			//file = new FileReader("C:/realtime_memory/realtime_memory_mem.dat");
			file = new FileReader(Constants.DASHBOARD_SERVICE_PATH +"/realtime_mem_ram.dat");
			
			LineNumberReader nr = new LineNumberReader(file);
			
			String line = "";
			
			while((line = nr.readLine()) != null){
				
				int first = line.indexOf("$");
				int second = line.indexOf("&");
				
				String text = line.substring(0, first);
				double freeMem = Double.parseDouble(text);
				
				String text2 = line.substring(first + 1, second);
				double totMem = Double.parseDouble(text2);
				
				double busyMem = totMem - freeMem;
				
				String label1 = "Used Ram";
				Double value1 = busyMem;
				
				RealtimePieMemory item1 = new RealtimePieMemory(label1, value1);
				memoryPieList.add(item1);
				
				String label2 = "Free Ram";
				Double value2 = freeMem;
				
				RealtimePieMemory item2 = new RealtimePieMemory(label2, value2);
				memoryPieList.add(item2);
				

				
			  if (nr.getLineNumber () == 1)
			        break;				
			}
			
		}
		catch (Exception e) {
			throw new RuntimeException(e);
		}
		
		return SUCCESS;
	}

	public List<RealtimePieMemory> getMemoryPieList() {
		return memoryPieList;
	}

	public void setMemoryPieList(List<RealtimePieMemory> memoryPieList) {
		this.memoryPieList = memoryPieList;
	}

}
