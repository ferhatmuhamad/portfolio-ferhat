<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

class ContactMessageMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $senderName,
        public string $senderEmail,
        public ?string $subjectLine,
        public string $body,
        public ?string $ipAddress = null,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '[Portfolio] ' . ($this->subjectLine ?: 'New message from ' . $this->senderName),
            replyTo: [new Address($this->senderEmail, $this->senderName)],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact_message',
            with: [
                'senderName'  => $this->senderName,
                'senderEmail' => $this->senderEmail,
                'subjectLine' => $this->subjectLine,
                'body'        => $this->body,
                'ipAddress'   => $this->ipAddress,
            ],
        );
    }
}
