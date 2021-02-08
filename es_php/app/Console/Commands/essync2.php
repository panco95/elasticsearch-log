<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class essync2 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'essync2';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'ownthink_v2 mysql input';

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
        $tableName = "ownthink_v2";
        $count = 0;
        DB::table($tableName)->orderBy('id')->chunk(1000, function ($logs) use ($client, $count) {
            $params = ['body' => []];
            foreach ($logs as $log) {
                $params['body'][] = [
                    'index' => [
                        '_index' => 'ownthink_v2',
                    ],
                    'id' => $log->id
                ];

                $params['body'][] = $log;
            }
            $client->bulk($params);
            echo ++$count . ' ';
        });
    }


}
