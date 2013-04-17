package org.esg.node.multimedia.actions.json;

/**
 * @author CMCC
 */

import org.esg.node.generalUtils.Constants;
import org.esg.node.multimedia.beans.TreeNode;

import java.io.File;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

import com.opensymphony.xwork2.ActionSupport;

public class LoadCategoryTreeAction extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	private List<TreeNode> categories = null;
	
	public String execute() throws Exception {
		try {
//			ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
//			URL url = classLoader.getResource(".");
//			System.out.println(url);
			
			//String path = "/home/paolanassisi/workspaceESGFdesktop/esgf-desktop/resources/multimediacategories.txt";
			//String path = Constants.DASHBOARD_SERVICE_PATH +"/multimedia.txt";
			
			String path = System.getenv("ESGF_HOME");
			
			//String path = "/esg/";
			if (path == null)
				path = "/esg/";
			
			path = path +"/config/esgf-desktop/multimedia.txt";
			
			System.out.println("path => " + path);
			
			File file = new File(path);
			Scanner input = new Scanner(file);
			
			int categoryindex = 0;
			int nodeindex     = 0;
			String iconCls    = "";
			
			categories = new LinkedList<TreeNode>();
			TreeNode categoryNode = null;
//			categories.add(categoryNode);
			List<TreeNode> links = null;

			while(input.hasNext()) {
//			    String nextToken = input.next();
			    //to process line by line
			    String nextLine = input.nextLine();
//			    System.out.println(nextLine);
			    int separator = nextLine.indexOf("=");
			    String nodelabel = nextLine.substring(0, separator);
			    String value = nextLine.substring(separator+1);
			    
			    if (nodelabel.equals("category")) {
			    	if (categoryNode != null) {
//			    		categoryNode.setChildren(links);
			    		categories.add(categoryNode);
			    	}
			    	categoryNode = new TreeNode();
				    categoryNode.setText(value);
				    categoryNode.setExpandable(true);
				    categoryNode.setExpanded(true);
				    
				    if (value.equals("WEB"))
				    	iconCls = "web-multimedia";
				    else if (value.equals("IMAGE"))
				    	iconCls = "img-multimedia";
				    else if (value.equals("VIDEO"))
				    	iconCls = "video-multimedia";
				    else if (value.equals("TWITTER"))
				    	iconCls = "twitter-multimedia";
				    categoryNode.setIconCls(iconCls);
				    
				    links = new LinkedList<TreeNode>();
				    categoryNode.setChildren(links);
				    categoryindex++;
				    nodeindex = 0;
				    //System.out.println("category: " + value);
			    }
			    else {
			    	TreeNode linkNode = new TreeNode();
			    	linkNode.setText(nodelabel);
			    	linkNode.setMyObject(value);
			    	linkNode.setIdtab("" + (categoryindex-1) + nodeindex);
			    	linkNode.setLeaf(true);
			    	linkNode.setExpandable(false);
			    	linkNode.setExpanded(false);
			    	linkNode.setIconCls(iconCls);
			    	links.add(linkNode);
			    	nodeindex++;
			    	//System.out.println("link: " + nodelabel);
			    }
			}
			categories.add(categoryNode);
			input.close();
		} catch(Exception e) {
			e.printStackTrace();
			System.out.println("got the exception: " + e.toString());
			return ERROR;
		} finally {
//			if(conn != null) conn.close();
		}
		return SUCCESS;
	}

	public List<TreeNode> getCategories() {
		return categories;
	}

	public void setCategories(List<TreeNode> categories) {
		this.categories = categories;
	}
}
