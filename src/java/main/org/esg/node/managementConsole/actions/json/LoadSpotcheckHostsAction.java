package org.esg.node.managementConsole.actions.json;

import org.esg.node.generalUtils.Constants;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import org.esg.node.managementConsole.beans.Host;
import org.esg.node.managementConsole.utils.SqlQuery;

import com.opensymphony.xwork2.ActionSupport;

/**
 * @author CMCC
 */

public class LoadSpotcheckHostsAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private List<Host> hosts = null;

	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = Constants.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_HOSTS.getSql());
			ResultSet rs = stmt.executeQuery();
			
			hosts = new LinkedList<Host>();
			
			while (rs.next()) {
				Host host = new Host();
				//host.setId(rs.getInt("id"));
				host.setName(rs.getString("name"));
				
				hosts.add(host);
			}
			rs.close();
			stmt.close();
		} catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return SUCCESS;
	}

	public List<Host> getHosts() {
		return hosts;
	}

	public void setHosts(List<Host> hosts) {
		this.hosts = hosts;
	}
	
}
