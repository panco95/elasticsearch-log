// collapse：折叠查询，筛选订单状态为9，按ShopID分组折叠
GET /orders/_search
{
    "track_total_hits": true,
    "size": 100,
    "query": {
        "match": {
            "OrderState": 9
        }
    },
    "collapse": {
        "field": "ShopID",
        "inner_hits": {
            "name": "orders",
            "size": 2,
            "collapse": {
                "field": "BuyAccounName.keyword"
            }
        }
    },
    "sort": {
        "Payable": "asc"
    }
}

// filter过滤器
GET /orders/_search
{
    "track_total_hits": true,
    "query": {
        "bool": {
            "filter": [
                {
                    "term": {
                        "OrderState": 9
                    }
                }
            ]
        }
    },
    "aggs": {
        "accounts": {
            "terms": {
                "field": "SellAccounName.keyword"
            }
        }
    }
}

// 分页：from  size

