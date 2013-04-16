package org.esg.node.realtimecpustats.beans;

import java.io.Serializable;

public class RealtimeLoadAvg implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String timestamp = null;
	private Double loadavg = null;
	
	public RealtimeLoadAvg(Double loadavg, String timestamp) {		
		this.timestamp = timestamp;
		this.loadavg = loadavg;
	}
	
	public String getTimestamp() {
		return timestamp;
	}


	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}


	public Double getLoadavg() {
		return loadavg;
	}


	public void setLoadavg(Double loadavg) {
		this.loadavg = loadavg;
	}

}
