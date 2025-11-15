<?php

declare(strict_types=1);

use Hyperf\Database\Migrations\Migration;
use Hyperf\Database\Schema\Schema;
use Hyperf\Database\Schema\Blueprint;

class CreateCreationsTable extends Migration
{
    public function up(): void
    {
        Schema::create('creations', static function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('video_effect_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('title');
            $table->string('preview_url')->nullable();
            $table->string('status')->default('draft');
            $table->unsignedInteger('credits_used')->default(0);
            $table->json('meta')->nullable();
            $table->timestamps();

            $table->foreign('video_effect_id')->references('id')->on('video_effects')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('creations');
    }
}
