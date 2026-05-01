<?php

namespace App\Support;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HandlesUploads
{
    protected function handleUpload(?UploadedFile $file, ?string $oldPath, string $folder): ?string
    {
        if (! $file) {
            return $oldPath;
        }
        if ($oldPath) {
            Storage::disk('public')->delete($oldPath);
        }
        return $file->store($folder, 'public');
    }

    protected function deleteFile(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}
