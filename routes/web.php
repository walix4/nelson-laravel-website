<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::view('/', 'home-1')->name('home-1');

Route::view('/dryge', 'dryge')->name('dryge');

// Tools + Estimates
Route::view('/tools', 'tools.index')->name('tools');
Route::view('/tools/distance', 'tools.distance');
Route::view('/tools/demurrage', 'tools.demurrage');
Route::view('/tools/co2', 'tools.co2');
Route::view('/tools/converter', 'tools.converter');
Route::view('/tools/ports', 'tools.ports');
Route::view('/tools/fsc', 'tools.fsc');
Route::view('/tools/containers', 'tools.containers');
Route::view('/tools/accessorials', 'tools.accessorials');
Route::view('/tools/overweight', 'tools.overweight');
Route::view('/estimates', 'estimates')->name('estimates');

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
