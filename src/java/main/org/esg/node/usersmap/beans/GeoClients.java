package org.esg.node.usersmap.beans;

/**
 * @author CMCC
 */

import java.io.Serializable;

public class GeoClients implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Number  latitude  = null;
	private Number  longitude = null;
	private String  country   = null;
	private String  host      = null;
	private Integer numclient = null;
	
	public Number getLatitude() {
		return latitude;
	}
	public void setLatitude(Number latitude) {
		this.latitude = latitude;
	}
	public Number getLongitude() {
		return longitude;
	}
	public void setLongitude(Number longitude) {
		this.longitude = longitude;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public Integer getNumclient() {
		return numclient;
	}
	public void setNumclient(Integer numclient) {
		this.numclient = numclient;
	}
}
