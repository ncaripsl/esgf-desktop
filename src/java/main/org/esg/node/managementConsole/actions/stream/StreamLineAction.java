package org.esg.node.managementConsole.actions.stream;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.opensymphony.xwork2.ActionSupport;

/**
 * @author CMCC
 */

public class StreamLineAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private String commandLine;
	private InputStream inputStream;
	
	
	public String execute() throws Exception {
		
		String output = "";
		try {  
            Process p = Runtime.getRuntime().exec(commandLine);  
            BufferedReader in = new BufferedReader(  
                                new InputStreamReader(p.getInputStream()));  
            String line = null;
            while ((line = in.readLine()) != null) {  
                System.out.println("line: " + line);
                output += "\n" + line;
            }
        } catch (IOException e) {  
            e.printStackTrace();
            output += e.getMessage();
        }
		
		inputStream = new ByteArrayInputStream((output).getBytes());
        return SUCCESS;
    }
	

	public String getCommandLine() {
		return commandLine;
	}

	public void setCommandLine(String commandLine) {
		this.commandLine = commandLine;
	}

	public InputStream getInputStream() {
		return inputStream;
	}

	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}
	
}
