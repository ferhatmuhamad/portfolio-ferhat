<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Messages/Index', [
            'messages' => ContactMessage::orderByDesc('created_at')->paginate(20),
        ]);
    }
    public function show(ContactMessage $message)
    {
        $message->update(['is_read' => true]);
        return Inertia::render('Admin/Messages/Show', ['message' => $message]);
    }
    public function destroy(ContactMessage $message)
    {
        $message->delete();
        return redirect()->route('admin.messages.index')->with('success', 'Message deleted.');
    }
}
