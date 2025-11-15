<?php

declare(strict_types=1);

use Hyperf\Database\Migrations\Migration;
use Hyperf\Database\Schema\Schema;
use Hyperf\Database\Schema\Blueprint;

class CreateEffectTemplatesTable extends Migration
{
    public function up(): void
    {
        Schema::create('effect_templates', static function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('video_effect_id')->nullable();
            $table->string('name');
            $table->string('model')->nullable();
            $table->string('sample_image')->nullable();
            $table->string('sample_video')->nullable();
            $table->text('prompt')->nullable();
            $table->unsignedInteger('credit_cost')->default(0);
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->foreign('video_effect_id')->references('id')->on('video_effects')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('effect_templates');
    }
}
