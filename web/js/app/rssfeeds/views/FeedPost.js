/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class FeedViewer.FeedPost
 * @extends Ext.panel.Panel
 *
 * Shows the detail of a feed post
 *
 * @constructor
 * Create a new Feed Post
 * @param {Object} config The config object
 */
Ext.define('MyDesktop.rssfeeds.views.FeedPost', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.feedpost',
    cls: 'preview',
    autoScroll: true,
    border: true,
    
    initComponent: function(){
        Ext.apply(this, {
            dockedItems: [this.createToolbar()],
            tpl: Ext.create('Ext.XTemplate',
                '<div class="post-data">',
                	'<b><a href="{link}" class="post-title">{title}</a></b>',
                	'<br>',
                	'<br>',
                    '<span class="post-date">{pubDate:this.formatDate}</span>',
                    '<h4 class="post-author">Author: {author:this.defaultValue}</h4>',
                '</div>',
                '<div class="post-body">',
	                '<tpl if="description">',
	                	'<div>{description}</div>',
		        	'</tpl>',
//                	'<div class="enclosures">',
//            		'<div>Categories</div><br>',
//	            		'<div class="enclosure">',
//		            		'<tpl for=".">',
//	            				'{#} {category}',
//	            			'</tpl>',
//	            		'</div>',
//	            	'</div>',
		        	'<tpl if="enclosureurl">',
			        	'<div class="enclosures">',
		            		'<div>Media files</div><br>',
		            		'<div class="enclosure">',
		            			'<img class="type-icon" src="img/rssviewer/Text-icon.png"/>',
		            			' <a href="{enclosureurl}">{enclosureurl}</a> (Text document)',
		            		'</div>',
	            		'</div>',
		        	'</tpl>',
		        	'<br>',
                	'<tpl if="source">',
                		'<div>Source: <a href="{sourceurl}">{source}</a></div>',
                	'</tpl>',
                	'<br>',
                	'<tpl if="guid">',
                		'<div>Globally Unique Identifier: {guid}</div><br>',
                	'</tpl>',
                '</div>',
                {
                    defaultValue: function(v){
                        return v ? v : 'Undefined';
                    },

                    formatDate: function(value){
                        if (!value) {
                            return '';
                        }
                        return Ext.Date.format(value, 'M j, Y, g:i a');
                    },
                    
                    getUrl: function(value){
                    	alert(value);
                    	return value;
                    }
                }
             )
        });
        this.callParent(arguments);
    },

    /**
     * Set the active post
     * @param {Ext.data.Model} rec The record
     */
    setActive: function(rec) {
        this.active = rec;
        this.update(rec.data);
    },

    /**
     * Create the top toolbar
     * @private
     * @return {Ext.toolbar.Toolbar} toolbar
     */
    createToolbar: function(){
        var items = [],
            config = {};
        if (!this.inTab) {
            items.push({
                scope: this,
                handler: this.openTab,
                text: 'View in new tab',
                iconCls: 'tab-new'
            });
        }
        else {
            config.cls = 'x-docked-noborder-top';
        }
        config.items = items;
        return Ext.create('widget.toolbar', config);
    },

    /**
     * Open the post in a new tab
     * @private
     */
    openTab: function(){
        this.fireEvent('opentab', this, this.active);
    }

});

