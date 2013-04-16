package org.esg.node.realtimeMemory.beans;

import java.io.Serializable;

public class RealtimePieMemory implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String label = null;
	private Double value = null;
	
	public RealtimePieMemory(String label, Double value) {
		this.label = label;
		this.value = value;		
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

}
