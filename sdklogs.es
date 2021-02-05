PUT /sdklogs
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "input": {
                "type": "keyword"
            },
            "appId": {
                "type": "keyword"
            },
            "appVersion": {
                "type": "keyword"
            },
            "accountId": {
                "type": "keyword"
            },
            "roleId": {
                "type": "keyword"
            },
            "platform": {
                "type": "keyword"
            },
            "serverId": {
                "type": "keyword"
            },
            "channel": {
                "type": "keyword"
            },
            "imei": {
                "type": "keyword"
            },
            "deviceName": {
                "type": "keyword"
            },
            "systemName": {
                "type": "keyword"
            },
            "source": {
                "type": "keyword"
            }
        }
    }
}

GET /sdklogs/_search
{
    "query": {
        "match_all": {}
    }
}

// 统计1000061：2020-5-1导2020-6-1之间的聚合，聚合维度有channel、systemName、serverId、source
GET /sdklogs/_search
{
    "track_total_hits": true,
    "size": 0,
    "query": {
        "bool": {
            "must": {
                "term": {
                    "appId": "1000061"
                }
            },
            "filter": {
                "range": {
                    "ymd": {
                        "gte": "2020-02-01",
                        "lt": "2021-01-05"
                    }
                }
            }
        }
    },
    "aggs": {
        "groupby_channel": {
            "terms": {
                "field": "channel"
            },
            "aggs": {
                "groupby_systemName": {
                    "terms": {
                        "field": "systemName"
                    },
                    "aggs": {
                        "groupby_serverid": {
                            "terms": {
                                "field": "serverId"
                            },
                            "aggs": {
                                "groupby_source": {
                                    "terms": {
                                        "field": "source"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

