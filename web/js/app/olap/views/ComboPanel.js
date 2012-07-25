/**
 * @author CMCC
 */

Ext.define('MyDesktop.olap.views.ComboPanel', {
    extend   : 'Ext.panel.Panel',
    
    alias    : 'widget.comboPanel',
    
    initComponent : function() {
        Ext.apply(this, {
        	id         : 'olapComboPanel',
        	title      : 'Search Settings',
            region     : 'north',
            bodyStyle  : 'padding: 15px;',
            layout     : 'anchor',
    	    defaults   : {
            	anchor : '100%'
            },
            collapsible : true,
        	items : [{
   	            	xtype     : 'panel',
   	            	layout    : 'hbox',
   	            	border    : false,
   	            	bodyStyle : 'padding:5px 5px 5px',
   	            	items     : [{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'YAxis',
   	            		id           : 'olapcombo1',
   	            		disabled     : true,
   	            		labelWidth   : 50,
   	            		flex         : 1,
   	            		value        : 'Number Downloads',
   	            	    store        : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        //{"label":"Number Downloads", "value":'A'},
		   	            	        {"label":"Number Downloads", "value":'Number Downloads'},
		   	            	        {"label":"Number Downloads (x1000)", "value":'Number Downloads (x1000)'}, 
		   	            	        {"label":"Downloaded Data (MBytes)", "value":'Downloaded Data (MBytes)'},
		   	            	        {"label":"Downloaded Data (GBytes)", "value":'Downloaded Data (GBytes)'},
		   	            	        {"label":"Downloaded Data (TBytes)", "value":'Downloaded Data (TBytes)'},
		   	            	        {"label":"Downloaded Data (PBytes)", "value":'Downloaded Data (PBytes)'}
//		   	            	        {"label":"Max", "value":"C"}
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	},{
   	            		xtype : 'component',
   	            		width : 15
   	            	},{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'XAxis',
   	            		id           : 'olapcombo2',
   	            		disabled     : true,
   	            		labelWidth   : 50,
   	            		flex         : 1,
   	            		value        : 'Project',
   	            	    store : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        {"label":"Project", "value":"Project"},
		   	            	        {"label":"Model", "value":"Model"},
		   	            	        {"label":"Experiment", "value":"Experiment"},
		   	            	        {"label":"Realm", "value":"Realm"},
		   	            	        {"label":"Variable", "value":"Variable"},
		   	            	        {"label":"PeerNode", "value":"PeerNode"},       	        
		   	            	//      {"label":"Url", "value":"Url"},
		   	            	//      {"label":"UrlVersion", "value":"UrlVersion"},
		   	            	        {"label":"User (hashed)", "value":"User (hashed)"},
		   	            	        {"label":"User Idp", "value":"User Idp"},
		   	            	        {"label":"Year", "value":"Year"},
		   	            	        {"label":"YearMonth", "value":"YearMonth"},
		   	            	        {"label":"YearMonthDay", "value":"YearMonthDay"},
		   	            	   //     {"label":"YearMonthDayHour", "value":"YearMonthDayHour"},
		   	            	        {"label":"Hour", "value":"Hour"},
		   	            	        {"label":"Institute", "value":"Institute"},
		   	            	        {"label":"Ensemble", "value":"Ensemble"},
		   	            	        {"label":"Time Frequency", "value":"Time Frequency"},
		   	            	        {"label":"Cmor Table", "value":"Cmor Table"},
		   	            	        {"label":"Product", "value":"Product"},
		   	            	        {"label":"Data Service type", "value":"Data Service type"},
		   	            	        {"label":"Remote Client", "value":"Remote Client"}
		   	            	        //{"label":"Dataset Name", "value":"Dataset Name"}
		   	            	        
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	},{
   	            		xtype : 'component',
   	            		width : 15
   	            	},{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'Order',
   	            		id           : 'olapcombo3',
   	            		disabled     : true,
   	            		labelWidth   : 50,
   	            		flex         : 1,
   	            		value        : '3A',
   	            	    store        : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        {"label":"XAxis ASC", "value":"3A"},
		   	            	        {"label":"YAxis ASC", "value":"3B"},
		   	            	        {"label":"XAxis DESC", "value":"3C"},
		   	            	        {"label":"YAxis DESC", "value":"3D"}
		   	            	        //{"label":"I", "value":"I"}
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	}]
   	            },{
   	            	xtype     : 'panel',
   	            	layout    : 'hbox',
   	            	border    : false,
   	            	bodyStyle : 'padding:5px 5px 5px',
   	            	items     : [{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'Filter',
   	            		id           : 'olapcombo4',
   	            		disabled     : true,
   	            		labelWidth   : 50,
   	            		flex         : 1,
   	            		value        : '4A',
   	            	    store : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        {"label":"All Downloads", "value":"4A"},
		   	            	        {"label":"Successful downloads", "value":"4B"},
		   	            	        {"label":"Failed downloads", "value":"4C"}
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	},{
   	            		xtype : 'component',
   	            		width : 15
   	            	},{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'Source',
   	            		id           : 'olapcombo5',
   	            		disabled     : true,
   	            		labelWidth   : 50,
   	            		flex         : 1,
   	            		value        : '5A',
   	            	    store : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        {"label":"Local (All Projects)", "value":"5A"},
		   	            	        {"label":"Local (CMIP5)", "value":"5B"},
		   	            	        {"label":"Federation (All Projects)", "value":"5C"},
		   	            	        {"label":"Federation (CMIP5)", "value":"5D"}
		   	            	        //{"label":"O", "value":"O"}
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	},{
   	            		xtype : 'component',
   	            		width : 15
   	            	},{
   	            		xtype : 'button',
   	            		text  : 'Display',
   	            		disabled     : true,
   	            		id       : 'olapbutton',
   	            		flex  : 1,
   	            		listeners: {
   	            	        click: this.display
   	            	    }
   	            	}]
   	            },{
   	            	xtype     : 'panel',
   	            	border    : false,
   	            	bodyStyle : 'padding:10px 10px 10px',
   	            }]
        }); 
        this.callParent();
    },
    
    display: function() {
    	if (Ext.getCmp('olapProjectHostTreePanel').getSelectionModel().getSelection().length != 0 && Ext.getCmp('olapProjectHostTreePanel').getSelectionModel().getSelection()[0].get('leaf')) {
    		
    		// prelevo il nome dell'host selezionato
    		var hostName = Ext.getCmp('olapProjectHostTreePanel').getSelectionModel().getSelection()[0].get('text');
    		
    		// prelevo il contenuto delle combo boxes
    		var combo1Value = Ext.getCmp('olapcombo1').getValue();
            var combo2Value = Ext.getCmp('olapcombo2').getValue();
            var combo3Value = Ext.getCmp('olapcombo3').getValue();
            var combo4Value = Ext.getCmp('olapcombo4').getValue();
            var combo5Value = Ext.getCmp('olapcombo5').getValue();
            
         // imposto il proxy e carico lo store
            Ext.getStore('olapChartGridStore').setProxy({
 		    	type: 'ajax',
 		    	//url: 'http://' + hostName + ':8080/Desktop/olapJson/getElapsedTime',
 		    	url: 'http://' + hostName + '/esgf-desktop/olapJson/getElapsedTime',
 		    	//url: 'http://192.168.250.138:8080/Desktop/olapJson/getElapsedTime',
 		        reader: {
 		            type: 'json'
 		        }
 		    });
            Ext.getStore('olapChartGridStore').load({
     		    params:{
     		    	combo1Value : combo1Value,
     		    	combo2Value : combo2Value,
     		    	combo3Value : combo3Value,
     		    	combo4Value : combo4Value,
     		    	combo5Value : combo5Value
    		    }
    		});
            
            // su 'onLoad' dello store, abilito i pulsanti e mostro il grafico
            Ext.getStore('olapChartGridStore').on('load', function(records) {
            	if (records.getTotalCount() > 1) {
                    Ext.getCmp('olapCSVButton').enable();
                    Ext.getCmp('olapGridButton').enable();
                    Ext.getCmp('olapColumnChartButton').enable();
                    Ext.getCmp('olapLineChartButton').enable();
                    Ext.getCmp('olapAreaChartButton').enable();
       			}
            	// line e area chart non funzionano per un solo elemento
            	// quindi li disabilito
            	else if (records.getTotalCount() == 1) { 
                    Ext.getCmp('olapCSVButton').enable();
                    Ext.getCmp('olapGridButton').enable();
                    Ext.getCmp('olapColumnChartButton').enable();
                    Ext.getCmp('olapLineChartButton').disable();
                    Ext.getCmp('olapAreaChartButton').disable();
            	}
            	
            	// se la modalit� di rappresentazione selezionata � quella del grafico
            	// elimino la modalit� hidden
            	if(Ext.getCmp('olapchart')) {
            		Ext.getCmp('olapchart').show();
            		Ext.getCmp('olapChartGrid').enable();
                	
                	// modifico i titoli degli assi con il contenuto delle combo
            		xAxisTitle = combo2Value;
            		yAxisTitle = combo1Value;
                	Ext.getCmp('olapchart').axes.get('bottom').setTitle(xAxisTitle);
                	Ext.getCmp('olapchart').axes.get('left').setTitle(yAxisTitle);
            	}
            	else if (Ext.getCmp('olapgrid')) {
            		 Ext.ComponentManager.get('firstColumn').setText(combo1Value);
            		 Ext.ComponentManager.get('secondColumn').setText(combo2Value);
            		}
            });
            
    	}
    	else
    		Ext.MessageBox.alert('Alert Message','Please, select a P2P node.');
    }
});
