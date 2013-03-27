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

public class GetStatsB extends ActionSupport  {
	private static final long serialVersionUID = 1L;
    private InputStream inputStream;
    private String testo="USAGESTATS\n";
	//private int al_id;
	//private int delta;
    
	public String execute() throws Exception {       
        Connection conn = null;
		try {
			conn = Constants.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_ALL_ENTRIESB.getSql());		
			//System.out.println("Parameters " + al_id + " " + delta);
			//stmt.setInt(1,al_id);
			//stmt.setInt(2,al_id);
			//stmt.setInt(3,delta);
			ResultSet rs = stmt.executeQuery();
			
			while(rs.next()) {
			testo = testo + "(" + rs.getInt("year") + "," + rs.getInt("month")+ ","+ rs.getInt("downloads") + "," + rs.getInt("files")+ "," + rs.getInt("users") + ","+ rs.getDouble("gb")+ ",'"+ rs.getString("host") +"');\n";                				
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
	
/*	public int getAl_id() {
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
	}*/

}