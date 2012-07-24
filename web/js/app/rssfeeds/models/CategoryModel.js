/**
 * @author CMCC
 */

Ext.define('MyDesktop.rssfeeds.models.CategoryModel', {
	extend: 'Ext.data.Model',
    fields: [
         'category',
         {
        	 name: 'domain',
        	 mapping: 'category/@domain'
         }
    ]
});