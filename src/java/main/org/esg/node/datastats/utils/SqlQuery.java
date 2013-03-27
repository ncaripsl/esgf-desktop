package org.esg.node.datastats.utils;

public enum SqlQuery {
	
	// replace with the correct query
    GET_METRICS("SELECT year, month, downloads, files, users, gb FROM esgf_dashboard.finaldw_planb;"),
    GET_METRICS_TERABYTES("SELECT year, month, cast(gb as double precision)/1024 as tb FROM esgf_dashboard.finaldw_planb;");
	
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

