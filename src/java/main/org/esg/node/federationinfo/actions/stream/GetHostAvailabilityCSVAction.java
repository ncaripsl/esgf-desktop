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

public class GetHostAvailabilityCSVAction extends ActionSupport {

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
				stmt = conn.prepareStatement(SqlQuery.GET_ALL_HOST_AVAILABILITY.getSql());
			else {
				stmt = conn.prepareStatement(SqlQuery.GET_HOST_AVAILABILITY_BY_PROJECT_ID.getSql());
				stmt.setInt(1, idProject);
			}
			ResultSet rs = stmt.executeQuery();
			
			CsvWriter csv = new CsvWriter();
			csv.setDelimiter('|');
			csv.writeRecord(new String[] {"Peer Group: " + projectName});
			csv.writeRecord(new String[] {"Host Name", "Alias", "City", "Status", "Elapsed Time"});
			
			while (rs.next()) {
				csv.write(rs.getString("name"));
				csv.write(rs.getString("ip"));
				csv.write(rs.getString("city"));
				int status = rs.getInt("status");
				if (status == 1)
					csv.write("OK");
				else
					csv.write("NOT OK");
				int elapsedtime = rs.getInt("elapsedtime");
				if (elapsedtime == 1000000)
					csv.write("TIMEOUT");
				else
					csv.write("" + elapsedtime);
				csv.endRecord();
			}
			rs.close();
			stmt.close();
			stream = new ByteArrayInputStream(csv.getOutputStream().toByteArray());
			csv.close();
		} catch(SQLException e) {
			System.out.println("ERROR = " + e.getMessage());
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
