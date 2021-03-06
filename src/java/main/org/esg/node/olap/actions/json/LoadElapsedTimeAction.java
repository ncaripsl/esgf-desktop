package org.esg.node.olap.actions.json;

import org.esg.node.generalUtils.Constants;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import org.esg.node.olap.beans.ServiceStatus;
//import olap.utils.SqlQuery;

import com.opensymphony.xwork2.ActionSupport;

/**
 * @author CMCC
 */

/*public class LoadElapsedTimeAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private String startTime = "2011-08-29 09:57:13";
	private String endTime = "2011-08-30 09:57:13";
	
	private String combo1Value = null;
	private String combo2Value = null;
	private String combo3Value = null;
	private String combo4Value = null;
	private String combo5Value = null;
//	private String[] dimensionsSelection = null;
//	private String startDate = null;
//	private String endDate = null;
	
	private List<ServiceStatus> elapsedTimeList = null;
	
	public String execute() throws Exception {
		System.out.println("combo 1: " + combo1Value);
		System.out.println("combo 2: " + combo2Value);
		System.out.println("combo 3: " + combo3Value);
		System.out.println("combo 4: " + combo4Value);
		System.out.println("combo 5: " + combo5Value);
//		if (dimensionsSelection != null) {
//			for (int i = 0; i < dimensionsSelection.length; i++)
//				System.out.println(dimensionsSelection[i]);
//		}
//		System.out.println("startDate: " + startDate);
//		System.out.println("endDate: " + endDate);
		
		Connection conn = null; 
		try {
			conn = Constants.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_ELAPSED_TIME_IN_TIME_INTERVAL.getSql());
			stmt.setString(1, startTime);
			stmt.setString(2, endTime);
			ResultSet rs = stmt.executeQuery();
			elapsedTimeList = new LinkedList<ServiceStatus>();
			while(rs.next()) {
				
				String timestamp = rs.getString("timestamp").substring(0, 16);
				String first = timestamp.substring(0, 10);
				String second = timestamp.substring(11);
				timestamp = first + "\n" + second;
				
				double multiplier = Math.random(); // moltiplicatore per vedere la differenza nel grafico al ricaricamento dello store
				int time = (int)(rs.getInt("elapsedTime") * multiplier);
				
				ServiceStatus elapsedTime;
				elapsedTime = new ServiceStatus(timestamp, time);
				
				elapsedTimeList.add(elapsedTime);
			}
			
			rs.close();
			stmt.close();
		} catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}	
		
		return SUCCESS;
	}*/

public class LoadElapsedTimeAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
//	private String startTime = "2011-07-30 09:57:13";
//	private String endTime = "2011-08-30 09:57:13";
	private String measure = null;
	private String query = null;
	private String orderbyfield = null;
	private String wherestm = null;
	private String fromstm = null;
	private String dimension = null;
	
	private String combo1Value = null;
	private String combo2Value = null;
	private String combo3Value = null;
	private String combo4Value = null;
	private String combo5Value = null;
	
	
