/**
 * @author CMCC
 */

Ext.define('MyDesktop.olap.views.OlapChartPanel', {
    extend   : 'Ext.chart.Chart',
    alias    : 'widget.olapChart',
    requires : ['MyDesktop.olap.stores.ChartGridStore'],
    
    constructor: function() {
        this.callParent([{theme: 'Purple'}]);
    },

    initComponent : function() {
    	this.id      = 'olapchart';
    	this.hidden  = true;
    	this.animate = true;
    	this.width   = '100%';
    	this.height  = '100%';
    	this.style   = 'background:#fff',
        this.store   = MyDesktop.olap.stores.ChartGridStore;
        this.axes    = [{
        	type: 'Numeric',
            position: 'left',
            fields: ['elapsedTime'],
            label: {
                renderer: Ext.util.Format.numberRenderer('0.0')
            },
            labelTitle: {
                font: 'font-family: tahoma,arial,verdana,sans-serif'
            },
            title: 'Elapsed Time (milliseconds)',
            grid: true,
            minimum: 0
        },{
        	type: 'Category',
            position: 'bottom',
            fields: ['timestamp'],
            title: 'Time Interval',
            labelTitle: {
                font: 'font-family: tahoma,arial,verdana,sans-serif'
            }
        }];
        this.series  = [{
        	type: 'column',
		    id  : 'column_series',
		    axis: 'left',
		    highlight: true,
		    tips: {
		      trackMouse: true,
		      width: 200,
		      renderer  : function(storeItem, item) {
			        this.setTitle(storeItem.get('timestamp') + ': ' + storeItem.get('elapsedTime'));
			      }
		    },
		    xField: 'timestamp',
		    yField: 'elapsedTime'
        }];
        this.callParent();
    }
});