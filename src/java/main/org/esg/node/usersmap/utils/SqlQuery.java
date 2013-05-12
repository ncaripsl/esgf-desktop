package org.esg.node.usersmap.utils;

/**
 * @author CMCC
 */

public enum SqlQuery {
	
//	INSERT_CLIENTS("INSERT INTO esgf_dashboard.client_stats VALUES ('adm07.cmcc.it', ?, ?, ?, 1);"),
	
	GET_PROJECTS("SELECT DISTINCT p.id AS idproject, p.name AS pname " +
				 "FROM esgf_dashboard.project_dash p " +
			     "INNER JOIN esgf_dashboard.join1 j ON j.idProject=p.id " +
				 "INNER JOIN  esgf_dashboard.uses u ON u.idProject=p.id " +
			     "WHERE j.idUser=? AND u.endDate IS NULL " +
				 "ORDER BY p.name;"),
	
	 GET_PROJECTS_HOSTS("SELECT DISTINCT p.id AS idproject, p.name AS pname, h.id AS idhost, h.name AS hname " + 
			 "FROM esgf_dashboard.project_dash p " + 
		 	 "INNER JOIN esgf_dashboard.join1 j ON j.idProject=p.id " +
		 	 "INNER JOIN esgf_dashboard.uses u ON u.idProject=p.id " +
		 	 "INNER JOIN esgf_dashboard.service_instance s ON s.id=u.idServiceInstance " +
		 	 "INNER JOIN esgf_dashboard.host h ON s.idHost=h.id " +
		 	 "WHERE j.idUser=? " +
		 	 "AND u.endDate IS NULL " +
			 "ORDER BY p.name, h.name;"),
	
	GET_COUNTRIES_HOST("SELECT DISTINCT country " +
			 "FROM esgf_dashboard.client_stats_dm " +
			 "WHERE host=? " +
			 "ORDER BY country;"),
	
	GET_CLIENTS_LOCATION_BY_HOST("SELECT lat, lon, country, numclient FROM esgf_dashboard.client_stats_dm"),
	
	GET_CLIENTS_LOCATION_BY_HOST_AND_COUNTRY("SELECT lat, lon, country, numclient " +
			 "FROM esgf_dashboard.client_stats_dm " +
			 "WHERE host=? " +
			 "AND country=?;");
	
				 
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
