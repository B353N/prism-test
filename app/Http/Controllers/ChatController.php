<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        try {
            $message = $request->input('message');
            
            $response = Prism::text()
                ->using(Provider::Gemini, 'gemini-2.0-flash')
                ->withPrompt($message)
                ->generate()
                ->text;

            return response()->json([
                'success' => true,
                'message' => $response
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error communicating with Gemini: ' . $e->getMessage()
            ], 500);
        }
    }
} 