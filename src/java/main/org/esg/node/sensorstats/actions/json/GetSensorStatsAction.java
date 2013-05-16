package org.esg.node.sensorstats.actions.json;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import org.esg.node.generalUtils.Constants;
import org.esg.node.sensorstats.beans.SensorStats;
import org.esg.node.sensorstats.utils.SqlQuery;

import com.opensymphony.xwork2.ActionSupport;

/**
 * @author University of Salento and CMCC
 */
public class GetSensorStatsAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private List<SensorStats> sensorstats  = null;
	private String            sensor_table = null;
	private String            sensor_name  = null;

	public String execute() throws Exception {
		Connection conn = null;
		try {
			conn = Constants.DATASOURCE.getConnection();
			String query = SqlQuery.GET_STATS.getSql();
			
			query += sensor_table;
			
			if (sensor_name != null)
				query += " WHERE sensor_name = '" + sensor_name + "'";
			
			query += ";";
			
//			System.out.println(query);
			
			PreparedStatement stmt = conn.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();
			
			sensorstats = new LinkedList<SensorStats>();
			
			while(rs.next()) {
				SensorStats stats = new SensorStats();
				stats.setHost_name(rs.getString("host_name"));
				stats.setSensor_name(rs.getString("sensor_name"));
				stats.setLast5m_o(rs.getDouble("last5m_o"));
				stats.setLast1h_o(rs.getDouble("last1h_o"));
				stats.setLast1d_o(rs.getDouble("last1d_o"));
				stats.setLast1w_o(rs.getDouble("last1w_o"));
				stats.setLast1m_o(rs.getDouble("last1m_o"));
				stats.setLast1y_o(rs.getDouble("last1y_o"));
				stats.setLast5m_p(rs.getDouble("last5m_p"));
				stats.setLast1h_p(rs.getDouble("last1h_p"));
				stats.setLast1d_p(rs.getDouble("last1d_p"));
				stats.setLast1w_p(rs.getDouble("last1w_p"));
				stats.setLast1m_p(rs.getDouble("last1m_p"));
				stats.setLast1y_p(rs.getDouble("last1y_p"));
				stats.setTime_stamp(rs.getString("time_stamp"));
				sensorstats.add(stats);
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

	public List<SensorStats> getSensorstats() {
		return sensorstats;
	}

	public void setSensorstats(List<SensorStats> sensorstats) {
		this.sensorstats = sensorstats;
	}

	public String getSensor_table() {
		return sensor_table;
	}

	public void setSensor_table(String sensor_table) {
		this.sensor_table = sensor_table;
	}

	public String getSensor_name() {
		return sensor_name;
	}

	public void setSensor_name(String sensor_name) {
		this.sensor_name = sensor_name;
	}

}
