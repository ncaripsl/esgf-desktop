package org.esg.node.realtimeSwap.actions.json;

import java.io.FileReader;
import java.io.LineNumberReader;
import java.util.LinkedList;
import java.util.List;

import org.esg.node.generalUtils.Constants;
import org.esg.node.realtimeSwap.beans.RealtimePieSwap;

import com.opensymphony.xwork2.ActionSupport;

public class RealtimeSwapPieAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	List<RealtimePieSwap> swapPieList = null;
	
	public String execute() {
		
		swapPieList = new LinkedList<RealtimePieSwap>();
		
        FileReader file = null;
        
        try {
        	
        	//file = new FileReader("C:/realtime_swap/realtime_memory_swap.dat");
        	file = new FileReader(Constants.DASHBOARD_SERVICE_PATH +"/realtime_mem_swap.dat");
			LineNumberReader nr = new LineNumberReader(file);
			
			String line = "";
			
			while((line = nr.readLine()) != null){
				
				int first = line.indexOf("$");
				int second = line.indexOf("&");
				
				String text = line.substring(0, first);
				double freeSwap = Double.parseDouble(text);
				
				String text2 = line.substring(first + 1, second);
				double totSwap = Double.parseDouble(text2);
				
				double busySwap = totSwap - freeSwap;
				
				String label1 = "Used Swap";
				Double value1 = busySwap;
				
				RealtimePieSwap item1 = new RealtimePieSwap(label1, value1);
				swapPieList.add(item1);
				
				String label2 = "Free Swap";
				Double value2 = freeSwap;
				
				RealtimePieSwap item2 = new RealtimePieSwap(label2, value2);
				swapPieList.add(item2);
				
			  if (nr.getLineNumber () == 1)
			        break;				
			}
        	
        }
	
		catch (Exception e) {
			throw new RuntimeException(e);
		}

		return SUCCESS;
	}

	public List<RealtimePieSwap> getSwapPieList() {
		return swapPieList;
	}

	public void setSwapPieList(List<RealtimePieSwap> swapPieList) {
		this.swapPieList = swapPieList;
	}

}
