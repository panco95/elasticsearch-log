// 创建索引时携带mapping
PUT /test
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0
    },
    "mappings": {
        "properties": {
            "age": {
                "type": "integer"
            },
            "email": {
                "type": "keyword"
            },
            "name": {
                "type": "text"
            },
            "family": {
                "type": "object"
            }
        }
    }
}

// 给索引添加mapping
PUT /test/_mapping
{
    "properties": {
        "address": {
            "type": "keyword",
            "index": false
        }
    }
}

// 查询索引mapping
GET /ownthink_v2/_mapping

// 别名字段
PUT /test/_mapping
{
    "properties": {
        "nickname": {
            "type": "alias",
            "path": "name"
        }
    }
}
