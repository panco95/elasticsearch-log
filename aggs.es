POST /text2/_mapping
{
    "properties": {
        "username": {
            "type": "text",
            "fielddata": true,
            "fields": {
                "keyword": {
                    "type": "keyword"
                }
            }
        },
        "age": {
            "type": "integer"
        }
    }
}


GET /text2/_mapping

POST text2/_doc
{
    "username": "panco3",
    "age": 55
}


PUT /orders
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "ShopID": {
                "type": "keyword"
            },
            "ProductNO": {
                "type": "keyword"
            },
            "ProductID": {
                "type": "keyword"
            }
        }
    }
}


// 聚合统计:
订单状态为9里面，每个shopid里面每个account的订单数量
GET /orders/_search
{
    "track_total_hits": true,
    "query": {
        "match": {
            "OrderState": 9
        }
    },
    "size": 0,
    "aggs": {
        "groupby_shopid": {
            "terms": {
                "field": "ShopID"
            },
            "aggs": {
                "groupby_productno": {
                    "terms": {
                        "field": "BuyAccounName.keyword"
                    },
                    "aggs": {
                        "info": {
                            "sum": {
                                "field": "Payable"
                            }
                        }
                    }
                }
            }
        }
    }
}
