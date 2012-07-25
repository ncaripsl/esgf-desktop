package org.esg.node.rssfeeds.actions.inputstream;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import com.opensymphony.xwork2.ActionSupport;

/**
 * @author CMCC
 */

public class FeedProxy extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	private String feed = null;
	private InputStream outputXML = null;;

	public String execute() throws Exception {
		
		try {
			URL url = new URL(feed);
			
			BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));

			String inputLine;
			String output = "";
			boolean checkContains1;

			while ((inputLine = in.readLine()) != null) {
				if (checkContains1=inputLine.contains("<category")==false)
					output += inputLine;
			}
			
			in.close();
						 
			/*if (output.contains("<?xml version")) {
				output = output.replaceAll("<content:encoded>", "<content>");
				output = output.replaceAll("</content:encoded>", "</content>");
				output = output.replaceAll("</dc:creator>", "</author>");
				output = output.replaceAll("<dc:creator", "<author");			
			}*/
			
			outputXML = new ByteArrayInputStream(output.getBytes());
		}
		catch (MalformedURLException e){
			e.printStackTrace();
			return ERROR;
		}
		catch (IOException e) {
		    e.printStackTrace();
		    return ERROR;
	    }		
		
		return SUCCESS;
	}

	public String getFeed() {
		return feed;
	}

	public void setFeed(String feed) {
		this.feed = feed;
	}

	public InputStream getOutputXML() {
		return outputXML;
	}

	public void setOutputXML(InputStream outputXML) {
		this.outputXML = outputXML;
	}
	
}
