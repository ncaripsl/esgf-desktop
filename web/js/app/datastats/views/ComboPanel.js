/**
 * @author CMCC
 */

Ext.define('MyDesktop.datastats.views.ComboPanel', {
    extend   : 'Ext.panel.Panel',
    
    alias    : 'widget.comboPanel',
    
    initComponent : function() {
        Ext.apply(this, {
        	id         : 'datastatsComboPanel',
        	title      : 'Search Settings',
            region     : 'north',
            bodyStyle  : 'padding: 10px 5px 10px 5px;',
            layout     : 'anchor',
    	    defaults   : {
            	anchor : '100%'
            },
            collapsible : true,
        	items : [{
   	            	xtype     : 'panel',
   	            	layout    : 'hbox',
   	            	border    : false,
   	            	items     : [{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'YAxis',
   	            		id           : 'datastatsmetric',
   	            		labelWidth   : 40,
   	            		style        : 'margin:5px',
   	            		flex         : 1,
   	            		value        : 'Number Downloads',
   	            	    store        : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        {"label":"Number Downloads", "value":'Number Downloads'},
		   	            	        {"label":"Number Files", "value":'Number Files'},
		   	            	        {"label":"Number Users", "value":'Number Users'}, 
		   	            	        {"label":"Downloaded Data (GBytes)", "value":'Downloaded Data (GBytes)'},
		   	            	        {"label":"Downloaded Data (TBytes)", "value":'Downloaded Data (TBytes)'}
		   	            	        
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	},{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'XAxis',
   	            		id           : 'datastatsdim',
   	            		labelWidth   : 40,
   	            		style        : 'margin:5px 15px',
   	            		flex         : 1,
   	            		value        : 'Year',
   	            	    store : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        {"label":"Year", "value":"Year"},
		   	            	        {"label":"YearMonth", "value":"YearMonth"},
		   	            	        {"label":"Host", "value":"Host"}
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	}/*,{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'Start Year',
   	            		id           : 'datastatsstartyear',
   	            		disabled     : true,
   	            		labelWidth   : 40,
   	            		style        : 'margin:5px',
   	            		flex         : 1,
   	            		value        : '2013',
   	            	    store        : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        {"label":"2013", "value":"2013"},
		   	            	        {"label":"2012", "value":"2012"}
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	},{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'Start Month',
   	            		id           : 'datastatsstartmonth',
   	            		disabled     : true,
   	            		labelWidth   : 40,
   	            		style        : 'margin:5px',
   	            		flex         : 1,
   	            		value        : 'Jan',
   	            	    store : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        {"label":"Jan", "value":"Jan"},
		   	            	        {"label":"Feb", "value":"Feb"},
		   	            	        {"label":"Mar", "value":"Mar"},
		   	            	        {"label":"Apr", "value":"Apr"},
		   	            	        {"label":"May", "value":"May"},
		   	            	        {"label":"Jun", "value":"Jun"},
		   	            	        {"label":"Jul", "value":"Jul"},
		   	            	        {"label":"Ago", "value":"Ago"},
		   	            	        {"label":"Sep", "value":"Sep"},
		   	            	        {"label":"Oct", "value":"Oct"},
		   	            	        {"label":"Nov", "value":"Nov"},
		   	            	        {"label":"Dec", "value":"Dec"}
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	}*/]
   	            },{
   	            	xtype     : 'panel',
   	            	layout    : 'hbox',
   	            	border    : false,
   	            	items     : [
   	            	 {
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'Order',
   	            		id           : 'datastatsorder',
   	            		//disabled     : true,
   	            		labelWidth   : 40,
   	            		style        : 'margin:5px',
   	            		flex         : 1,
   	            		value        : '3A',
   	            	    store        : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        {"label":"XAxis ASC", "value":"3A"},
		   	            	        {"label":"YAxis ASC", "value":"3B"},
		   	            	        {"label":"XAxis DESC", "value":"3C"},
		   	            	        {"label":"YAxis DESC", "value":"3D"}
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	},{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'Source',
   	            		id           : 'datastatssource',
   	            		//disabled     : true,
   	            		labelWidth   : 40,
   	            		style        : 'margin:5px 15px',
   	            		flex         : 1,
   	            		value        : '5B',
   	            	    store : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        //{"label":"Local (All Projects)", "value":"5A"},
		   	            	        {"label":"Local (CMIP5)", "value":"5B"},
		   	            	        //{"label":"Federation (All Projects)", "value":"5C"},
		   	            	        {"label":"Federation (CMIP5)", "value":"5D"}
		   	            	        //{"label":"O", "value":"O"}
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	}/*,{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'End Year',
   	            		id           : 'datastatsendyear',
   	            		disabled     : true,
   	            		labelWidth   : 40,
   	            		style        : 'margin:5px',
   	            		flex         : 1,
   	            		value        : '2013',
   	            	    store        : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        {"label":"2013", "value":"2013"},
		   	            	        {"label":"2012", "value":"2012"}
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	},{
   	            		xtype        : 'combo',
   	            		fieldLabel   : 'End Month',
   	            		id           : 'datastatsendmonth',
   	            		disabled     : true,
   	            		labelWidth   : 40,
   	            		style        : 'margin:5px',
   	            		flex         : 1,
   	            		value        : 'Jan',
   	            	    store : {
	   	            	     fields : ['label', 'value'],
	   	            	     data   : [
		   	            	        {"label":"Jan", "value":"Jan"},
		   	            	        {"label":"Feb", "value":"Feb"},
		   	            	        {"label":"Mar", "value":"Mar"},
		   	            	        {"label":"Apr", "value":"Apr"},
		   	            	        {"label":"May", "value":"May"},
		   	            	        {"label":"Jun", "value":"Jun"},
		   	            	        {"label":"Jul", "value":"Jul"},
		   	            	        {"label":"Ago", "value":"Ago"},
		   	            	        {"label":"Sep", "value":"Sep"},
		   	            	        {"label":"Oct", "value":"Oct"},
		   	            	        {"label":"Nov", "value":"Nov"},
		   	            	        {"label":"Dec", "value":"Dec"}
		   	            	    ]
	   	            	},
   	            	    queryMode    : 'local',
   	            	    displayField : 'label',
   	            	    valueField   : 'value'
   	            	}*/]
   	            },{
   	            	xtype     : 'panel',
   	            	layout    : 'hbox',
   	            	border    : false,
   	            	bodyStyle : 'padding:5px 300px 5px',
   	            	items     : [{
   	            		xtype : 'button',
   	            		text  : 'Display',
   	            		id       : 'datastatsbutton',
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
		// get content of combo boxes
    	datastatsmetric = Ext.getCmp('datastatsmetric').getValue();
	    datastatsdim    = Ext.getCmp('datastatsdim').getValue();
	    datastatsorder  = Ext.getCmp('datastatsorder').getValue();
	    datastatssource = Ext.getCmp('datastatssource').getValue();
        
        // set proxy and load store
        Ext.getStore('datastatsChartGridStore').setProxy({
	    	type: 'ajax',
	    	url: 'datastatsJson/loadDatastats',
	        reader: {
	            type: 'json'
	        }
	    });
        Ext.getStore('datastatsChartGridStore').load({
 		    params:{
 		    	datastatsmetric : datastatsmetric,
 		    	datastatsdim    : datastatsdim,
 		    	datastatsorder  : datastatsorder,
 		    	datastatssource : datastatssource
		    }
		});
        if(Ext.getCmp('datastatschart')) {
        	Ext.getCmp('datastatschart').setLoading(true);
        }
        
        // when the store is loaded, enable buttons and show chart
        Ext.getStore('datastatsChartGridStore').on('load', function(records) {
        	if (records.getTotalCount() > 1) {
                Ext.getCmp('datastatsCSVButton').enable();
                Ext.getCmp('datastatsGridButton').enable();
                Ext.getCmp('datastatsColumnChartButton').enable();
                Ext.getCmp('datastatsLineChartButton').enable();
                Ext.getCmp('datastatsAreaChartButton').enable();
   			}
        	// if the number of results is only one, disable line and area chart
        	else if (records.getTotalCount() == 1) { 
                Ext.getCmp('datastatsCSVButton').enable();
                Ext.getCmp('datastatsGridButton').enable();
                Ext.getCmp('datastatsColumnChartButton').enable();
                if (!Ext.getCmp('datastatsGridButton').pressed)
                    Ext.getCmp('datastatsColumnChartButton').toggle(true);
                Ext.getCmp('datastatsLineChartButton').disable();
                Ext.getCmp('datastatsAreaChartButton').disable();
        	}
        	
        	// if type of data visualization is chart, remove chart hidden mode
        	if(Ext.getCmp('datastatschart')) {
        		Ext.getCmp('datastatschart').show();
        		Ext.getCmp('datastatschart').setLoading(false);
        		Ext.getCmp('datastatsChartGrid').enable();
            	
            	// change y axes label with the content of selected combo
            	Ext.getCmp('datastatschart').axes.get('left').setTitle(datastatsmetric);
            	Ext.getCmp('datastatschart').axes.get('bottom').setTitle(datastatsdim);
        	}
        	else if (Ext.getCmp('datastatsgrid')) {
        		Ext.ComponentManager.get('firstColumn').setText(datastatsmetric);
        		Ext.ComponentManager.get('secondColumn').setText(datastatsdim);
    		}
        });
    }
});
