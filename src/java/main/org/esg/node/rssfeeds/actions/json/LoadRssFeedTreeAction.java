package org.esg.node.rssfeeds.actions.json;

import org.esg.node.generalUtils.Constants;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import org.esg.node.rssfeeds.beans.TreeNode;
import org.esg.node.rssfeeds.utils.SqlQuery;
import com.opensymphony.xwork2.ActionSupport;

/**
 * @author CMCC
 */

public class LoadRssFeedTreeAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private Integer idUser = 1; // da modificare quando ci sar� la sessione
	private List<TreeNode> projects = null;
	
	public String execute() throws Exception {
		
		Connection conn = null;
		try {
			conn = Constants.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(SqlQuery.GET_PROJECTS_HOSTS_RSSFEEDS.getSql());
			stmt.setInt(1, idUser);
			ResultSet rs = stmt.executeQuery();
			
			projects = new LinkedList<TreeNode>();
			
			int currentIdProjectValue = 0;
			int currentIdHostValue = 0;
			
			int currentProjectIndex = -1;
			int currentHostIndex = -1;
			
			while (rs.next()) {
				
				int idProject = rs.getInt("idproject");
				int idHost = rs.getInt("idhost");
				
				if (currentIdProjectValue != idProject) {
					
					// new project so currentIdHostValue and currentHostIndex restart from 0 and -1
					currentIdHostValue = 0;
					currentHostIndex = -1;
					
					// new project
					TreeNode projectNode = new TreeNode();
					projectNode.setText(rs.getString("pname"));
					projectNode.setExpandable(true);
					
					// new host
					TreeNode hostNode = new TreeNode();
					hostNode.setText(rs.getString("hname"));
					hostNode.setExpanded(true);
					hostNode.setExpandable(false);
					
					// new rss feed
					TreeNode rssfeedNode = new TreeNode();
					rssfeedNode.setText(rs.getString("title"));
					rssfeedNode.setHref(rs.getString("rssurl"));
					rssfeedNode.setIconCls("rssfeeds");
					rssfeedNode.setLeaf(true);
					
					// new feeds list
					List<TreeNode> feedsList = new LinkedList<TreeNode>();
					feedsList.add(rssfeedNode); // feed added
					
					hostNode.setChildren(feedsList); // setting feedsList as children of hostNode
					
					// new hosts list
					List<TreeNode> hostsList = new LinkedList<TreeNode>();
					hostsList.add(hostNode); // host added
					
					projectNode.setChildren(hostsList); // setting hostslist as children of projectNode*/
					projects.add(projectNode); // project added
					
					// values and indexes update
					currentIdProjectValue = idProject;
					currentProjectIndex++;
					
					currentIdHostValue = idHost;
					currentHostIndex++;
					
				}
				else if (currentIdHostValue != idHost) {
					
					// new host
					TreeNode hostNode = new TreeNode();
					hostNode.setText(rs.getString("hname"));
					hostNode.setExpanded(true);
					hostNode.setExpandable(false);
					
					// new rss feed
					TreeNode rssfeedNode = new TreeNode();
					// rssfeedNode.setId();
					rssfeedNode.setText(rs.getString("title"));
					rssfeedNode.setHref(rs.getString("rssurl"));
					rssfeedNode.setIconCls("rssfeeds");
					rssfeedNode.setLeaf(true);
					
					// new feeds list
					List<TreeNode> feedsList = new LinkedList<TreeNode>();
					feedsList.add(rssfeedNode); // feed added
					
					hostNode.setChildren(feedsList); // setting feedsList as children of hostNode
					
					projects.get(currentProjectIndex).getChildren().add(hostNode); // setting hostslist as children of projectNode
					
					// values and indexes update
					currentIdHostValue = idHost;
					currentHostIndex++;
					
				}
				else {
					
					// new rss feed
					TreeNode rssfeedNode = new TreeNode();
					// rssfeedNode.setId();
					rssfeedNode.setText(rs.getString("title"));
					rssfeedNode.setHref(rs.getString("rssurl"));
					rssfeedNode.setIconCls("rssfeeds");
					rssfeedNode.setLeaf(true);
					
					projects.get(currentProjectIndex).getChildren().get(currentHostIndex).getChildren().add(rssfeedNode);
					
				}
			}
			rs.close();
			stmt.close();
		} catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return SUCCESS;
		
	}


	public Integer getIdUser() {
		return idUser;
	}

	public void setIdUser(Integer idUser) {
		this.idUser = idUser;
	}

	public List<TreeNode> getProjects() {
		return projects;
	}

	public void setProjects(List<TreeNode> projects) {
		this.projects = projects;
	}

}
