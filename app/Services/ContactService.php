<?php

namespace App\Services;

use App\Models\ContactMessage;

class ContactService
{
    public function storeMessage(array $data)
    {
        return ContactMessage::create($data);
    }

    public function markAsRead(ContactMessage $message)
    {
        $message->update(['read_at' => now(), 'status' => 'read']);
        return $message;
    }
}
