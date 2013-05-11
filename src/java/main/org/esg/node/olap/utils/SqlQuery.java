package org.esg.node.olap.utils;

/**
 * @author CMCC
 */

public enum SqlQuery {
	
/*	GET_PROJECTS_HOSTS("SELECT DISTINCT p.id AS idproject, p.name AS pname, h.id AS idhost, h.name AS hname " + 
			 "FROM project p " + 
		 	 "INNER JOIN `join` j ON j.idProject=p.id " +
		 	 "INNER JOIN uses u ON u.idProject=p.id " +
		 	 "INNER JOIN service_instance s ON s.id=u.idServiceInstance " +
		 	 "INNER JOIN host h ON s.idHost=h.id " +
		 	 "WHERE j.idUser=? " +
		 	 "AND u.endDate IS NULL " +
			 "ORDER BY p.id, h.id;"),*/
	
	GET_PROJECTS_HOSTS("SELECT DISTINCT p.id AS idproject, p.name AS pname, h.id AS idhost, h.name AS hname " + 
			 "FROM esgf_dashboard.project_dash p " + 
		 	 "INNER JOIN esgf_dashboard.join1 j ON j.idProject=p.id " +
		 	 "INNER JOIN esgf_dashboard.uses u ON u.idProject=p.id " +
		 	 "INNER JOIN esgf_dashboard.service_instance s ON s.id=u.idServiceInstance " +
		 	 "INNER JOIN esgf_dashboard.host h ON s.idHost=h.id " +
		 	 "WHERE j.idUser=? " +
		 	 "AND u.endDate IS NULL " +
			 "ORDER BY p.id, h.id;"),
	
	GET_ALL_ENTRIES("SELECT * FROM esgf_dashboard.finaldw where al_id>? and al_id<=(?+?) order by al_id;"),		 
	GET_ALL_ENTRIESB("SELECT year,month,downloads,files,users,gb, host FROM esgf_dashboard.finaldw_planb order by year, month;"),
	//GET_ALL_METRICS_NO_HOST("SELECT * FROM esgf_dashboard.sensor_table_datasets_nasajpl;"),
	//GET_ALL_METRICS_WITH_HOST("SELECT * FROM esgf_dashboard.sensor_table_datasets_nasajpl where host_name='192.168.250.138';"),

	GET_ELAPSED_TIME_IN_TIME_INTERVAL("SELECT timestamp, elapsedTime FROM esgf_dashboard.service_status WHERE timestamp BETWEEN ? AND ?;"),
	GET_DIMENSION1_VALUE("SELECT DISTINCT dimension1 FROM download;"),
	GET_DIMENSION2_VALUE("SELECT DISTINCT dimension2 FROM download;"),
	GET_DIMENSION3_VALUE("SELECT DISTINCT dimension3 FROM download;");
	
	private final String sql;
	
	SqlQuery(final String sql) {
		this.sql = sql;
	}

	public String getSql() {
		return sql;
	}
	
	@Override
	public String toString() {
		return getSql();
	}
}
