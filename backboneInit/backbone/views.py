# view to render the index.html 
from django.conf import settings

from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import RequestContext

import os
import logging

def home(request):
    """ Render templates/index.html."""
    
    return render_to_response('index.html')

def jst(request):

    templates = {}
    jst_path = os.path.join(os.path.dirname(__file__), "resources/web/jst/")

    for path in os.listdir(jst_path):
        try:
            with open(os.path.join(jst_path, path), 'r') as jst_file:
                templates[path.split('.')[0]] = [l.rstrip('\n').replace("'", '"') for l in jst_file.readlines()]
        except IOError, e:
            logging.error(e)
	
	return render_to_response('templates.js', RequestContext(request, {'templates': templates}), mimetype="text/javascript")               
