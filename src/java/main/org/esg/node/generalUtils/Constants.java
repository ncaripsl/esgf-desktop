/*package generalUtils;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public abstract class Constants { 
	
	private final static String DATASOURCE_NAME = "java:/comp/env/jdbc/registry";
//	private final static String DATASOURCE_NAME = "java:/comp/env/jdbc/ophidiadb_2";

	public static DataSource DATASOURCE = null;
	
	static {
		try {
			DATASOURCE = ((DataSource)(new InitialContext()).lookup(Constants.DATASOURCE_NAME));
		} catch (NamingException e) {
			e.printStackTrace();
		}
	}
} */

package org.esg.node.generalUtils;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import org.postgresql.ds.PGSimpleDataSource;
import esg.common.util.ESGFProperties;

/**
 * @author CMCC - CMCC
 */
public abstract class Constants { 

        //private final static String DATASOURCE_NAME = "java:/comp/env/jdbc/esgcet";

        //public static DataSource DATASOURCE = null;
        public static PGSimpleDataSource DATASOURCE = null;
        public static String DASHBOARD_SERVICE_PATH = null;

        /*public static String getDASHBOARD_SERVICE_PATH() {
			return DASHBOARD_SERVICE_PATH;
		}
		public static void setDASHBOARD_SERVICE_PATH(String dASHBOARD_SERVICE_PATH) {
			DASHBOARD_SERVICE_PATH = dASHBOARD_SERVICE_PATH;
		}*/
		static {
                /*try {
                        DATASOURCE = ((DataSource)(new InitialContext()).lookup(Constants.DATASOURCE_NAME));
                } catch (NamingException e) {
                        e.printStackTrace();
                }*/
                try{
            ESGFProperties esgfProperties = new ESGFProperties();
            
            DATASOURCE = new PGSimpleDataSource();
            DATASOURCE.setDatabaseName(esgfProperties.getProperty("db.database")); //esgcet
            DATASOURCE.setServerName(esgfProperties.getProperty("db.host")); //localhost
            DATASOURCE.setUser(esgfProperties.getProperty("db.user")); //dbsuper
            DATASOURCE.setPassword(esgfProperties.getDatabasePassword()); //****
            DATASOURCE.setPortNumber(Integer.valueOf(esgfProperties.getProperty("db.port"))); //5432
            DASHBOARD_SERVICE_PATH = esgfProperties.getProperty("dashboard.ip.app.home");
        }catch (Throwable e) { e.printStackTrace(); System.out.println(e.getMessage()); }
        }
 
}


