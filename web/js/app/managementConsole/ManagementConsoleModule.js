/**
 * @author CMCC
 */

Ext.define('MyDesktop.managementConsole.ManagementConsoleModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: ['MyDesktop.managementConsole.views.ManagementProjectHostTreePanel',
               //'MyDesktop.managementConsole.stores.HostStore',
               'MyDesktop.managementConsole.views.TerminalPanel'],
    id: 'managementConsole-win',
    
    init : function() {
        this.launcher = {
            text: 'Management Console',
            iconCls:'terminal',
            handler : this.createWindow,
            scope: this
        };

    },
    
    createWindow : function() {
    	var desktop   = this.app.getDesktop();
    	var win       = desktop.getWindow(this.id);
        if (!win) {
        	var projectHostTreePanel = new MyDesktop.managementConsole.views.ManagementProjectHostTreePanel();
        	var terminalPanel = new MyDesktop.managementConsole.views.TerminalPanel();
        	
        	//Ext.getStore('managementHostStore').load();
        	
        	/*Ext.getStore('managementHostStore').on('load', function(records) {
        		
        		for (var i=0; i<records.getTotalCount(); i++) {
        			var hostName = records.getAt(i).get('name');
        			Ext.getCmp('spotcheckMenu').add({
				        text: hostName,
				        handler: function(item) {
				        	
				        	hostStartIndex = Ext.getCmp('terminalBox').getValue().lastIndexOf('\n');
				        	hostEndIndex = Ext.getCmp('terminalBox').getValue().lastIndexOf(' >');
				        	currentHost = Ext.getCmp('terminalBox').getValue().substring(hostStartIndex,hostEndIndex);
				        	
				        	var hostName = item.text;
				        	
				        	var areaValue = Ext.getCmp('terminalBox').getValue();
				        	var commandLine = 'esgf-spotcheck ' + hostName;
				        	areaValue += commandLine + '\n';
				        	
				        	Ext.getCmp('terminalBox').setValue(areaValue);
				        	
				        	Ext.Ajax.request({
				        		//url: 'http://' + currentHost + ':8080/Desktop/managementConsoleStream/StreamLineAction.action',
				        		url: 'http://' + currentHost + '/esgf-desktop/managementConsoleStream/StreamLineAction.action',

				        		params: {
				        	        commandLine: commandLine
				        	    },
				        	    success: function(response){
				        	        var text = response.responseText;
				        	        textArea = Ext.getCmp('terminalBox');
				        	        value = textArea.getValue();
				        	        textArea.setValue(value + text + '' + currentHost + ' > ');
				        	        
				        	        // mantiene la scrollbar giu'
				        	        var obj = document.getElementById(textArea.inputEl.id); 
				        	        obj.scrollTop = obj.scrollHeight;
				        	    }
				        	});
				        }
				    });
        		}
        		
        	});*/
        	win = desktop.createWindow({
            	id              : 'managementConsole-win',
                title           : 'Management Console',
                width           : 1024,
                height          : 768,
                iconCls         : 'terminal',
                animCollapse    : false,
                constrainHeader : true,
                layout          : 'fit',
                items: [{
                    xtype   : 'panel',
                    layout  : 'border',
                    border  : false,
                    padding : 5,
                    items: [projectHostTreePanel,terminalPanel]
                }]
            });
        	
        }
        win.show();
        win.on('beforerender', this.loadContent());
        return win;
    },

    loadContent : function(){
    	
    	// recupero il feed tree e espando la root caricando il contenuto
    	var projectHostTree = Ext.getCmp('managementProjectHostTree');
    	projectHostTree.getRootNode().expand();
    	Ext.getStore('managementHostStore').load();
    }

});

