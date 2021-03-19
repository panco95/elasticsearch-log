PUT /courses
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "title": {
                "type": "text",
                "analyzer": "ik_max_word",
                "search_analyzer": "ik_smart"
            },
            "desc": {
                "type": "text",
                "analyzer": "ik_max_word",
                "search_analyzer": "ik_smart"
            }
        }
    }
}

// 多字段全文匹配
GET /courses/_search
{
    "query": {
        "multi_match": {
            "query": "心动",
            "type": "most_fields",
            "fields": [
                "title",
                "desc"
            ]
        }
    }
}
