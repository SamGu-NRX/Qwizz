// src/components/FileUpload.tsx
import React, { useState } from 'react';
import { Container, Paper, Title, Text, Space, Button, Textarea, Modal } from '@mantine/core';
import OCR from '@/components/OCR/OCR';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE, PDF_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';

const FileUpload: React.FC<{ label: string, onFileAccepted: (content: string) => void }> = ({ label, onFileAccepted }) => {
  const [ocrResult, setOcrResult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const handleFileDrop = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    setCurrentFile(file);
    
    if (file.type.startsWith('image/')) {
      setIsModalOpen(true);
    } else {
      // Handle non-image files (PDF, DOC, etc.)
      const reader = new FileReader();
      reader.onload = () => {
        setOcrResult(reader.result as string);
        setIsModalOpen(true);
      };
      reader.readAsText(file);
    }
  };

  const handleOcrComplete = (ocrText: string) => {
    setOcrResult(ocrText);
  };

  const handleConfirm = () => {
    onFileAccepted(ocrResult);
    setIsModalOpen(false);
  };

  return (
    <Container size="lg" py="xl">
      <Paper shadow="md" p="xl" radius="md">
        <Title order={1} mb="lg" className="text-center">
          Upload and Extract Text
        </Title>
        <Text className="text-center" c="dimmed" mb="xl">
          Upload an image or document, crop it if needed, and extract text using OCR technology.
        </Text>
        <Space h="md" />
        <Dropzone
          onDrop={handleFileDrop}
          accept={[
            ...IMAGE_MIME_TYPE,
            ...Array.from(PDF_MIME_TYPE),
            MIME_TYPES.doc,
            MIME_TYPES.docx,
          ]}
        >
          {() => (
            <Text size="xl" inline>
              Drag and drop files here, or click to select files
            </Text>
          )}
        </Dropzone>

        <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm OCR Transcription" size="lg">
          {currentFile && currentFile.type.startsWith('image/') ? (
            <OCR onOcrComplete={handleOcrComplete} initialFile={currentFile} />
          ) : (
            <>
              <Textarea
                value={ocrResult}
                onChange={(e) => setOcrResult(e.currentTarget.value)}
                rows={10}
                className="w-full p-2 border rounded"
              />
              <Button onClick={handleConfirm} className="mt-4">
                Confirm
              </Button>
            </>
          )}
        </Modal>
      </Paper>
    </Container>
  );
};

export default FileUpload;