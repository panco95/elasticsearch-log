PUT /usertb
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "uname": {
                "type": "keyword"
            },
            "age": {
                "type": "integer"
            }
        }
    }
}


GET /usertb/_search
{
    "track_total_hits": true,
    "size": 0,
    "query": {
        "match_all": {}
    }
}


GET /usertb/_search
{
    "track_total_hits": true,
    "size": 0,
    "query": {
        "match_all": {}
    },
    "aggs": {
        "groupby_uname": {
            "terms": {
                "field": "uname"
            }
        }
    }
}

