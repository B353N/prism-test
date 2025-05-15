<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;

class AiChat extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ai-chat';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Chat with AI agent';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Welcome to AI Chat! Type "exit" to quit.');

        while (true) {
            $message = $this->ask('You');

            if (strtolower($message) === 'exit') {
                $this->info('Goodbye!');
                break;
            }

            try {
                $response = Prism::text()
                    ->using(Provider::Gemini, 'gemini-2.0-flash')
                    ->withPrompt($message)
                    ->generate()
                    ->text;

                $this->info("Gemini: " . $response);
            } catch (\Exception $e) {
                $this->error('Error communicating with Gemini: ' . $e->getMessage());
            }
        }
    }

}
