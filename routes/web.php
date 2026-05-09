<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::view('/', 'home-1')->name('home-1');

Route::post('/contact', function (Request $request) {
    $data = $request->validate([
        'name'    => 'required|string|max:120',
        'email'   => 'required|email|max:160',
        'message' => 'required|string|max:2000',
    ]);

    // In a real build this would dispatch a notification / store the lead.
    // For the demo, we just flash success and redirect back.
    return redirect()->route('home-1', absolute: false)
        ->with('contact_status', 'Thanks, '.$data['name'].' — we\'ll be in touch within one business day.')
        ->withFragment('contact');
});
