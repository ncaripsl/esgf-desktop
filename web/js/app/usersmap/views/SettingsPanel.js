/**
 * @author CMCC
 */

Ext.define('MyDesktop.usersmap.views.SettingsPanel', {
    extend   : 'Ext.panel.Panel',
    
    requires: ['MyDesktop.usersmap.views.UsersMapPanel',
               'MyDesktop.usersmap.stores.CountriesStore'],
    
    initComponent : function() {
    	var usersMapPanel = new MyDesktop.usersmap.views.UsersMapPanel();
        Ext.apply(this, {
        	id         : 'settingsUsersmapPanel',
//        	title      : 'Users Map',
            region     : 'center',
            layout     : 'fit',
            border     : false,
            /*tbar       : [
			{
				xtype        : 'combo',
				fieldLabel   : 'Client Country',
				queryMode    : 'local',
				id           : 'countryMenu',
				labelWidth   : 80,
				store        : MyDesktop.usersmap.stores.CountriesStore,
			    displayField : 'countrycode',
			    valueField   : 'countrycode',
			    emptyText    : 'Select a country...',
			    listeners : {
			    	select : this.countryHandler
			    }
			},
			'->',
            {
            	xtype: 'tbtext',
            	text: '# distinct IPs'
            },
            '-',
            {
            	xtype: 'tbtext',
            	text: '# distinct clients'
            },
            '-'],*/
            items       : [usersMapPanel]
        }); 
        this.callParent();
    },
    
    countryHandler : function(item) {
    	var country = Ext.getCmp('countryMenu').getValue();
//    	Ext.getCmp('countryMenu').clearValue();
    	
    	Ext.getStore('clientsStore').load({
    		params: {
		    	host    : 'adm07.cmcc.it',
		    	country : country
		    }
    	});
    }
});