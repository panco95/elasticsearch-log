// 全部查询
GET /orders/_search
{
    "track_total_hits": true, //强制进行精确计数
    "query": {
        "match_all": {}
    }
}
/**
track_total_hits参数
    true：强制进行精确计数
    false：不计数
    1-xxxx：最大计数
    在hits的total字段返回计数，relation为表达式，如下：
        eq 等于  equal
        neq 不等于
        gt 大于   greater than
        egt 大于等于
        lt 小于     less than
        elt 小于等于
*/

// 字段匹配查询
GET /orders/_search
{
    "track_total_hits": true,
    "query": {
        "match": {
            "OrderNo": "20122820081703042436"
        }
    }
}

// 只查询有没有数据，不查数据
GET /orders/_search
{
    "track_total_hits": true,
    "query": {
        "match": {
            "OrderNo": "20122820081703042436"
        }
    },
    "size": 0, // 数据读取：0
    "terminate_after": 1 // 到达查询数(1)后提前终止
}