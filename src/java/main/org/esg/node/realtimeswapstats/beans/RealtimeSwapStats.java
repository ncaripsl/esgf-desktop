package org.esg.node.realtimeswapstats.beans;

import java.io.Serializable;

public class RealtimeSwapStats implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String timestamp = null;
	private Double freeSwap = null;
	private Double totSwap = null;
	
	public RealtimeSwapStats(Double freeSwap, Double totSwap, String timestamp){
		this.freeSwap = freeSwap;
		this.totSwap = totSwap;
		this.timestamp = timestamp;		
	}
	
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public Double getFreeSwap() {
		return freeSwap;
	}
	public void setFreeSwap(Double freeSwap) {
		this.freeSwap = freeSwap;
	}
	public Double getTotSwap() {
		return totSwap;
	}
	public void setTotSwap(Double totSwap) {
		this.totSwap = totSwap;
	}

}
