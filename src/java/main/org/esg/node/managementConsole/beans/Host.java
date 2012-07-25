package org.esg.node.managementConsole.beans;

import java.io.Serializable;

/**
 * @author CMCC
 */

public class Host implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String name = null;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
}