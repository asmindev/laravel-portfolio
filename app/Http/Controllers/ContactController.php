<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactStoreRequest;
use App\Services\ContactService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    protected $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function store(ContactStoreRequest $request)
    {
        $this->contactService->storeMessage($request->validated());

        return redirect()->back()->with('success', 'Message sent successfully.');
    }
}
