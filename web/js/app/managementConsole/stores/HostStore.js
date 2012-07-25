/**
 * @author CMCC
 */

Ext.define('MyDesktop.managementConsole.stores.HostStore', {
    extend      : 'Ext.data.Store',
    requires    : ['MyDesktop.managementConsole.models.HostModel'],
    model       : 'MyDesktop.managementConsole.models.HostModel',
    singleton   : true,
    
    constructor : function() {
    	this.id        = 'managementHostStore';
    	this.autoLoad  = false;
    	this.proxy    = {
	    	type: 'ajax',
	    	url: 'managementConsoleJson/getSpotcheckHosts.action',
	        reader: {
	            type: 'json'
	        }
	    };
    	this.listeners = {
    			load: this.hostLoaded
    	};
        
    	this.callParent(arguments);
    },
    
    hostLoaded: function(records) {
    	
		for (var i=0; i<records.getTotalCount(); i++) {
			var hostName = records.getAt(i).get('name');

			Ext.getCmp('extSpotcheckMenu').menu.add({
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
		        		url: 'http://' + currentHost + '/esgf-desktop/managementConsoleStream/StreamLineAction.action',
		        	    params: {
		        	        commandLine: commandLine
		        	    },
		        	    success: function(response){
		        	        var text = response.responseText;
		        	        textArea = Ext.getCmp('terminalBox');
		        	        value = textArea.getValue();
		        	        textArea.setValue(value + text + '' + currentHost + ' > ');
		        	        
		        	        // mantiene la scrollbar giù
		        	        var obj = document.getElementById(textArea.inputEl.id); 
		        	        obj.scrollTop = obj.scrollHeight;
		        	    },
		        	    failure: function () { 
		        	    	textArea = Ext.getCmp('terminalBox');
		        	        value = textArea.getValue();
		        	        textArea.setValue(value + text + '' + currentHost + ' > ');
		        	        
		        	        // mantiene la scrollbar giù
		        	        var obj = document.getElementById(textArea.inputEl.id); 
		        	        obj.scrollTop = obj.scrollHeight;
		        	    }
		        	});
		        }
			});
		}
		
		// visualizzo il menu
		Ext.getCmp('extSpotcheckMenu').menu.show();
    }


});