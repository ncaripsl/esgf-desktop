package org.esg.node.usersmap.actions.json;

/**
 * @author CMCC
 */

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import org.esg.node.generalUtils.Constants;
import org.esg.node.usersmap.beans.GeoClients;
import org.esg.node.usersmap.utils.SqlQuery;

import com.opensymphony.xwork2.ActionSupport;

public class GetClientsInfoAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private String host = null;
	private String peergroup = null;
	private String country = null; 
	
	private List<GeoClients> clientsList = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		//String DASHBOARD_SERVICE_PATH = esgfProperties.getProperty("dashboard.ip.app.home");
		try {
			conn = Constants.DATASOURCE.getConnection();
			PreparedStatement stmt = null;
			stmt = conn.prepareStatement(SqlQuery.GET_CLIENTS_LOCATION_BY_HOST.getSql());
			/*if (host != null && country == null) {
				
				//stmt.setString(1, host);
			}
			else if (host != null && country != null) {
				stmt = conn.prepareStatement(SqlQuery.GET_CLIENTS_LOCATION_BY_HOST_AND_COUNTRY.getSql());
				stmt.setString(1, host);
				stmt.setString(2, country);
			}*/
			ResultSet rs = stmt.executeQuery();
			
			clientsList = new LinkedList<GeoClients>();
			
			while (rs.next()) {
				GeoClients geoclient = new GeoClients();
				geoclient.setHost(host);
				geoclient.setCountry(rs.getString("country"));
				geoclient.setLatitude(rs.getBigDecimal("lat"));
				geoclient.setLongitude(rs.getBigDecimal("lon"));
				geoclient.setNumclient(rs.getInt("numclient"));
				
				clientsList.add(geoclient);
			}
			rs.close();
			stmt.close();
		} catch(SQLException e) {
			System.out.println("ERROR = " + e.getMessage());
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return SUCCESS;
	}
	
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}

	public String getPeergroup() {
		return peergroup;
	}

	public void setPeergroup(String peergroup) {
		this.peergroup = peergroup;
	}

	public List<GeoClients> getClientsList() {
		return clientsList;
	}

	public void setClientsList(List<GeoClients> clientsList) {
		this.clientsList = clientsList;
	}
 	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
}
