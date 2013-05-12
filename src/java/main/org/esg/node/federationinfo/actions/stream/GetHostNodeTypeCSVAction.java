package org.esg.node.federationinfo.actions.stream;

/**
 * @author CMCC
 */

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.esg.node.federationinfo.utils.SqlQuery;
import org.esg.node.generalUtils.Constants;
import org.esg.node.generalUtils.CsvWriter;

import com.opensymphony.xwork2.ActionSupport;

public class GetHostNodeTypeCSVAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private Integer idProject = null;
	private String projectName = null;
	private InputStream stream = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		
		try {
			conn = Constants.DATASOURCE.getConnection();
			PreparedStatement stmt = null;
			if (idProject == null)
				stmt = conn.prepareStatement(SqlQuery.GET_ALL_HOST_DEPLOYMENT.getSql());
			else {
				stmt = conn.prepareStatement(SqlQuery.GET_HOST_DEPLOYMENT_BY_PROJECT_ID.getSql());
				stmt.setInt(1, idProject);
			}
			ResultSet rs = stmt.executeQuery();
			
			CsvWriter csv = new CsvWriter();
			csv.setDelimiter('|');
			csv.writeRecord(new String[] {"Peer Group: " + projectName});
			csv.writeRecord(new String[] { "Alias", "Host Name", "City", "Node Type", "Software Version", "Software release" });
			
			while (rs.next()) {
				csv.write(rs.getString("ip"));
				csv.write(rs.getString("name"));
				csv.write(rs.getString("city"));
				
				int nodetype = rs.getInt("nodetype");
				String nodetype_str = "";
				if ((nodetype & 32) > 0)
	    			nodetype_str = nodetype_str + "Compute ";
	    		if ((nodetype & 16) > 0)
	    			nodetype_str = nodetype_str + "Idp ";
	    		if ((nodetype & 8) > 0)
	    			nodetype_str = nodetype_str + "Index ";
	    		if ((nodetype & 4) > 0)
	    			nodetype_str = nodetype_str + "Data ";
				csv.write(nodetype_str);
				
				csv.write(rs.getString("swversion"));
				csv.write(rs.getString("swrelease"));
				csv.endRecord();
			}
			rs.close();
			stmt.close();
			stream = new ByteArrayInputStream(csv.getOutputStream().toByteArray());
			csv.close();
		} catch(SQLException e) {
			//System.out.println("%%% MOST ACTIVE HOST ERROR ="+ e.getMessage());
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return SUCCESS;
	}

	
	public Integer getIdProject() {
		return idProject;
	}
	public void setIdProject(Integer idProject) {
		this.idProject = idProject;
	}
	
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}


	public InputStream getStream() {
		return stream;
	}
	public void setStream(InputStream stream) {
		this.stream = stream;
	}
}
