PUT /sdklogs2
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
            "mac": {
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
            },
            "time": {
                "type": "date",
                "format": "yyyy-MM-dd HH:mm:ss"
            }
        }
    }
}

GET /sdklogs2/_search
{
    "track_total_hits": true,
    "size": 0,
    "query": {
        "match_all": {}
    }
}

// 统计1000061：2020-5-1导2020-6-1之间的聚合，聚合维度有channel、systemName、serverId、source
GET /sdklogs2/_search
{
    "track_total_hits": true,
    "size": 0,
    "query": {
        "bool": {
            "must": {
                "term": {
                    "appId": "1000084"
                }
            },
            "filter": {
                "range": {
                    "ymd": {
                        "gte": "2020-01-01",
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

// 按照一天中每分钟间隔统计数据
GET /sdklogs2/_search
{
    "track_total_hits": true,
    "size": 0,
    "query": {
        "term": {
            "ymd": "2020-01-17"
        }
    },
    "aggs": {
        "time_interval": {
            "date_histogram": {
                "field": "time",
                "fixed_interval": "1m"
            }
        }
    }
}