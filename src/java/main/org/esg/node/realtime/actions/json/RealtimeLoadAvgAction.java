package org.esg.node.realtime.actions.json;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import org.esg.node.generalUtils.Constants;
import org.esg.node.realtime.utils.SqlQuery;
import org.esg.node.realtime.beans.RealtimeLoadAvg;

public class RealtimeLoadAvgAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<RealtimeLoadAvg> loadavgList = null;


	public String execute() throws Exception {
		
		Connection conn = null;
		
		try {
			
			conn = Constants.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_LOAD_AVG.getSql());
			ResultSet rs = stmt.executeQuery();
			loadavgList = new LinkedList<RealtimeLoadAvg>();
			while (rs.next()) {
				
				String timestamp = rs.getString(1);
				Double loadavg = rs.getDouble(2);
				//RealtimeLoadAvg realtimeLoadAvg = new RealtimeLoadAvg(timestamp, loadavg);
				//loadavgList.add(realtimeLoadAvg);
			}
			
			rs.close();
			stmt.close();			
		}
		catch(SQLException e) {			
			return ERROR;
		}		
		
		finally {			
			if(conn != null) conn.close();
		}
		
		
		return SUCCESS;		
	}


	public List<RealtimeLoadAvg> getLoadavgList() {
		return loadavgList;
	}

	public void setLoadavgList(List<RealtimeLoadAvg> loadavgList) {
		this.loadavgList = loadavgList;
	}

}