/**
 * @author CMCC
 */

Ext.define('MyDesktop.managementConsole.views.ManagementProjectHostTreePanel', {
    extend   : 'Ext.tree.Panel',
    
    alias    : 'widget.managementprojecthosttreepanel',
    
    requires : ['MyDesktop.managementConsole.stores.ManagementProjectHostTreeStore'],

    initComponent : function() {
    	Ext.apply(this, {
            id          : 'managementProjectHostTree',
            title       : 'Hosts',
            collapsible : true,
            region      : 'west',
            floatable   : false,
            split       : true,
            width       : 225,
            minWidth    : 175,
            maxWidth    : 270,
            rootVisible : true, // impostato a 'false' espande automaticamente i nodi figli effettuando la chiamata ajax
            singleExpand : true, // impostato a 'true' permette l'apertura di un solo nodo dell'albero per volta
            lines       : false,
            autoScroll  : true,
            store       : MyDesktop.managementConsole.stores.ManagementProjectHostTreeStore,
            root        : {
               expanded : false,
               text     : 'Projects'
            },
            listeners: {
            	itemclick: {
                    /*fn: function(view, record, item, index, event) {
                    	if(record.get('leaf') == true) {
                    		
                    		Ext.getCmp('terminalPanel').enable();
                    		
                    		var hostName = record.get('text');
                    		
                    		textArea = Ext.getCmp('terminalBox');
                    		areaValue = textArea.getValue();
                    		areaValue += 'changehost ' + hostName + '\n' + hostName + ' > ';
                    		
                    		textArea.setValue(areaValue);
                    		
                    		// mantiene la scrollbar gi�
                    		var obj = document.getElementById(textArea.inputEl.id); 
		        	        obj.scrollTop = obj.scrollHeight;
                    	}
                    		
                    }*/

            		fn: function(view, record, item, index, event) {
                    	if(record.get('leaf') == true) {
                    		
                    		//Ext.getCmp('terminalPanel').enable();
          
                    		
                    		var hostStartIndex = Ext.getCmp('terminalBox').getValue().lastIndexOf('\n');
                        	var hostEndIndex = Ext.getCmp('terminalBox').getValue().lastIndexOf(' >');
                        	var currentHost = Ext.getCmp('terminalBox').getValue().substring(hostStartIndex,hostEndIndex);
                    		
                        	var newHost = record.get('text');
                    		
                    		Ext.Ajax.request({
                        		//url: 'http://' + newHost + ':8080/Desktop/managementConsoleJson/testAction.action',
                        		url: 'http://' + newHost + '/esgf-desktop/managementConsoleJson/testAction.action',
                        	    success: function(response){
                        	    	Ext.getCmp('extSpotcheckMenu').enable();
                        	    	Ext.getCmp('ESGNodeMenu').enable();
                        	    	Ext.getCmp('ViewFileMenu').enable();
                        	    	textArea = Ext.getCmp('terminalBox');
                            		areaValue = textArea.getValue();
                            		areaValue += 'changehost ' + newHost + '\n' + newHost + ' > ';
                            		
                            		textArea.setValue(areaValue);
                            		
                            		// mantiene la scrollbar giù
                            		var obj = document.getElementById(textArea.inputEl.id); 
        		        	        obj.scrollTop = obj.scrollHeight;
                        	    },
                        	    failure: function() {
                        	    	
                        	    	
                        	    	Ext.getCmp('extSpotcheckMenu').disable();
                        	    	Ext.getCmp('ESGNodeMenu').disable();
                        	    	Ext.getCmp('ViewFileMenu').disable();
                        	    
                        	    	textArea = Ext.getCmp('terminalBox');
                            		areaValue = textArea.getValue();
                            		currentHost = '\nManagement Console'; // added later
                            		//alert ('current host ' + currentHost);
                            		//areaValue += 'No terminal available on the selected remote machine ' + newHost + '\n' + currentHost + ' > ';
                            		areaValue += 'No terminal available on the remote machine ' + newHost + '. Please select a P2P node.' + currentHost + ' > ';
                            		textArea.setValue(areaValue);
                            		
                            		// mantiene la scrollbar giù
                            		var obj = document.getElementById(textArea.inputEl.id); 
        		        	        obj.scrollTop = obj.scrollHeight;
                        	    }
                        	});
                    	}
                    		
                    }
                }

            }

        });
        this.callParent(arguments);
    }
});
