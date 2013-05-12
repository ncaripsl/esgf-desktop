/**
 * @author CMCC
 */

Ext.define('MyDesktop.usersmap.stores.CountriesStore', {
    
	extend    : 'Ext.data.Store',
	requires  : ['MyDesktop.usersmap.models.CountryModel'],
    model     : 'MyDesktop.usersmap.models.CountryModel',
    singleton : true,
    
    constructor : function() {
    	this.id        = 'countriesStore';
    	this.autoLoad  = false;
    	this.proxy     = {
			type: 'ajax',
	    	url: 'usersmapJson/getCountries',
	        reader: {
	            type: 'json'
	        }
    	};
    	this.callParent(arguments);
    }
});