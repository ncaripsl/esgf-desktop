/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/*!
* Ext JS Library 4.0
* Copyright(c) 2006-2011 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

Ext.define('MyDesktop.realtime.RealtimeModule', {
    extend: 'Ext.ux.desktop.Module',
    requires: ['Ext.chart.*', 'MyDesktop.realtime.views.RealChart'],
    id: 'realtime-win',

    init : function() {
        // No launcher means we don't appear on the Start Menu...
        this.launcher = {
            text: 'Realtime',
            iconCls:'realtime',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(){
        var desktop   = this.app.getDesktop();
        var win       = desktop.getWindow('realtime-win');
        var realChart = new MyDesktop.realtime.views.RealChart();
        if(!win){
            win = desktop.createWindow({
                id             : 'realtime-win',
                title          : 'CPU Realtime Monitoring',
                width          : 800,
                height         : 600,
                iconCls        : 'realtime',
                animCollapse   : false,
                constrainHeader: true,
                layout         : 'fit',
                items          : [realChart]
            });
        }
        win.show();
        win.on('beforerender', this.loadContent());
        win.on('beforeclose', function() {
        	stopCondition = false;
        });
        return win;
    },
    
    loadContent : function(){
    	
    	stopCondition = true;
    	var realStore  = Ext.getStore('realtimeStore');
    	
    	var task = {
    			run: function() {
    	    		realStore.load();
    	    		
    	    		return stopCondition;
    			},
    			interval: 1000  		
    	};
    	Ext.TaskManager.start(task);


    },

});

