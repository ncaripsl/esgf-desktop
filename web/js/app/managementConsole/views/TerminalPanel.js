/**
 * @author CMCC
 */

Ext.define('MyDesktop.managementConsole.views.TerminalPanel', {
	extend   : 'Ext.panel.Panel',
	
	initComponent: function() {
		Ext.apply(this, {
        	region   : 'center',
        	id       : 'terminalPanel',
            border   : true,
            //disabled : true,
            layout   : 'fit',
            tbar     : [/*{
                // xtype: 'button', // default for Toolbars
                text: 'Sanity Check'
            },
            '-',*/
            {
                text     : 'esgf-spotcheck',
                id       : 'extSpotcheckMenu',
                disabled : true,
                menu     : {
                    showSeparator: false,
                    id    : 'spotcheckMenu'
                }
            },
            {
                text     : 'esg-node',
                id       : 'ESGNodeMenu',
                disabled : true,
                menu     : {
                    showSeparator: false,
                    items: [
                        {
					        text: '--federation-sanity-check',
					        listeners : {
					        	click : this.esgNodeHandler
					        }
					    },/*{
					        text: 'status',
					        listeners : {
					        	click : this.esgNodeHandler
					        }
					    },*/{
					        text: '--version',
					        listeners : {
					        	click : this.esgNodeHandler
					        }
					    },{
					        text: '--get-type',
					        listeners : {
					        	click : this.esgNodeHandler
					        }
					    },{
					        text: '--get-default-peer',
					        listeners : {
					        	click : this.esgNodeHandler
					        }
					    },{
					        text: '--get-peer-group',
					        listeners : {
					        	click : this.esgNodeHandler
					        }
					    },{
					        text: '--get-index-peer',
					        listeners : {
					        	click : this.esgNodeHandler
					        }
					    },{
					        text: '--get-idp-peer',
					        listeners : {
					        	click : this.esgNodeHandler
					        }
					    }
                    ]
                }
            },
            {
                text     : 'cat',
                id       : 'ViewFileMenu',
                disabled : true,
                menu     : {
                    showSeparator: false,
                    items: [
                        {
					        text: 'esgf_shards.xml',
					        listeners : {
					        	click : this.catHandler
					        }
					    },{
					        text: 'esgf_idp.xml',
					        listeners : {
					        	click : this.catHandler
					        }
					    }
                    ]
                }
            }],
            items: [{
            	xtype           : 'textarea',
            	id              : 'terminalBox',
            	border          : false,
            	readOnly        : true,
            	value           : '\nManagement Console >',
            	fieldStyle      : 'background: #000000 0 0; color: #ffffff; font-family:"Lucida Console"',
            	enableKeyEvents : true,  // true to enable the proxying of key events for the HTML input field
            	focusOnToFront  : true,  // Specifies whether the floated component should be automatically focused when it is brought to the front.
            	autoScroll      : false,
            	listeners       : {
            		scope    : this,  
            		keypress : function(field, e) {
                            // tastiera disabilitata
                        	e.stopEvent();
                    }
            	}
            }]
        });
		this.callParent(arguments);
    },
    
    esgNodeHandler : function(item) {
    	
    	hostStartIndex = Ext.getCmp('terminalBox').getValue().lastIndexOf('\n');
    	hostEndIndex = Ext.getCmp('terminalBox').getValue().lastIndexOf(' >');
    	currentHost = Ext.getCmp('terminalBox').getValue().substring(hostStartIndex,hostEndIndex);
    	
    	var command = item.text;
    	
    	var areaValue = Ext.getCmp('terminalBox').getValue();
    	var commandLine = 'esg-node ' + command;
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
    	        textArea.setValue(value + text + currentHost + ' > ');
    	        
    	        // mantiene la scrollbar gi�
    	        var obj = document.getElementById(textArea.inputEl.id); 
    	        obj.scrollTop = obj.scrollHeight;
    	    }
    	});
    },
    
    catHandler : function(item) {
    	
    	hostStartIndex = Ext.getCmp('terminalBox').getValue().lastIndexOf('\n');
    	hostEndIndex = Ext.getCmp('terminalBox').getValue().lastIndexOf(' >');
    	currentHost = Ext.getCmp('terminalBox').getValue().substring(hostStartIndex,hostEndIndex);
    	
    	var file = item.text;
    	
    	var areaValue = Ext.getCmp('terminalBox').getValue();
    	var commandLine = 'cat /esg/config/' + file;
    	//areaValue += commandLine + '\n';
    	areaValue += commandLine;
    	Ext.getCmp('terminalBox').setValue(areaValue);
    	
    	Ext.Ajax.request({
    		//url: 'http://' + currentHost + ':8080/Desktop/managementConsoleStream/StreamLineAction.action',
    		url: 'http://' + currentHost + '/esgf-desktop/managementConsoleStream/StreamLineAction.action',
    	    params: {
    	        commandLine: commandLine
    	    },
    	    success: function(response){
    	        var text = response.responseText;
    	        //alert ('text'+text);
    	        textArea = Ext.getCmp('terminalBox');
    	        value = textArea.getValue();
    	        textArea.setValue(value + text + currentHost + ' > ');
    	        
    	        // mantiene la scrollbar gi�
    	        var obj = document.getElementById(textArea.inputEl.id); 
    	        obj.scrollTop = obj.scrollHeight;
    	    }
    	});
    }
});
