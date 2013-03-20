package org.esg.node.datastats.actions.stream;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.esg.node.generalUtils.Constants;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.opensymphony.xwork2.ActionSupport;

public class DatastatsXMLAction_old extends ActionSupport {
	
	private static final long serialVersionUID = 1L;
	
	private String datastatsmetric = null;
	private String datastatsdim    = null;
	private String datastatsorder  = null;
	private String datastatssource = null;
	
	private InputStream stream = null;
	
	public String execute() throws Exception {
		
		String measure = "";
		String dimension = "";
		String orderbyfield = "";
		String fromstm = "esgf_dashboard.table_stats";
		
		if (datastatsmetric.equals("Number Downloads"))
			measure = "SUM(downloads)";
		else if (datastatsmetric.equals("Number Files"))
			measure = "SUM(files)";
		else if (datastatsmetric.equals("Number Users"))
			measure = "SUM(users)";
		else if (datastatsmetric.equals("Downloaded Data (GBytes)"))
			measure = "SUM(gb)";
		else if (datastatsmetric.equals("Downloaded Data (TBytes)"))
			measure = "SUM(cast(gb as double precision))/1024";
		
		if (datastatsdim.equals("Year"))
			dimension = "year";
		else if (datastatsdim.equals("YearMonth"))
			dimension = "(to_char(year,'9999') || '/' || substr(to_char(month,'099'),3))";
		else if (datastatsdim.equals("Host"))
			dimension = "host";
		
		if (datastatsorder.equals("3A"))
			orderbyfield="dimension ASC ";
		else if (datastatsorder.equals("3B"))
			orderbyfield="measure ASC";
		else if (datastatsorder.equals("3C"))
			orderbyfield="dimension DESC";
		else if (datastatsorder.equals("3D"))
			orderbyfield="measure DESC";
		
		/*if (datastatssource.equals("5B"))
			fromstm=" dimension ASC ";
		else if (datastatssource.equals("5D"))
			fromstm=" measure ASC";*/
		
		String query = "SELECT " + dimension + " AS dimension, " + measure + " AS measure FROM " + fromstm + " GROUP BY dimension ORDER BY " + orderbyfield;
		
		System.out.println("query: " + query);
		
		Connection conn = null;
		try {
			conn = Constants.DATASOURCE.getConnection();
			PreparedStatement stmt = conn.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();
			
			DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder docBuilder = docFactory.newDocumentBuilder();

			// root elements
			Document doc = docBuilder.newDocument();
			Element rootElement = doc.createElement("datastats"); // cambiare la root
			doc.appendChild(rootElement);

			while (rs.next()) {
				// dimension elements
				Element dim = doc.createElement("datastatsdim");
				rootElement.appendChild(dim);
				// set attribute to dimension element
				Attr dimattr = doc.createAttribute("value");
				dimattr.setValue(datastatsdim);
				dim.setAttributeNode(dimattr);
				
				// measure elements
				Element meas = doc.createElement("datastatsmetric");
				rootElement.appendChild(meas);
				// set attribute to measure element
				Attr measattr = doc.createAttribute("value");
				measattr.setValue(datastatsmetric);
				meas.setAttributeNode(measattr);
			}
			rs.close();
			stmt.close();
			
			// write the content into xml file
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource source = new DOMSource(doc);
			StreamResult result = new StreamResult(new File("/home/paolanassisi/DataStatistics.xml"));
	 
			// Output to console for testing
			// StreamResult result = new StreamResult(System.out);
	 
			transformer.transform(source, result);
	 
			System.out.println("File saved!");
//			stream = new ByteArrayInputStream(result.getOutputStream());
			
		} catch(SQLException e) {
			return ERROR;
		} finally {
			if(conn != null) conn.close();
		}
		return SUCCESS;
	}

	public String getDatastatsmetric() {
		return datastatsmetric;
	}

	public void setDatastatsmetric(String datastatsmetric) {
		this.datastatsmetric = datastatsmetric;
	}

	public String getDatastatsdim() {
		return datastatsdim;
	}

	public void setDatastatsdim(String datastatsdim) {
		this.datastatsdim = datastatsdim;
	}

	public String getDatastatsorder() {
		return datastatsorder;
	}

	public void setDatastatsorder(String datastatsorder) {
		this.datastatsorder = datastatsorder;
	}

	public String getDatastatssource() {
		return datastatssource;
	}

	public void setDatastatssource(String datastatssource) {
		this.datastatssource = datastatssource;
	}

	public InputStream getStream() {
		return stream;
	}

	public void setStream(InputStream stream) {
		this.stream = stream;
	}
	
}
