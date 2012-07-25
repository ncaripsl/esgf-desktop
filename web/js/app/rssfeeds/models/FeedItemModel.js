/**
 * @author CMCC
 */

Ext.define('MyDesktop.rssfeeds.models.FeedItemModel', {
	extend: 'Ext.data.Model',
	
	requires: ['MyDesktop.rssfeeds.models.CategoryModel'],
	
    fields: [
         'title',
         'author',
         { name: 'pubDate', type: 'date' },
         'link',
         'description',
         'content',
         'enclosure',
         { name: 'enclosureurl', mapping: 'enclosure/@url' },
         'source',
         { name: 'sourceurl', mapping: 'source/@url' },
         'guid'
         //{ name: 'category', type: 'auto' },
         //{ name: 'domain', mapping: 'category/@domain'}
     ]/*,
     hasMany: [
       'Category',
       {model: 'MyDesktop.rssfeeds.models.CategoryModel', name: 'category'}
     ]*/
});