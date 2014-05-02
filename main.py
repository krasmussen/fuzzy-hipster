#!/usr/bin/env python

from flask import Flask, render_template, request
from elasticsearch import Elasticsearch

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
	# Check if form has been posted to
	if request.method == 'POST':
		
		# Setup Elastic search for use

		es = Elasticsearch()

		# Check what form was used

		if request.form.get('index') == "True":
			print("Attempting to update index")
			es.index(index="movies", doc_type="movie", body={
				"title": request.form.get('titlefield'),
				"style": request.form.get('stylefield'),
				"format": request.form.get('formatfield'),
				"year": request.form.get('yearfield'),
				"runtime": request.form.get('runtimefield'),
				"genre": request.form.get('genrefield'),
				"actors": request.form.get('actorsfield'),
			})

		if request.form.get('search') == "True":
			print("Attempting to search")
			results = es.search(index="movies", doc_type="movie", body={
				"query":{
					"query_string": {
						"query": request.form.get('searchinput')
					}
				}
			})
			return render_template("index.html", results = results)
			print(results)
			for hit in results['hits']['hits']:
				print(hit['_source'])

	return render_template("index.html")

app.run(debug = True)