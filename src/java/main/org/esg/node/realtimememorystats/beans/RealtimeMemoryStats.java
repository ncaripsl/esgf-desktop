package org.esg.node.realtimememorystats.beans;

import java.io.Serializable;

public class RealtimeMemoryStats implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String timestamp = null;
	private Double freeMem = null;
	private Double totMem = null;
	
	public RealtimeMemoryStats(Double freeMem, Double totMem, String timestamp) {
		this.freeMem = freeMem;
		this.totMem = totMem;
		this.timestamp = timestamp;		
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public Double getFreeMem() {
		return freeMem;
	}

	public void setFreeMem(Double freeMem) {
		this.freeMem = freeMem;
	}

	public Double getTotMem() {
		return totMem;
	}

	public void setTotMem(Double totMem) {
		this.totMem = totMem;
	}

}
