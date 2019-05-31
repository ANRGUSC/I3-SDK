"""
test_sub.py is an example of a subscriber to a topic
"""

from threading import Thread
import subscriber
        
if __name__ == '__main__':

	b = subscriber.Subscriber('bulky_items.log','b')
	h = subscriber.Subscriber('homeless.log','h')	
	e = subscriber.Subscriber('electronic.log','e')
	g = subscriber.Subscriber('graffiti.log','g')
	i = subscriber.Subscriber('illegal_dumping.log','i')
	d = subscriber.Subscriber('dead_animal.log','d')
	m = subscriber.Subscriber('metal.log','m')
	w = subscriber.Subscriber('water_waste.log','w')
	ss = subscriber.Subscriber('s_streetlight.log','ss')
	ms = subscriber.Subscriber('m_streetlight.log','ms')
	
	t1 = Thread(target=b.subscribe, args=())
	t2 = Thread(target=h.subscribe, args=())
	t3 = Thread(target=e.subscribe, args=())
	t4 = Thread(target=g.subscribe, args=())
	t5 = Thread(target=i.subscribe, args=())
	t6 = Thread(target=d.subscribe, args=())
	t7 = Thread(target=m.subscribe, args=())
	t8 = Thread(target=w.subscribe, args=())
	t9 = Thread(target=ss.subscribe, args=())
	t10 = Thread(target=ms.subscribe, args=())
	

	t1.start()
	t2.start()
	t3.start()
	t4.start()
	t5.start()
	t6.start()
	t7.start()
	t8.start()
	t9.start()
	t10.start()
	









