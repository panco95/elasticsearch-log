// 中文知识图谱搜索引擎(一亿+数据量)

PUT /ownthink_v2
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "name": {
                "type": "text",
                "analyzer": "ik_max_word",
                "search_analyzer": "ik_smart"
            },
            "prop": {
                "type": "text",
                "analyzer": "ik_max_word",
                "search_analyzer": "ik_smart"
            },
            "text": {
                "type": "text",
                "analyzer": "ik_max_word",
                "search_analyzer": "ik_smart"
            }
        }
    }
}

GET /ownthink_v2/_search
{
    "track_total_hits": true,
    "size": 0,
    "query": {
        "match_all": {}
    }
}

GET /ownthink_v2/_search
{
    "track_total_hits": true,
    "size": 100,
    "from": 0,
    "query": {
        "match": {
            "name": "口罩"
        }
    }
}