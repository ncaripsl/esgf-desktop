package org.esg.node.realtime.actions.json;

import java.util.LinkedList;
import java.util.List;

import org.esg.node.realtime.beans.RealtimeLoadAvg;

import com.opensymphony.xwork2.ActionSupport;

public class RandomLoadAvgAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<RealtimeLoadAvg> loadavgList = null;
	
	public String execute() throws Exception {
		
		loadavgList = new LinkedList<RealtimeLoadAvg>();
		
		for (int i = 0; i < 10; i++){
			
			String timestamp = Integer.toString(i);
			Double loadavg = Math.random() * 10;			
			//RealtimeLoadAvg realtimeLoadAvg = new RealtimeLoadAvg(timestamp, loadavg);
			//loadavgList.add(realtimeLoadAvg);			
		}		
		
		return SUCCESS;
	}
	
	public List<RealtimeLoadAvg> getLoadavgList() {
		return loadavgList;
	}

	public void setLoadavgList(List<RealtimeLoadAvg> loadavgList) {
		this.loadavgList = loadavgList;
	}
}
