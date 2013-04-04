package org.esg.node.realtime.utils;

public enum SqlQuery {
	
	GET_LOAD_AVG("SELECT time_stamp, loadavg FROM esgf_dashboard.realtime_loadavg limit 10;");
	
	private final String sql;
	
	private SqlQuery(final String sql) {
		this.sql = sql;	
	}
	
	public String getSql() {
		return sql;
	}	
}

