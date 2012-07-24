package org.esg.node.rssfeeds.utils;

/**
 * @author CMCC
 */

public enum SqlQuery {
	
/*	GET_PROJECTS_HOSTS_RSSFEEDS("SELECT DISTINCT p.id AS idproject, p.name AS pname, h.id AS idhost, h.name AS hname, r.idrssfeed, r.title, r.rssfeed AS rssurl " + 
						 "FROM project p " + 
					 	 "INNER JOIN `join` j ON j.idProject=p.id " +
					 	 "INNER JOIN uses u ON u.idProject=p.id " +
					 	 "INNER JOIN service_instance s ON s.id=u.idServiceInstance " +
					 	 "INNER JOIN host h ON s.idHost=h.id " +
					 	 "INNER JOIN hasfeed has ON has.idhost=h.id " +
					 	 "INNER JOIN rssfeed r ON r.idrssfeed=has.idrssfeed " +
					 	 "WHERE j.idUser=? " +
					 	 "AND u.endDate IS NULL " +
						 "ORDER BY p.id, h.id, r.idrssfeed;");*/
	
	GET_PROJECTS_HOSTS_RSSFEEDS("SELECT DISTINCT p.id AS idproject, p.name AS pname, h.id AS idhost, h.name AS hname, r.idrssfeed, r.title, r.rssfeed AS rssurl " + 
			 "FROM esgf_dashboard.project_dash p " + 
		 	 "INNER JOIN esgf_dashboard.join1 j ON j.idProject=p.id " +
		 	 "INNER JOIN esgf_dashboard.uses u ON u.idProject=p.id " +
		 	 "INNER JOIN esgf_dashboard.service_instance s ON s.id=u.idServiceInstance " +
		 	 "INNER JOIN esgf_dashboard.host h ON s.idHost=h.id " +
		 	 "INNER JOIN esgf_dashboard.hasfeed has ON has.idhost=h.id " +
		 	 "INNER JOIN esgf_dashboard.rssfeed r ON r.idrssfeed=has.idrssfeed " +
		 	 "WHERE j.idUser=? " +
		 	 "AND u.endDate IS NULL " +
			 "ORDER BY p.id, h.id, r.idrssfeed;");
	
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
