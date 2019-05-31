from bokeh.plotting import figure
from bokeh.driving import linear
from bokeh.io import curdoc
import threading
import time

visualize_window = 20
sample_interval = 200.0

logfile = open('sub.log', 'r')

@linear()
def update(step):
    for line in logfile.readlines():
        if float(line.split(',')[0]) >= int(time.time()):
            print "New data " + line.rstrip('\n')
            
            ds.data['x'].append(step)
            ds.data['y'].append(line.split(',')[1])
            ds.trigger('data', ds.data, ds.data)
        
fig = figure(plot_width=1000, plot_height=400, x_axis_label='Time', y_axis_label='I3 data')
graph = fig.line([], [], color="firebrick", line_width=2)
ds = graph.data_source
curdoc().add_root(fig)

curdoc().add_periodic_callback(update, sample_interval)
