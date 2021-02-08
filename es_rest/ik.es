// ik中文分词插件：https://github.com/medcl/elasticsearch-analysis-ik
// 不安装中文分词插件的话，中和国会变成两个字去搜索

PUT /ik_test
{
    "mappings": {
        "properties": {
            "content": {
                "type": "text",
                "analyzer": "ik_max_word",
                "search_analyzer": "ik_smart"
            }
        }
    }
}

POST ik_test/_doc
{
    "content": "美国留给伊拉克的是个烂摊子吗"
}
POST ik_test/_doc
{
    "content": "公安部：各地校车将享最高路权"
}
POST ik_test/_doc
{
    "content": "中国渔警冲突调查：韩警平均每天扣1艘中国渔船"
}
POST ik_test/_doc
{
    "content": "中国驻洛杉矶领事馆遭亚裔男子枪击 嫌犯已自首"
}

GET /ik_test/_search
{
    "query": {
        "match": {
            "content": "中国"
        }
    },
    "highlight": {
        "pre_tags": [
            "<tag1>",
            "<tag2>"
        ],
        "post_tags": [
            "</tag1>",
            "</tag2>"
        ],
        "fields": {
            "content": {}
        }
    }
}
