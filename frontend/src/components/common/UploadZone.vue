<script setup lang="ts">
const props = defineProps<{
  files: File[]
  disabled?: boolean
}>()

const emit = defineEmits<{
  update: [files: File[]]
}>()

const handleFiles = (incoming: FileList | null) => {
  if (!incoming) return
  const merged = [...props.files, ...Array.from(incoming)].slice(0, 3)
  const filtered = merged.filter((file) => file.size <= 5 * 1024 * 1024)
  emit('update', filtered)
}

const removeFile = (index: number) => {
  const copy = [...props.files]
  copy.splice(index, 1)
  emit('update', copy)
}

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  handleFiles(target?.files ?? null)
}
</script>

<template>
  <div class="upload-zone" :class="{ disabled: props.disabled }">
    <label>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        multiple
        :disabled="props.disabled"
        @change="onFileChange"
      />
      <p>
        Drop JPG / PNG / WebP files <span>(max 5 MB • up to 3)</span>
      </p>
      <button type="button">Upload</button>
    </label>
    <ul>
      <li v-for="(file, index) in files" :key="file.name">
        <div>
          <p>{{ file.name }}</p>
          <small>{{ (file.size / 1024 / 1024).toFixed(2) }} MB</small>
        </div>
        <button type="button" @click="removeFile(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.upload-zone {
  border: 1px dashed rgba(255, 255, 255, 0.25);
  border-radius: 24px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
}

.upload-zone.disabled {
  opacity: 0.5;
  pointer-events: none;
}

label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
}

label input {
  display: none;
}

label p {
  margin: 0;
  font-weight: 600;
}

label span {
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-left: 0.5rem;
}

label button {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.2rem;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
}

li button {
  background: transparent;
  border: none;
  color: #f87171;
  cursor: pointer;
}
</style>
