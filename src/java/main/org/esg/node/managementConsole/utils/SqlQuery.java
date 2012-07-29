package org.esg.node.managementConsole.utils;

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
	
	GET_HOSTS("SELECT name FROM esgf_dashboard.host order by name;");
	
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
