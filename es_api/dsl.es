GET /orders/_search
{
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "ShopID": "10193"
                    }
                },
                {
                    "match": {
                        "type": "orders"
                    }
                }
            ],
            "filter": [
                {
                    "term": {
                        "OrderState": 9
                    }
                },
                {
                    "range": {
                        "CreateTime": {
                            "gte": "2021-01-29"
                        }
                    }
                }
            ]
        }
    }
}

PUT test/_doc/1
{
    "content": "panco is the best"
}

// bool联合查询，must must_not should filter里面可以包含match或term
GET /test/_search
{
    "query": {
        "bool": {
            "must": {
                "term": {
                    "content": "panco"
                }
            },
            "must_not": {
                "term": {
                    "content": "the"
                }
            }
        }
    }
}

// match全文查询，会分词优化
GET /test/_search
{
    "query": {
        "match": {
            "content": "panco is a best"
        }
    }
}

// term不分词查询
GET /test/_search
{
    "query": {
        "term": {
            "content": "panco the"
        }
    }
}
