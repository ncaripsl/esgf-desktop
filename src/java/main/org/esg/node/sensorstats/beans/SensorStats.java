package org.esg.node.sensorstats.beans;

import java.io.Serializable;

public class SensorStats implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String host_name   = null;
	private String sensor_name = null;
	private Double last5m_o    = null;
	private Double last1h_o    = null;
	private Double last1d_o    = null;
	private Double last1w_o    = null;
	private Double last1m_o    = null;
	private Double last1y_o    = null;
	private Double last5m_p    = null;
	private Double last1h_p    = null;
	private Double last1d_p    = null;
	private Double last1w_p    = null;
	private Double last1m_p    = null;
	private Double last1y_p    = null;
	private String time_stamp  = null;

	public String getHost_name() {
		return host_name;
	}
	public void setHost_name(String host_name) {
		this.host_name = host_name;
	}
	public String getSensor_name() {
		return sensor_name;
	}
	public void setSensor_name(String sensor_name) {
		this.sensor_name = sensor_name;
	}
	public Double getLast5m_o() {
		return last5m_o;
	}
	public void setLast5m_o(Double last5m_o) {
		this.last5m_o = last5m_o;
	}
	public Double getLast1h_o() {
		return last1h_o;
	}
	public void setLast1h_o(Double last1h_o) {
		this.last1h_o = last1h_o;
	}
	public Double getLast1d_o() {
		return last1d_o;
	}
	public void setLast1d_o(Double last1d_o) {
		this.last1d_o = last1d_o;
	}
	public Double getLast1w_o() {
		return last1w_o;
	}
	public void setLast1w_o(Double last1w_o) {
		this.last1w_o = last1w_o;
	}
	public Double getLast1m_o() {
		return last1m_o;
	}
	public void setLast1m_o(Double last1m_o) {
		this.last1m_o = last1m_o;
	}
	public Double getLast1y_o() {
		return last1y_o;
	}
	public void setLast1y_o(Double last1y_o) {
		this.last1y_o = last1y_o;
	}
	public Double getLast5m_p() {
		return last5m_p;
	}
	public void setLast5m_p(Double last5m_p) {
		this.last5m_p = last5m_p;
	}
	public Double getLast1h_p() {
		return last1h_p;
	}
	public void setLast1h_p(Double last1h_p) {
		this.last1h_p = last1h_p;
	}
	public Double getLast1d_p() {
		return last1d_p;
	}
	public void setLast1d_p(Double last1d_p) {
		this.last1d_p = last1d_p;
	}
	public Double getLast1w_p() {
		return last1w_p;
	}
	public void setLast1w_p(Double last1w_p) {
		this.last1w_p = last1w_p;
	}
	public Double getLast1m_p() {
		return last1m_p;
	}
	public void setLast1m_p(Double last1m_p) {
		this.last1m_p = last1m_p;
	}
	public Double getLast1y_p() {
		return last1y_p;
	}
	public void setLast1y_p(Double last1y_p) {
		this.last1y_p = last1y_p;
	}
	public String getTime_stamp() {
		return time_stamp;
	}
	public void setTime_stamp(String time_stamp) {
		this.time_stamp = time_stamp;
	}
	
}
