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

// bool不会做分词优化
GET /test/_search
{
    "query": {
        "bool": {
            "must": {
                "term": {
                    "content": "panco"
                }
            }
        }
    }
}

// match全文匹配，会分词优化
GET /test/_search
{
    "query": {
        "match": {
            "content": "panco best"
        }
    }
}
