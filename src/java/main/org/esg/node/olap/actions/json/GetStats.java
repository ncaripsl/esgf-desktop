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

public class GetStats extends ActionSupport  {
	private static final long serialVersionUID = 1L;
    private InputStream inputStream;
    private String testo="REMOTE_STATS_ACTION\n";
	private int al_id;
	private int delta;
    
	public String execute() throws Exception {       
        Connection conn = null;
		try {
			conn = Constants.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_ALL_ENTRIES.getSql());		
			System.out.println("Parameters " + al_id + " " + delta);
			stmt.setInt(1,al_id);
			stmt.setInt(2,al_id);
			stmt.setInt(3,delta);
			ResultSet rs = stmt.executeQuery();
			
			while(rs.next()) {
			testo = testo + "(" + rs.getInt("al_id") + "," + rs.getInt("datasetid")+ ","+ rs.getInt("file_id") + ",'"+ rs.getString("project")+ "','"+ rs.getString("model")+"','" + rs.getString("experiment")+"','"+ rs.getString("url") + "',"+ rs.getInt("mv")+ ",'" + rs.getString("var") + "','"+ rs.getString("realm") + "','" + rs.getString("user_id_hash") + "','"+ rs.getString("user_idp") +"',"+ rs.getInt("year") + ","+ rs.getInt("month")+ ","+ rs.getInt("day")+ ","+ rs.getInt("hour")+ ",'"+ rs.getString("service_type") + "','"+ rs.getString("remote_addr") + "','" + rs.getString("datasetname") + "','" + rs.getString("time_frequency") + "','" + rs.getString("institute") + "','" + rs.getString("product") + "','" + rs.getString("ensemble") + "','" + rs.getString("cmor_table") + "'," + rs.getInt("size") + ","+ rs.getInt("success") + ","+ rs.getInt("duration") + ",'"+ rs.getString("peername")+"');\n";                				
			}
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
	
	public int getAl_id() {
		return al_id;
	}

	public void setAl_id(int al_id) {
		this.al_id = al_id;
	}
	
	public int getDelta() {
		return delta;
	}

	public void setDelta(int delta) {
		this.delta = delta;
	}

}