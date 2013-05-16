package org.esg.node.sensorstats.actions.json;

/**
 * @author CMCC
 */

import java.io.File;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

import org.esg.node.sensorstats.beans.TreeNode;

import com.opensymphony.xwork2.ActionSupport;

public class LoadCategoryTreeAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	private List<TreeNode> sensors = null;
	
	public String execute() throws Exception {
		try {
			
			//String path = "/esg/config/dashboard/infoprovider.properties";
			String path = System.getenv("ESGF_HOME");
			
			//String path = "/esg/";
			if (path == null)
				path = "/esg/";
			
			path = path +"/config/dashboard/infoprovider.properties";
			
			File file = new File(path);
			Scanner input = new Scanner(file);
			
			int nodeindex     = 0;
			
			sensors = new LinkedList<TreeNode>();
			
			TreeNode categoryNode = null;

			while(input.hasNext()) {
			    String nextLine = input.nextLine();
			    
			    if (nextLine.hashCode() != 0) {
			    	int separator = nextLine.indexOf("=");
				    String nodelabel = nextLine.substring(0, separator);
				    String value = nextLine.substring(separator+1);
				    
				    if (nodelabel.equals("sensor")) {
				    	categoryNode = new TreeNode();
				    	categoryNode.setText(value);
				    	categoryNode.setMyObject(value);
				    	categoryNode.setExpandable(false);
				    	categoryNode.setExpanded(false);
				    	categoryNode.setIconCls("sensors");
				    	categoryNode.setIdtab(nodeindex);
				    	categoryNode.setLeaf(true);
				    	nodeindex++;
				    	
				    	sensors.add(categoryNode);
				    }
				    else if (nodelabel.equals("table"))
				    	categoryNode.setMyObject(value);
			    }
			    
			}
			input.close();
		} catch(Exception e) {
			return ERROR;
		} finally {
//			if(conn != null) conn.close();
		}
		return SUCCESS;
	}

	public List<TreeNode> getSensors() {
		return sensors;
	}

	public void setSensors(List<TreeNode> sensors) {
		this.sensors = sensors;
	}

}
