<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New contact message</title>
</head>
<body style="margin:0;padding:24px;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1f;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <div style="background:linear-gradient(135deg,#ff7a1a 0%,#ffd166 100%);padding:24px 28px;color:#1a1a1f;">
            <p style="margin:0;font-size:12px;letter-spacing:.2em;text-transform:uppercase;opacity:.8;">Portfolio · Contact form</p>
            <h1 style="margin:6px 0 0;font-size:22px;line-height:1.25;">New message from {{ $senderName }}</h1>
        </div>
        <div style="padding:24px 28px;">
            @if($subjectLine)
                <p style="margin:0 0 4px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#888;">Subject</p>
                <p style="margin:0 0 18px;font-size:16px;font-weight:600;">{{ $subjectLine }}</p>
            @endif
            <p style="margin:0 0 4px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#888;">From</p>
            <p style="margin:0 0 4px;font-size:15px;font-weight:600;">{{ $senderName }}</p>
            <p style="margin:0 0 18px;font-size:14px;color:#444;">
                <a href="mailto:{{ $senderEmail }}" style="color:#c7420a;text-decoration:none;">{{ $senderEmail }}</a>
            </p>
            <p style="margin:0 0 4px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#888;">Message</p>
            <div style="white-space:pre-wrap;font-size:15px;line-height:1.6;color:#222;border-left:3px solid #ff7a1a;padding:8px 14px;background:#fafafa;border-radius:6px;">{{ $body }}</div>
            @if($ipAddress)
                <p style="margin:18px 0 0;font-size:11px;color:#aaa;">Submitted from IP: {{ $ipAddress }}</p>
            @endif
        </div>
    </div>
    <p style="text-align:center;margin:18px 0 0;font-size:11px;color:#aaa;">Reply directly to this email to respond to {{ $senderName }}.</p>
</body>
</html>
