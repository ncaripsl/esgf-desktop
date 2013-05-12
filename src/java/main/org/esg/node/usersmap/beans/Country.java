package org.esg.node.usersmap.beans;

/**
 * @author CMCC
 */

import java.io.Serializable;

public class Country implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String  countrycode  = null;

	public String getCountrycode() {
		return countrycode;
	}

	public void setCountrycode(String countrycode) {
		this.countrycode = countrycode;
	}
	
}
