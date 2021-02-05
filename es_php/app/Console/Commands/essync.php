<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class essync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'essync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'sync elasticsearch datas';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $hosts = ['http://127.0.0.1:9200'];
        $client = \Elasticsearch\ClientBuilder::create()->setHosts($hosts)->build();
        $results = DB::select("show tables like 'accountCreate-%'");
        foreach ($results as $result) {
            $key = "Tables_in_es (accountCreate-%)";
            $tableName = $result->$key;
            print_r($tableName);
            DB::table($tableName)->orderBy('id')->chunk(10000, function ($logs) use ($client) {
                $params = ['body' => []];
                foreach ($logs as $log) {
                    $params['body'][] = [
                        'index' => [
                            '_index' => 'sdklogs2',
                        ]
                    ];

                    $log->input = "accountCreate";
                    $params['body'][] = $log;
                }
                $client->bulk($params);
            });
        }
    }

}
