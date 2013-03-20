package org.esg.node.datastats.actions.json;

import org.esg.node.datastats.beans.DataStat;
import org.esg.node.generalUtils.Constants;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

/**
 * @author CMCC
 */

public class LoadDataStatsAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private String datastatsmetric = null;
	private String datastatsdim    = null;
	private String datastatsorder  = null;
	private String datastatssource = null;
	
	private List<DataStat> stats = null;
	
	public String execute() throws Exception {
		
		System.out.println("datastatsmetric: " + datastatsmetric + "\ndatastatsdim: " + datastatsdim + "\ndatastatsorder: " + datastatsorder + "\ndatastatssource: " + datastatssource);
		
		String measure = "";
		String dimension = "";
		String orderbyfield = "";
		String fromstm = "esgf_dashboard.planb_metrics";
		
		if (datastatsmetric.equals("Number Downloads"))
			measure = "SUM(downloads)";
		else if (datastatsmetric.equals("Number Files"))
			measure = "SUM(files)";
		else if (datastatsmetric.equals("Number Users"))
			measure = "SUM(users)";
		else if (datastatsmetric.equals("Downloaded Data (GBytes)"))
			measure = "SUM(gb)";
		else if (datastatsmetric.equals("Downloaded Data (TBytes)"))
			measure = "SUM(cast(gb as double precision))/1024";
		
		if (datastatsdim.equals("Year"))
			dimension = "year";
		else if (datastatsdim.equals("YearMonth"))
			dimension = "(to_char(year,'9999') || '/' || substr(to_char(month,'099'),3))";
		else if (datastatsdim.equals("Host"))
			dimension = "host";
		
		if (datastatsorder.equals("3A"))
			orderbyfield="dimension ASC ";
		else if (datastatsorder.equals("3B"))
			orderbyfield="measure ASC";
		else if (datastatsorder.equals("3C"))
			orderbyfield="dimension DESC";
		else if (datastatsorder.equals("3D"))
			orderbyfield="measure DESC";
		
		/*if (datastatssource.equals("5B"))
			fromstm=" dimension ASC ";
		else if (datastatssource.equals("5D"))
			fromstm=" measure ASC";*/
		
		String query = "SELECT " + dimension + " AS dimension, " + measure + " AS measure FROM " + fromstm + " GROUP BY dimension ORDER BY " + orderbyfield;
		
		System.out.println("query: " + query);
		
		Connection conn = null;
		try {
			conn = Constants.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();
			
			stats = new LinkedList<DataStat>();
			
			while (rs.next()) {
				DataStat ds = new DataStat();
				ds.setDimension(rs.getString("dimension"));
				ds.setMeasure(rs.getDouble("measure"));
				
				stats.add(ds);
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

	public String getDatastatsmetric() {
		return datastatsmetric;
	}

	public void setDatastatsmetric(String datastatsmetric) {
		this.datastatsmetric = datastatsmetric;
	}

	public String getDatastatsdim() {
		return datastatsdim;
	}

	public void setDatastatsdim(String datastatsdim) {
		this.datastatsdim = datastatsdim;
	}

	public String getDatastatsorder() {
		return datastatsorder;
	}

	public void setDatastatsorder(String datastatsorder) {
		this.datastatsorder = datastatsorder;
	}

	public String getDatastatssource() {
		return datastatssource;
	}

	public void setDatastatssource(String datastatssource) {
		this.datastatssource = datastatssource;
	}

	public List<DataStat> getStats() {
		return stats;
	}

	public void setStats(List<DataStat> stats) {
		this.stats = stats;
	}
	
}
