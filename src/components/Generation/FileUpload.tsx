// src/components/FileUpload.tsx
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { useState } from 'react';
import { Button, Modal, Textarea, Text } from '@mantine/core';

const FileUpload = ({ label, onFileAccepted }: { label: string, onFileAccepted: (ocrContent: string) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ocrContent, setOcrContent] = useState('');

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles[0]);
    setIsModalOpen(true);
    // Perform OCR if image, otherwise just read the file
    if (acceptedFiles[0].type.startsWith('image/')) {
      performOcr(acceptedFiles[0]);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setOcrContent(reader.result as string);
      };
      reader.readAsText(acceptedFiles[0]);
    }
  };

  const performOcr = (file: File) => {
    // Placeholder for OCR function
    setOcrContent('OCR transcribed text...');
  };

  const handleConfirm = () => {
    onFileAccepted(ocrContent);
    setIsModalOpen(false);
  };

  return (
    <div className="my-4">
      <Text size="lg" weight={500} className="mb-2">{label}</Text>
      <Dropzone onDrop={handleDrop}>
        <div>
          <input type="file" />
          <Text>Drag &apos;n&apos; drop some files here, or click to select files</Text>
        </div>
      </Dropzone>
      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm OCR Transcription">
        <Textarea
          value={ocrContent}
          onChange={(e) => setOcrContent(e.target.value)}
          rows={10}
          className="w-full p-2 border rounded"
        />
        <Button onClick={handleConfirm} className="mt-4">
          Confirm
        </Button>
      </Modal>
    </div>
  );
};

export default FileUpload;
