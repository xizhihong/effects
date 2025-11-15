<?php

declare(strict_types=1);

use Hyperf\Database\Migrations\Migration;
use Hyperf\Database\Schema\Schema;
use Hyperf\Database\Schema\Blueprint;

class CreateVideoEffectsTable extends Migration
{
    public function up(): void
    {
        Schema::create('video_effects', static function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('tagline')->nullable();
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('sample_video')->nullable();
            $table->json('stats')->nullable();
            $table->json('steps')->nullable();
            $table->json('tags')->nullable();
            $table->string('accent_color', 16)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_effects');
    }
}
