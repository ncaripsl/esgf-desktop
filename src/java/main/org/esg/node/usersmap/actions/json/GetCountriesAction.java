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
import org.esg.node.usersmap.beans.Country;
import org.esg.node.usersmap.utils.SqlQuery;

import com.opensymphony.xwork2.ActionSupport;

public class GetCountriesAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private String host = null;
	private String peergroup = null;
	
	private List<Country> countriesList = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		
		try {
			conn = Constants.DATASOURCE.getConnection();
			PreparedStatement stmt = null;
			if (host != null) {
				stmt = conn.prepareStatement(SqlQuery.GET_COUNTRIES_HOST.getSql());
				stmt.setString(1, host);
			}
			ResultSet rs = stmt.executeQuery();
			
			countriesList = new LinkedList<Country>();
			
			while (rs.next()) {
				Country country = new Country();
				country.setCountrycode(rs.getString("country"));
				
				countriesList.add(country);
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

	public List<Country> getCountriesList() {
		return countriesList;
	}

	public void setCountriesList(List<Country> countriesList) {
		this.countriesList = countriesList;
	}
	
}
