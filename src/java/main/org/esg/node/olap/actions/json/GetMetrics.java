package org.esg.node.olap.actions.json;

/**
 * @author CMCC - CMCC
 */

import org.esg.node.generalUtils.Constants;
import org.esg.node.olap.utils.SqlQuery;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;



import com.opensymphony.xwork2.ActionSupport;

import java.io.InputStream;
import java.io.StringBufferInputStream;

public class GetMetrics extends ActionSupport  {
	private static final long serialVersionUID = 1L;
    private InputStream inputStream;
    private String testo="METRICSSTATS\n";
    
	private String sensor;
	private String hostname;
    
	public String execute() throws Exception {       
        Connection conn = null;
        PreparedStatement stmt;
        String query_sql;
		try {
			conn = Constants.DATASOURCE.getConnection();
			if (hostname!=null)				
				query_sql = "SELECT * FROM esgf_dashboard.sensor_table_" + sensor + " where host_name='"+ hostname + "';";
			else
				query_sql= "SELECT * from esgf_dashboard.sensor_table_" + sensor + ";";

			stmt = conn.prepareStatement(query_sql);
			
			System.out.println("Query: " + query_sql);			
			
			if (hostname!=null)
				System.out.println("Parameters: " + sensor + " Hostname: " + hostname);
			else
				System.out.println("Parameters: " + sensor);			
						
			ResultSet rs = stmt.executeQuery();
					
			//System.out.println("before the while \n");	
			while(rs.next()) {
				testo = testo + "('" + rs.getString("host_name") + "'," + rs.getDouble("last5m_o") + ","+ rs.getDouble("last1h_o") + ","+ rs.getDouble("last1d_o") + ","+ rs.getDouble("last1w_o") + ","+ rs.getDouble("last1m_o") + ","+ rs.getDouble("last1y_o") + ","+ rs.getDouble("last5m_p") + ","+ rs.getDouble("last1h_p") + ","+ rs.getDouble("last1d_p") + ","+ rs.getDouble("last1w_p") + ","+ rs.getDouble("last1m_p") + ","+ rs.getDouble("last1y_p") + ");\n";                			
				//testo = testo + "(" + rs.getDouble("last5m_o") + ");\n";  //+ "," + rs.getDouble("last5m_o") + ","+ rs.getDouble("last1h_o") + ");\n";                			
			}
			//System.out.println("after the while \n");	
			rs.close();
			stmt.close();
			inputStream = new StringBufferInputStream(testo);
		} catch(SQLException e) {
			System.out.println(e.getMessage());
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}		
		return SUCCESS;
     }
	
	 public InputStream getInputStream() {
	        return inputStream;
	    }
		 
	public String getSensor() {
			return sensor;
		}

	public void setSensor(String sensor) {
			this.sensor = sensor;
		}

	public String getHostname() {
			return hostname;
		}

	public void setHostname(String hostname) {
			this.hostname = hostname;
		}


}