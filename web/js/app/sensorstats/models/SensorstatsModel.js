/**
 * @author CMCC
 */

Ext.define('MyDesktop.sensorstats.models.SensorstatsModel', {
    extend: 'Ext.data.Model',
    fields: [
      'host_name', 
      'sensor_name',
      'last5m_o',
      'last1h_o',
      'last1d_o',
      'last1w_o', 
      'last1m_o',
      'last1y_o',
      'last5m_p',
      'last1h_p',
      'last1d_p',
      'last1w_p',
      'last1m_p',
      'last1y_p',
      'time_stamp'
    ]
});