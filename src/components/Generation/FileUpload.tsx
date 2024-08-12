import React, { useState } from 'react';
import { Container, Paper, Title, Text, Button, Textarea, Modal, Box, Space } from '@mantine/core';
import OCR from '@/components/OCR/OCR';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE, PDF_MIME_TYPE, MIME_TYPES } from '@mantine/dropzone';

const FileUpload: React.FC<{ label: string, onFileAccepted: (content: string) => void }> = ({ label, onFileAccepted }) => {
  const [ocrResult, setOcrResult] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileDrop = async (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    setCurrentFile(file);
    setIsModalOpen(true);
    setIsProcessing(true);

    if (file.type.startsWith('image/')) {
      // For image files, we'll let the OCR component handle it
      setIsProcessing(false);
    } else {
      // Handle non-image files (PDF, DOC, etc.)
      const reader = new FileReader();
      reader.onload = (e) => {
        setOcrResult(e.target?.result as string);
        setIsProcessing(false);
      };
      reader.readAsText(file);
    }
  };

  const handleOcrComplete = (ocrText: string) => {
    setOcrResult(ocrText);
    setIsProcessing(false);
  };

  const handleConfirm = () => {
    onFileAccepted(ocrResult);
    setIsModalOpen(false);
  };

  const handleTextEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOcrResult(e.target.value);
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
          <Text size="xl" inline>
                Drag and drop files here, or click to select files
          </Text>
        </Dropzone>

        <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Extract and Edit Text" size="lg">
          {isProcessing ? (
            <Text>Processing file...</Text>
          ) : (
            <>
              {currentFile && currentFile.type.startsWith('image/') && (
                <Box sx={{ maxWidth: '100%', marginBottom: '1rem' }}>
                  <OCR onOcrComplete={handleOcrComplete} initialFile={currentFile} />
                </Box>
              )}
              <Textarea
                value={ocrResult}
                onChange={handleTextEdit}
                rows={10}
                className="w-full p-2 border rounded"
                placeholder="Extracted text will appear here. You can edit it if needed."
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