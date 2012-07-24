package org.esg.node.olap.beans;

import java.io.Serializable;

/**
 * @author CMCC
 */

public class ServiceStatus implements Serializable {

	private static final long serialVersionUID = 1L;

	private String timestamp = null;
	private Integer elapsedTime = null;
	
	public ServiceStatus(String timestamp, Integer elapsedTime) {
		super();
		this.timestamp = timestamp;
		this.elapsedTime = elapsedTime;
	}

	public String getTimestamp() {
		return timestamp;
	}
	
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	
	public Integer getElapsedTime() {
		return elapsedTime;
	}
	
	public void setElapsedTime(Integer elapsedTime) {
		this.elapsedTime = elapsedTime;
	}
	
}
