// file-upload.slots.ts

export type TngFileUploadSlot =
  | 'container'

  // Dropzone
  | 'dropzone'
  | 'dropzoneActive'
  | 'dropzoneDisabled'

  // Header
  | 'header'
  | 'title'
  | 'subtitle'

  // Hint / meta
  | 'hint'

  // Actions
  | 'clearButton'

  // File list
  | 'fileList'
  | 'fileItem'
  | 'fileName'
  | 'fileSize';
