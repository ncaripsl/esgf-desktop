/**
 * @author CMCC
 */

Ext.define('MyDesktop.olap.views.ProjectHostTreePanel', {
    extend   : 'Ext.tree.Panel',
    
    alias    : 'widget.olapProjectHostTreePanel',
    
    requires : ['MyDesktop.olap.stores.ProjectHostTreeStore'],

    initComponent : function() {
    	Ext.apply(this, {
            id          : 'olapProjectHostTreePanel',
            title       : 'Hosts',
            width       : 250,
            region      : 'west',
            collapsible : true,
            split       : true,
            border      : true,
            rootVisible : true,  // impostato a 'false' espande automaticamente i nodi figli effettuando la chiamata ajax
            singleExpand : true, // impostato a 'true' permette l'apertura di un solo nodo dell'albero per volta
            lines       : false,
            autoScroll  : true,
            store       : MyDesktop.olap.stores.ProjectHostTreeStore,
            root        : {
               expanded : false,
               text     : 'Peer Groups'
            },
            listeners: {
            	itemclick: this.hostSelection
            }
        });
    	this.treelock=0;
        this.callParent(arguments);
    },
    hostSelection: function(view, record, item, index, event) {
    	if(record.get('leaf') == true) {
        	this.treelock=1;
            Ext.getCmp('olapcombo1').disable();
            Ext.getCmp('olapcombo2').disable();
            Ext.getCmp('olapcombo3').disable();
            Ext.getCmp('olapcombo4').disable();
            Ext.getCmp('olapcombo5').disable();
            Ext.getCmp('olapbutton').disable();
	    	Ext.getCmp('olapChartGrid').disable();
	    	Ext.getCmp('olapCSVButton').disable();
            Ext.getCmp('olapGridButton').disable();
            Ext.getCmp('olapColumnChartButton').disable();
            Ext.getCmp('olapLineChartButton').disable();
            Ext.getCmp('olapAreaChartButton').disable();
            
        	Ext.getCmp('olapProjectHostTreePanel').setLoading(true);
    		// prelevo il nome dell'host selezionato
    		hostName = record.get('text');
    		
    		Ext.Ajax.request({
        		//url: 'http://' + hostName + ':8080/Desktop/managementConsoleJson/testAction.action',
        		url: 'http://' + hostName + '/esgf-desktop/managementConsoleJson/testAction.action',
        	    success: function(response){
        	    	Ext.getCmp('olapcombo1').enable();
                    Ext.getCmp('olapcombo2').enable();
                    Ext.getCmp('olapcombo3').enable();
                    Ext.getCmp('olapcombo4').enable();
                    Ext.getCmp('olapcombo5').enable();
                    Ext.getCmp('olapbutton').enable();
        	    	
        	    	// prelevo il contenuto delle combo boxes
            		var combo1Value = Ext.getCmp('olapcombo1').getValue();
                    var combo2Value = Ext.getCmp('olapcombo2').getValue();
                    var combo3Value = Ext.getCmp('olapcombo3').getValue();
                    var combo4Value = Ext.getCmp('olapcombo4').getValue();
                    var combo5Value = Ext.getCmp('olapcombo5').getValue();
                    
                    // imposto il proxy e carico lo store
                    Ext.getStore('olapChartGridStore').setProxy({
         		    	type: 'ajax',
         		    	//url: 'http://' + hostName + ':8080/Desktop/olapJson/getElapsedTime.action',
         		    	url: 'http://' + hostName + '/esgf-desktop/olapJson/getElapsedTime.action',
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
            	    	Ext.getCmp('outputPanel').setTitle('Data Usage Statistics on ' +hostName);
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
                    	
                    	// se la modalità di rappresentazione selezionata è quella del grafico
                    	// elimino la modalità hidden
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
                    		Ext.ComponentManager.get('firstColumn').setText(combo2Value);
                        	Ext.ComponentManager.get('secondColumn').setText(combo1Value);
                    	}
                    });
                	this.treelock=0;
                	Ext.getCmp('olapProjectHostTreePanel').setLoading(false);
        	    },
        	    failure: function() {
        	    	Ext.getCmp('outputPanel').setTitle('Data Usage Statistics');
        	    	Ext.MessageBox.alert('Error Message','No statistics available on the P2P node ' + hostName + '.\nPlease select another P2P node');
        	    	
        	    	Ext.getCmp('olapChartGrid').disable();
        	    	Ext.getCmp('olapCSVButton').disable();
                    Ext.getCmp('olapGridButton').disable();
                    Ext.getCmp('olapColumnChartButton').disable();
                    Ext.getCmp('olapLineChartButton').disable();
                    Ext.getCmp('olapAreaChartButton').disable();
                    
                    Ext.getCmp('olapcombo1').disable();
                    Ext.getCmp('olapcombo2').disable();
                    Ext.getCmp('olapcombo3').disable();
                    Ext.getCmp('olapcombo4').disable();
                    Ext.getCmp('olapcombo5').disable();
                    Ext.getCmp('olapbutton').disable();
                	this.treelock=0;
                	Ext.getCmp('olapProjectHostTreePanel').setLoading(false);
        	    }
        	});
    		
    		
    		
  		
    	}
    }
/*    hostSelection: function(view, record, item, index, event) {
    	if(record.get('leaf') == true) {
    		
    		// prelevo il nome dell'host selezionato
    		hostName = record.get('text');
    		
    		// prelevo il contenuto delle combo boxes
    		var combo1Value = Ext.getCmp('olapcombo1').getValue();
            var combo2Value = Ext.getCmp('olapcombo2').getValue();
            var combo3Value = Ext.getCmp('olapcombo3').getValue();
            var combo4Value = Ext.getCmp('olapcombo4').getValue();
            var combo5Value = Ext.getCmp('olapcombo5').getValue();
            
            // imposto il proxy e carico lo store
            Ext.getStore('olapChartGridStore').setProxy({
 		    	type: 'ajax',
 		    	url: 'http://' + hostName + '/esgf-desktop/olapJson/getElapsedTime',
 		    	//url: 'http://' + hostName + ':8080/Desktop/olapJson/getElapsedTime',
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
    }*/
});