//	private Integer index = null;
	
	private List<ServiceStatus> elapsedTimeList = null;
	
	public String execute() throws Exception {
		
		if (combo1Value.equals("Downloaded Data (MBytes)"))
			measure=" sum(size/1024) ";
		if (combo1Value.equals("Downloaded Data (GBytes)"))
			measure=" sum(size/1024)/1024 ";
		if (combo1Value.equals("Downloaded Data (TBytes)"))
			measure=" sum(size/1024)/1024/1024 ";
		if (combo1Value.equals("Downloaded Data (PBytes)"))
			measure=" sum(size/1024)/1024/1024/1024 ";		
		if (combo1Value.equals("Number Downloads"))
				measure=" count(*) ";
		if (combo1Value.equals("Number Downloads (x1000)"))
			measure=" count(*)/1000 ";		
		
		dimension = combo2Value;
		
		if (combo2Value.equals("Project"))
			dimension = "project";
		if (combo2Value.equals("Model"))
			dimension = "model";
		if (combo2Value.equals("Experiment"))
			dimension = "experiment";		
		if (combo2Value.equals("Realm"))
			dimension = "realm";
		if (combo2Value.equals("Variable"))
			dimension = "var";		
		if (combo2Value.equals("PeerNode"))
			dimension = "peername";	
		if (combo2Value.equals("Url"))
			dimension = "url";			
		
		if (combo2Value.equals("User (hashed)"))
			dimension = "user_id_hash";		
		if (combo2Value.equals("User Idp"))
			dimension = "user_idp";			
		if (combo2Value.equals("Year"))
			dimension = "year";			
		if (combo2Value.equals("Hour"))
			dimension = "hour";	
		if (combo2Value.equals("Institute"))
			dimension = "institute";			
		if (combo2Value.equals("Ensemble"))
			dimension = "ensemble";
		if (combo2Value.equals("Time Frequency"))
			dimension = "time_frequency";
		if (combo2Value.equals("Cmor Table"))
			dimension = "cmor_table";		
		if (combo2Value.equals("Product"))
			dimension = "product";		
		if (combo2Value.equals("Data Service type"))
			dimension = "service_type";		
		if (combo2Value.equals("Remote Client"))
			dimension = "remote_addr";			
		if (combo2Value.equals("Dataset Name"))
			dimension = "datasetname";	
		
		/*if (combo2Value.equals("UrlVersion"))
			dimension = " (url || '-' ||  mv) ";
		if (combo2Value.equals("YearMonth"))
			dimension = " (CAST(year as varchar ) || '/'  ||  CAST(month as varchar)) ";
		if (combo2Value.equals("YearMonthDay"))
			dimension = " (CAST(year as varchar ) || '/'  ||  CAST(month as varchar) || '/' || CAST(day as varchar)) ";
		if (combo2Value.equals("YearMonthDayHour"))
			dimension = " (CAST(year as varchar ) || '/'  ||  CAST(month as varchar) || '/' || CAST(day as varchar) || ' ' || CAST(hour as varchar)) || ':00' ";*/

		if (combo2Value.equals("UrlVersion"))
			dimension = " (url || '-' || substr(to_char(mv,'099'),3) ) ";
		if (combo2Value.equals("YearMonth"))
			dimension = " (to_char(year,'9999') || '/' || substr(to_char(month,'099'),3)) ";
		if (combo2Value.equals("YearMonthDay"))
			dimension = " (to_char(year,'9999') || '/' || substr(to_char(month,'099'),3) || '/' || substr(to_char(day,'099'),3)) ";
		if (combo2Value.equals("YearMonthDayHour"))
			dimension = " (to_char(year,'9999') || '/' || substr(to_char(month,'099'),3) || '/' || substr(to_char(day,'099'),3) || ' ' || substr(to_char(hour,'099'),3) || ':00')  ";

		if (combo3Value.equals("3A"))
			orderbyfield=" dimension ASC ";
		else if (combo3Value.equals("3B"))
			orderbyfield=" measure ASC";
		else if (combo3Value.equals("3C"))
			orderbyfield=" dimension DESC";
		else if (combo3Value.equals("3D"))
			orderbyfield=" measure DESC";
		
		
		System.out.println("combo 1: " + combo1Value + " measure " + measure);
		System.out.println("combo 2: " + combo2Value);
		System.out.println("combo 3: " + combo3Value);
		System.out.println("combo 4: " + combo4Value);
		System.out.println("combo 5: " + combo5Value);
		
		wherestm="";
		if (combo4Value.equals("4A")) {
			if (combo5Value.equals("5B") || combo5Value.equals("5D"))
				wherestm = " where project='cmip5'";
		}  else if (combo4Value.equals("4B")) {
			if (combo5Value.equals("5A") || combo5Value.equals("5C"))
				wherestm = " where success=1";
			else if (combo5Value.equals("5B") || combo5Value.equals("5D"))
				wherestm = " where success=1 and project='cmip5'";
		} else if (combo4Value.equals("4C")) {
			if (combo5Value.equals("5A") || combo5Value.equals("5C"))
				wherestm = " where success=0";
			else if (combo5Value.equals("5B") || combo5Value.equals("5D"))
				wherestm = " where success=0 and project='cmip5'";
		} 
		System.out.println("Where : " + wherestm);	
		
		if (combo5Value.equals("5A") || combo5Value.equals("5B"))
				fromstm = "esgf_dashboard.finaldw_planB ";
		else
			fromstm = "esgf_dashboard.federationdw_planB ";
		System.out.println("From : " + fromstm);
		query = "Select " + dimension + " as dimension," + measure + "as measure from " + fromstm + wherestm + " group by dimension order by "+ orderbyfield;
		
		System.out.println("Query : " + query);
		
		Connection conn = null; 
		try {
			conn = Constants.DATASOURCE.getConnection();
//			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_ELAPSED_TIME_IN_TIME_INTERVAL.getSql());
			PreparedStatement stmt = conn.prepareStatement(query);			
			//stmt.setString(1, startTime);
			//stmt.setString(2, endTime);
			//System.out.println("Query: " + SqlQuery.GET_ELAPSED_TIME_IN_TIME_INTERVAL.getSql());
			ResultSet rs = stmt.executeQuery();
			elapsedTimeList = new LinkedList<ServiceStatus>();
			while(rs.next()) {
				
				//System.out.println("Trovato un elemento");
				String timestamp = rs.getString(1); //.substring(0, 16);
				//String first = timestamp.substring(0, 10);
				//String second = timestamp.substring(11);
				//timestamp = first + "\n" + second;
				//System.out.println("Timestamp " + timestamp);
				//double multiplier = Math.random(); // moltiplicatore per vedere la differenza nel grafico al ricaricamento dello store
				
				//int time = (int)(rs.getInt(2));  
				int time = (int)(rs.getLong(2));  
				ServiceStatus elapsedTime;
				
//				if (index != 0) {
//					int multiplier = index + 10;
//					elapsedTime = new ServiceStatus(timestamp, time*multiplier);
//				}
//				else {
				elapsedTime = new ServiceStatus(timestamp, time);
//				}
				elapsedTimeList.add(elapsedTime);
			}
			rs.close();
			stmt.close();
		} catch(SQLException e) {
			System.out.println("Query Error!");
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}	
		
		return SUCCESS;
	}

	public List<ServiceStatus> getElapsedTimeList() {
		return elapsedTimeList;
	}

	public void setElapsedTimeList(List<ServiceStatus> elapsedTimeList) {
		this.elapsedTimeList = elapsedTimeList;
	}

	public String getCombo1Value() {
		return combo1Value;
	}

	public void setCombo1Value(String combo1Value) {
		this.combo1Value = combo1Value;
	}

	public String getCombo2Value() {
		return combo2Value;
	}

	public void setCombo2Value(String combo2Value) {
		this.combo2Value = combo2Value;
	}

	public String getCombo3Value() {
		return combo3Value;
	}

	public void setCombo3Value(String combo3Value) {
		this.combo3Value = combo3Value;
	}

	public String getCombo4Value() {
		return combo4Value;
	}

	public void setCombo4Value(String combo4Value) {
		this.combo4Value = combo4Value;
	}

	public String getCombo5Value() {
		return combo5Value;
	}

	public void setCombo5Value(String combo5Value) {
		this.combo5Value = combo5Value;
	}

//	public String[] getDimensionsSelection() {
//		return dimensionsSelection;
//	}
//
//	public void setDimensionsSelection(String[] dimensionsSelection) {
//		this.dimensionsSelection = dimensionsSelection;
//	}
//
//	public String getStartDate() {
//		return startDate;
//	}
//
//	public void setStartDate(String startDate) {
//		this.startDate = startDate;
//	}
//
//	public String getEndDate() {
//		return endDate;
//	}
//
//	public void setEndDate(String endDate) {
//		this.endDate = endDate;
//	}
	
}
