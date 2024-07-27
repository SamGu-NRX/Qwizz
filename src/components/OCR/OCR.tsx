"use client";

import { useEffect, useRef, useState } from 'react';
import { Group, Stack, Text, Image, Progress, Button } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { createWorker, PSM, OEM } from 'tesseract.js'; // Ensure correct imports

const OCR = () => {
  const [imageData, setImageData] = useState<null | string>(null);
  const loadFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      setImageData(imageDataUri as string);
    };
    reader.readAsDataURL(file);
  };

  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('idle');
  const [ocrResult, setOcrResult] = useState('');

  const workerRef = useRef<Tesseract.Worker | null>(null);

  useEffect(() => {
    const initializeWorker = async () => {
      const worker = await createWorker();
      workerRef.current = worker;

      // Set up event listener for messages from the worker
      worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO, tessedit_ocr_engine_mode: OEM.LSTM_ONLY });

      // Set up event listener for messages from the worker
      if (workerRef.current && imageData) {
        worker.recognize(imageData).then((result) => {
          if ('progress' in result && 'status' in result) {
            setProgress(result.progress as number);
            setProgressLabel(result.progress === 1 ? 'Done' : result.status as string);
          } else {
            // handle error
          }
        });
      }
    };
      
    initializeWorker();

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [imageData]);

  const handleExtract = async () => {
    setProgress(0);
    setProgressLabel('starting');

    const worker = workerRef.current!;

    const response = await worker.recognize(imageData!);
    setOcrResult(response.data.text);
    console.log(response.data);
  };

  return (
    <Group align='initial' style={{ padding: '10px' }}>
      <Stack style={{ flex: '1' }}>
        <Dropzone
          onDrop={(files) => loadFile(files[0])}
          accept={IMAGE_MIME_TYPE}
          multiple={false}
        >{(() => (
          <Text size="xl" inline>
            Drag image here or click to select file
          </Text>
        ))()}</Dropzone>

        {!!imageData && <Image src={imageData} alt="Uploaded file" style={{ width: '100%' }} />}
      </Stack>

      <Stack style={{ flex: '1' }}>
        <Button disabled={!imageData || !workerRef.current} onClick={handleExtract}>Extract</Button>
        <Text>{progressLabel.toUpperCase()}</Text>
        <Progress value={progress * 100} />

        {!!ocrResult && <Stack>
          <Text size='xl'>RESULT</Text>
          <Text style={{ fontFamily: 'monospace', background: 'white', padding: '10px' }}>{ocrResult}</Text>
        </Stack>}
      </Stack>
    </Group>
  );
}

export default OCR;
