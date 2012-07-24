package org.esg.node.managementConsole.actions.json;

import java.util.LinkedList;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;

/**
 * @author CMCC
 */

public class TestAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private List<String> testJson = null;
	
	public String execute() throws Exception {
		
		testJson = new LinkedList<String>();
		testJson.add("Test String");
		
		return SUCCESS;
	}

	public List<String> getTestJson() {
		return testJson;
	}

	public void setTestJson(List<String> testJson) {
		this.testJson = testJson;
	}

}
