package org.esg.node.datastats.beans;

import java.io.Serializable;

public class CopyOfDataStat implements Serializable {

	private static final long serialVersionUID = 1L;

	private String time     = null;
	private Double metric  = null;
	
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Double getMetric() {
		return metric;
	}

	public void setMetric(Double metric) {
		this.metric = metric;
	}
	
}
