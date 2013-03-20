/**
 * @author CMCC
 */

Ext.define('MyDesktop.datastats.views.OlapChartPanel', {
    extend   : 'Ext.chart.Chart',
    alias    : 'widget.datastatsChart',
    requires : ['MyDesktop.datastats.stores.ChartGridStore'],
    
    constructor: function() {
        this.callParent([{theme: 'Red'}]);
    },

    initComponent : function() {
    	this.id      = 'datastatschart';
    	this.hidden  = true;
    	this.animate = true;
    	this.width   = '100%';
    	this.height  = '100%';
    	this.style   = 'background:#fff';
        this.store   = MyDesktop.datastats.stores.ChartGridStore;
        this.axes    = [{
        	type: 'Numeric',
            position: 'left',
            fields: ['measure'],
            label: {
                renderer: Ext.util.Format.numberRenderer('0.0')
            },
            labelTitle: {
                font: 'font-family: tahoma,arial,verdana,sans-serif'
            },
            title: 'Number Downloads',
            grid: true,
            minimum: 0
        },{
        	type: 'Category',
            position: 'bottom',
            fields: ['dimension'],
            title: 'Time Interval',
            labelTitle: {
                font: 'font-family: tahoma,arial,verdana,sans-serif'
            }
        }];
        this.series  = [{
        	type: 'column',
		    id  : 'datastast_column_series',
		    axis: 'left',
		    highlight: true,
		    tips: {
		      trackMouse: true,
		      width: 200,
		      renderer  : function(storeItem, item) {
			        this.setTitle(storeItem.get('dimension') + ': ' + storeItem.get('measure'));
			      }
		    },
		    xField: 'dimension',
		    yField: 'measure'
        }];
        this.callParent();
    }
});