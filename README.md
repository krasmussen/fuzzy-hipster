fuzzy-hipster
=============

Because github sugguested I name this fuzzy-hipster...

However this is just an example of using Elasticsearch with python to create a basic DB of movies and search them.

Install steps

Install python and flask:
    yum install python
    yum install python-flask

Install Elasticsearch
    cd /opt/
    wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-0.90.1.zip
    unzip elasticsearch-0.90.1.zip
    mv elasticsearch-0.90.1 elasticsearch

Install Elasticsearch python module:

    pip install elasticsearch

Run Elasticsearch
/opt/elasticsearch/bin/elasticsearch -f

Run python movie db example app
cd <download directory>
./main.py
